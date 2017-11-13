package com.xhl.service.impl;

import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xhl.dao.CardDao;
import com.xhl.service.ICardService;
import com.xhl.utils.MyUtil;
import com.xhl.utils.DateTimeUtils;


@Service
@Transactional
public class CardService implements ICardService{
	
	@Resource
	private CardDao cardDao;
	
	/**
	 * @Description: 查询账户
	 * @author zhouqiao
	 */
	@Override
	public Map<String, Object> queryCard(HttpServletRequest request) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		String card_state = MyUtil.getParamValue(request,"CARD_STATE");
			
		try {
			//查询结果
			List<Map<String, String>> lmap = cardDao.queryCard(card_state);
			resultMap.put("rows", lmap);
			return resultMap;
		} catch (Exception e) {
			resultMap.put("result", "false");
			//logger.info("操作 ProjectDao.queryProject 出错 uri为 --->>>" + req.getRequestURI()+"错误信息为："+e);
			e.printStackTrace();
		}
		
		return resultMap;
	}
	
	/**
	 * 新建修改账户
	 */
	@Override
	public Map<String, String> editCard(HttpServletRequest request) {
		Map<String, String> resultMap = new HashMap<String, String>();
		String[] must = new String[]{};
		String[] nomust = new String[]{"TYPE","CARD_ID","CARD_NAME","CARD_NUM",
				"CARD_OWNER","CARD_BANK","REMARK","CARD_STATE"};
		Map<String, String> pmap = MyUtil.requestToMap(request, must, nomust);
		if(null == pmap){
			resultMap.put("msg","必填项未填");
			resultMap.put("result","false");
			return resultMap;
		}
		
		try{
			String type = pmap.get("TYPE");
			//新建账户
			if("add".equals(type)){
				pmap.put("CARD_STATE", "00");
				cardDao.addCard(pmap);
			}
			//修改账户
			if("edit".equals(type)){
				cardDao.editCard(pmap);
			}
			//启用停用
			if("opt".equals(type)){
				cardDao.optCard(pmap);
			}
		
			resultMap.put("msg", "操作成功");
			resultMap.put("result", "true");
		}catch (Exception e) {
			resultMap.put("msg","操作失败");
			resultMap.put("result", "false");
			//logger.info("操作  ProjectDao.editProject 出错 uri为 --->>>" + req.getRequestURI()+"错误信息为："+e);
			e.printStackTrace();
		}
		return resultMap;
	}
	
	
	/**
	 * @Description: 查询账户明细
	 * @author zhouqiao
	 */
	@Override
	public Map<String, Object> queryDetail(HttpServletRequest request) {
		String[] must = new String[]{"CARD_ID","limit","offset"};
		String[] nomust = new String[]{"START_TIME","END_TIME","PAY_CLASS","PAY_TYPE"};
		Map<String, Object> resultMap = new HashMap<String,Object>();
 		Map<String, String> pmap = MyUtil.requestToMap(request, must, nomust);
		if (null == pmap) {
			resultMap.put("result", "false");
			resultMap.put("msg", "缺少参数!");
			return resultMap;
		}
	
		try {
			if("".equals(pmap.get("START_TIME")) && "".equals(pmap.get("END_TIME"))){
				String firstDate = DateTimeUtils.getFirstDayOfMonthStr();
				String lastDate = DateTimeUtils.getLastDayOfMonthStr();
				pmap.put("START_TIME", firstDate);
				pmap.put("END_TIME", lastDate);
			}
			//查询结果
			List<Map<String, String>> lmap = cardDao.queryDetail(pmap);//查询明细
			resultMap.put("total", pmap.containsKey("total")?pmap.get("total"):lmap.size());
			pmap.remove("limit");pmap.remove("offset");
			List<Map<String, String>> smap = cardDao.queryDetailSum(pmap);//查询明细合计
			//List<Map<String, String>> rmap = MyUtil.getPaging(pmap, lmap);
			lmap.add(smap.get(0));
			//resultMap.put("rows", MyUtil.getPaging(pmap, rmap));
			resultMap.put("rows",lmap);//临时
			
			return resultMap;
		} catch (Exception e) {
			resultMap.put("result", "false");
			//logger.info("操作 ProjectDao.queryProject 出错 uri为 --->>>" + req.getRequestURI()+"错误信息为："+e);
			e.printStackTrace();
		}
		
		return resultMap;
	}
	
	/**
	 * 编辑明细信息
	 */
	@Override
	public Map<String, String> editDetail(HttpServletRequest request) {
		Map<String, String> resultMap = new HashMap<String, String>();
		String[] must = new String[]{"DETAIL_DATE","AMOUNT","CARD_ID","PAY_TYPE","PAY_CLASS"};
		String[] nomust = new String[]{"TYPE","DETAIL_ID","DETAIL_EXPLAIN",
										"BILL_NUM","PAY_EXPLAIN","REMARK"};
		Map<String, String> pmap = MyUtil.requestToMap(request, must, nomust);
		if(null == pmap){
			resultMap.put("msg","缺少必填项");
			resultMap.put("result","false");
			return resultMap;
		}
		BigDecimal currBalance = null;
		try{
			String type = pmap.get("TYPE");
			//新建
			if("add".equals(type)){
				currBalance = cardDao.getBalance(pmap); //当前余额
				String currDate = cardDao.getDate(pmap); //最新记录的日期
				if(null != currDate){
					if(pmap.get("DETAIL_DATE").compareTo(currDate)<0){
						resultMap.put("msg","新增数据的日期不能早于当前最后一条数据的日期");
						resultMap.put("result","false");
						return resultMap;
					}
				}
				String detail_num = DateTimeUtils.getNumber();
				pmap.put("DETAIL_NUM", detail_num);
				if(null == currBalance){//暂无记录
					String pay_type = pmap.get("PAY_TYPE");
					if("01".equals(pay_type)){
						resultMap.put("msg","当前账户收入为0，不能继续支出");
						resultMap.put("result","false");
						return resultMap;
					}
					pmap.put("BALANCE", pmap.get("AMOUNT"));
					pmap.put("REAL_AMOUNT", pmap.get("AMOUNT"));
					cardDao.addDetail(pmap);
				}else{//已有记录
					BigDecimal amount = new BigDecimal(pmap.get("AMOUNT"));//操作金额
					if("01".equals(pmap.get("PAY_TYPE"))){//支出
						currBalance = currBalance.subtract(amount);
						if(-1 == currBalance.compareTo(BigDecimal.ZERO)){
							resultMap.put("msg","余额不足，不能继续支出");
							resultMap.put("result","false");
							return resultMap;
						}
						pmap.put("REAL_AMOUNT", "-"+pmap.get("AMOUNT"));
					}
					if("00".equals(pmap.get("PAY_TYPE"))){//收入
						currBalance = currBalance.add(amount);
						pmap.put("REAL_AMOUNT", pmap.get("AMOUNT"));
					}
					pmap.put("BALANCE", currBalance.toString());
					cardDao.addDetail(pmap);
				}
			}
			//修改
			if("edit".equals(type)){
				cardDao.editDetail(pmap);
			}
			resultMap.put("msg", "操作成功");
			resultMap.put("result", "true");
		}catch (Exception e) {
			resultMap.put("msg","操作失败");
			resultMap.put("result", "false");
			//logger.info("操作  cardDao.editDetail 出错 uri为 --->>>" + req.getRequestURI()+"错误信息为："+e);
			e.printStackTrace();
		}
		return resultMap;
	}
	

	/**
	 * 删除最近一条明细记录
	 */
	@Override
	public Map<String, String> delDetail(HttpServletRequest request) {
		Map<String, String> resultMap = new HashMap<String, String>();
		String[] must = new String[]{"CARD_ID"};
		String[] nomust = new String[]{};
		Map<String, String> pmap = MyUtil.requestToMap(request, must, nomust);
		if(null == pmap){
			resultMap.put("msg","缺少参数");
			resultMap.put("result","false");
			return resultMap;
		}
		try{
			cardDao.delDetail(pmap);
			resultMap.put("msg", "操作成功");
			resultMap.put("result", "true");
		}catch (Exception e) {
			resultMap.put("msg","操作失败");
			resultMap.put("result", "false");
			//logger.info("操作  ProjectDao.editProject 出错 uri为 --->>>" + req.getRequestURI()+"错误信息为："+e);
			e.printStackTrace();
		}
		return resultMap;
	}
	
	
	/**
	 * @Description: 查询根据类别统计信息
	 * @author zhouqiao
	 */
	@Override
	public Map<String, Object> queryStatistic(HttpServletRequest request) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		String[] must = new String[]{"CARD_ID"};
		String[] nomust = new String[]{"START_TIME","END_TIME"};
		Map<String, String> pmap = MyUtil.requestToMap(request, must, nomust);
		if(null == pmap){
			resultMap.put("msg","缺少必填项");
			resultMap.put("result","false");
			return resultMap;
		}
		try {
			//查询结果
			List<Map<String, String>> lmap = cardDao.queryStatistic(pmap);
			resultMap.put("rows", lmap);
			return resultMap;
		} catch (Exception e) {
			resultMap.put("result", "false");
			//logger.info("操作 CardDao.queryStatistic 出错 uri为 --->>>" + req.getRequestURI()+"错误信息为："+e);
			e.printStackTrace();
		}
		
		return resultMap;
	}
}






