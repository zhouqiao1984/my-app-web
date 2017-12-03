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

import com.xhl.dao.DepositDao;
import com.xhl.service.IDepositService;
import com.xhl.utils.MyUtil;
import com.xhl.utils.DateTimeUtils;


@Service
@Transactional
public class DepositService implements IDepositService{
	
	@Resource
	private DepositDao depositDao;
	
	/**
	 * @Description: 查询保证金
	 * @author zhouqiao
	 */
	@Override
	public Map<String, Object> queryDepositList(HttpServletRequest request) {
		String[] must = new String[]{"limit","offset"};
		String[] nomust = new String[]{"DETAIL_NUM","PROJECT_NAME","PROJECT_TYPE",
				"PROJECT_STATE","CARD_NAME","CARD_NUM"};
		Map<String, Object> resultMap = new HashMap<String,Object>();
 		Map<String, String> pmap = MyUtil.requestToMap(request, must, nomust);
		if (null == pmap) {
			resultMap.put("result", "false");
			resultMap.put("msg", "缺少参数!");
			return resultMap;
		}
	
		try {
			//查询结果
			List<Map<String, String>> lmap = depositDao.queryDepositList(pmap);
			List<Map<String, String>> smap = depositDao.queryDepositSum(pmap);//查询合计
			List<Map<String, String>> rmap = MyUtil.getPaging(pmap, lmap);//分页结果
			rmap.add(smap.get(0));//合计与结果合并
			resultMap.put("rows", rmap);
			resultMap.put("total", pmap.containsKey("total")?pmap.get("total"):lmap.size());
			return resultMap;
		} catch (Exception e) {
			resultMap.put("result", "false");
			//logger.info("操作 ProjectDao.queryProject 出错 uri为 --->>>" + req.getRequestURI()+"错误信息为："+e);
			e.printStackTrace();
		}
		
		return resultMap;
	}
	
	/**
	 * 保证金信息维护
	 */
	@Override
	public Map<String, String> editDepositInfo(HttpServletRequest request) {
		Map<String, String> resultMap = new HashMap<String, String>();
		String[] must = new String[]{"DETAIL_ID"};
		String[] nomust = new String[]{"PROJECT_ID","CARD_ID"};
		Map<String, String> pmap = MyUtil.requestToMap(request, must, nomust);
		if(null == pmap){
			resultMap.put("msg","必填项未填");
			resultMap.put("result","false");
			return resultMap;
		}
		
		try{
			String detail_id = depositDao.getDetailId(pmap);
			if("".equals(detail_id) || null == detail_id){
				depositDao.editDepositInfo(pmap);
			}else{
				depositDao.updateDepositInfo(pmap);
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
	 * @Description: 查询回款明细
	 * @author zhouqiao
	 */
	@Override
	public Map<String, Object> queryReturnList(HttpServletRequest request) {
		String[] must = new String[]{"DETAIL_ID","limit","offset"};
		String[] nomust = new String[]{"RETURN_START_TIME","RETURN_END_TIME"};
		Map<String, Object> resultMap = new HashMap<String,Object>();
 		Map<String, String> pmap = MyUtil.requestToMap(request, must, nomust);
		if (null == pmap) {
			resultMap.put("result", "false");
			resultMap.put("msg", "缺少参数!");
			return resultMap;
		}
	
		try {
			if("点击选择".equals(pmap.get("RETURN_START_TIME")) ){
				pmap.put("RETURN_START_TIME", "");
			}
			if("点击选择".equals(pmap.get("RETURN_END_TIME")) ){
				pmap.put("RETURN_END_TIME", "");
			}
			//查询结果
			List<Map<String, String>> lmap = depositDao.queryReturnList(pmap);//查询回款明细
			List<Map<String, String>> smap = depositDao.queryReturnSum(pmap);//查询回款合计
			List<Map<String, String>> rmap = MyUtil.getPaging(pmap, lmap);
			rmap.add(smap.get(0));
			resultMap.put("rows",rmap);
			resultMap.put("total", pmap.containsKey("total")?pmap.get("total"):lmap.size());
			return resultMap;
		} catch (Exception e) {
			resultMap.put("result", "false");
			//logger.info("操作 ProjectDao.queryProject 出错 uri为 --->>>" + req.getRequestURI()+"错误信息为："+e);
			e.printStackTrace();
		}
		
		return resultMap;
	}
	
	/**
	 * 编辑回款信息
	 */
	@Override
	public Map<String, String> editReturn(HttpServletRequest request) {
		Map<String, String> resultMap = new HashMap<String, String>();
		String[] must = new String[]{};
		String[] nomust = new String[]{"RETURN_DATE","RETURN_AMOUNT","RETURN_REMARK",
				"RETURN_ID","DETAIL_ID","TYPE"};
		Map<String, String> pmap = MyUtil.requestToMap(request, must, nomust);
		if(null == pmap){
			resultMap.put("msg","必填项未填");
			resultMap.put("result","false");
			return resultMap;
		}
		
		try{
			String type = pmap.get("TYPE");
			//新建
			if("add".equals(type)){
				depositDao.addReturn(pmap);
			}
			//修改
			if("edit".equals(type)){
				depositDao.editReturn(pmap);
			}
			//删除
			if("del".equals(type)){
				depositDao.delReturn(pmap);
			}
		
			resultMap.put("msg", "操作成功");
			resultMap.put("result", "true");
		}catch (Exception e) {
			resultMap.put("msg","操作失败");
			resultMap.put("result", "false");
			//logger.info("操作  otherDao.editOther 出错 uri为 --->>>" + req.getRequestURI()+"错误信息为："+e);
			e.printStackTrace();
		}
		return resultMap;
	}
	

	/**
	 * 删除最近一条明细记录
	 */
//	@Override
//	public Map<String, String> delDetail(HttpServletRequest request) {
//		Map<String, String> resultMap = new HashMap<String, String>();
//		String[] must = new String[]{"CARD_ID"};
//		String[] nomust = new String[]{};
//		Map<String, String> pmap = MyUtil.requestToMap(request, must, nomust);
//		if(null == pmap){
//			resultMap.put("msg","缺少参数");
//			resultMap.put("result","false");
//			return resultMap;
//		}
//		try{
//			cardDao.delDetail(pmap);
//			resultMap.put("msg", "操作成功");
//			resultMap.put("result", "true");
//		}catch (Exception e) {
//			resultMap.put("msg","操作失败");
//			resultMap.put("result", "false");
//			//logger.info("操作  ProjectDao.editProject 出错 uri为 --->>>" + req.getRequestURI()+"错误信息为："+e);
//			e.printStackTrace();
//		}
//		return resultMap;
//	}
	
	
	/**
	 * @Description: 查询根据类别统计信息
	 * @author zhouqiao
	 */
//	@Override
//	public Map<String, Object> queryStatistic(HttpServletRequest request) {
//		Map<String, Object> resultMap = new HashMap<String, Object>();
//		String[] must = new String[]{"CARD_ID"};
//		String[] nomust = new String[]{"START_TIME","END_TIME"};
//		Map<String, String> pmap = MyUtil.requestToMap(request, must, nomust);
//		if(null == pmap){
//			resultMap.put("msg","缺少必填项");
//			resultMap.put("result","false");
//			return resultMap;
//		}
//		try {
//			//查询结果
//			List<Map<String, String>> lmap = cardDao.queryStatistic(pmap);
//			resultMap.put("rows", lmap);
//			return resultMap;
//		} catch (Exception e) {
//			resultMap.put("result", "false");
//			//logger.info("操作 CardDao.queryStatistic 出错 uri为 --->>>" + req.getRequestURI()+"错误信息为："+e);
//			e.printStackTrace();
//		}
//		
//		return resultMap;
//	}
	
	
}






