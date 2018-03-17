package com.xhl.service.impl;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xhl.dao.ProjectDao;
import com.xhl.service.IProjectService;
import com.xhl.utils.MyUtil;
import com.xhl.utils.DateTimeUtils;


@Service
@Transactional
public class ProjectService implements IProjectService{
	
	@Resource
	private ProjectDao projectDao;
	
	/**
	 * @Description: 查询项目
	 * @author zhouqiao
	 */
	@Override
	public Map<String, Object> queryProject(HttpServletRequest request) {
		String[] must = new String[]{"limit","offset"};
		String[] nomust = new String[]{"PROJECT_NUM","PROJECT_NAME","PROJECT_EMPLOYER",
				"PROJECT_MANAGER","PROJECT_STATE","PROJECT_TYPE"};
		Map<String, Object> resultMap = new HashMap<String,Object>();
 		Map<String, String> pmap = MyUtil.requestToMap(request, must, nomust);
		if (null == pmap) {
			resultMap.put("result", "false");
			resultMap.put("mess", "缺少参数!");
			return resultMap;
		}
	
		try {
			//查询结果
			List<Map<String, String>> lmap = projectDao.queryProject(pmap);
			resultMap.put("rows", MyUtil.getPaging(pmap, lmap));
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
	 * 新建修改项目
	 */
	@Override
	public Map<String, String> editProject(HttpServletRequest req) {
		Map<String, String> resultMap = new HashMap<String, String>();
		String[] must = new String[]{};
		String[] nomust = new String[]{"TYPE","PROJECT_ID","PROJECT_NAME","PROJECT_TYPE","PROJECT_EMPLOYER",
				"PROJECT_MANAGER","TECHNICAL_DIRECTOR","START_TIME","FINISH_TIME","PROJECT_PRICE",
				"PROJECT_TAX","TOTAL_PRICES","FINAL_NOTAX","FINAL_TAX","FINAL_TOTAL","REMARK"};
		Map<String, String> pmap = MyUtil.requestToMap(req, must, nomust);
		if(null == pmap){
			resultMap.put("msg","必填项未填");
			resultMap.put("result","false");
			return resultMap;
		}
		
		try{
			String type = pmap.get("TYPE");
			String[] paym = new String[]{"PROJECT_PRICE","PROJECT_TAX","TOTAL_PRICES","FINAL_NOTAX","FINAL_TAX","FINAL_TOTAL"};
			pmap = MyUtil.formatMoney(pmap, paym);
			//新建项目
			if("add".equals(type)){
				String project_num = "PJ_" + DateTimeUtils.getNumber();
				pmap.put("PROJECT_NUM", project_num);
				pmap.put("PROJECT_STATE", "00");//执行中
				pmap.put("COST_STATE", "00");//执行中
				pmap.put("PAY_STATE", "00");//执行中
				projectDao.addProject(pmap);
			}
			//修改项目
			if("edit".equals(type)){
				projectDao.editProject(pmap);
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
	 * 关闭打开一个项目
	 */
	@Override
	public Map<String, String> closeProject(HttpServletRequest req) {
		Map<String, String> resultMap = new HashMap<String, String>();
		String[] must = new String[]{"PROJECT_ID","TYPE"};
		String[] nomust = new String[]{};
		Map<String, String> pmap = MyUtil.requestToMap(req, must, nomust);
		if(null == pmap){
			resultMap.put("msg","缺失必要参数");
			resultMap.put("result","false");
			return resultMap;
		}
		
		try{
			projectDao.closeProject(pmap);
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
	 * @Description: 查询备忘录
	 * @author zhouqiao
	 */
	@Override
	public Map<String, Object> queryMemo(HttpServletRequest request) {
		String[] must = new String[]{"PROJECT_ID"};	
		String[] nomust = new String[]{"MEMO_STATE"};
		Map<String, Object> resultMap = new HashMap<String,Object>();
 		Map<String, String> pmap = MyUtil.requestToMap(request, must, nomust);
		if (null == pmap) {
			resultMap.put("result", "false");
			resultMap.put("mess", "缺少参数!");
			return resultMap;
		}
	
		try {
			//查询结果
			List<Map<String, String>> lmap = projectDao.queryMemo(pmap);
			resultMap.put("rows", lmap);
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
	 * 编辑备忘录
	 */
	@Override
	public Map<String, String> saveMemo(HttpServletRequest req) {
		Map<String, String> resultMap = new HashMap<String, String>();
		String[] must = new String[]{};
		String[] nomust = new String[]{"PROJECT_ID","TYPE","MEMO_ID","MEMO_STATE",
				"MEMO_TITLE","MEMO_CONTENT","SID","MEMO_DATE"};
		Map<String, String> pmap = MyUtil.requestToMap(req, must, nomust);
		if(null == pmap){
			resultMap.put("msg","必填项未填");
			resultMap.put("result","false");
			return resultMap;
		}
		
		try{
			String currTime = DateTimeUtils.getFormatCurrentTime();
			String type = pmap.get("TYPE");
			if("add".equals(type)){
				String memo_num  = "ME_"+ DateTimeUtils.getNumber();
				pmap.put("MEMO_NUM",memo_num);
				pmap.put("CREATE_PERSON",pmap.get("SID"));
				pmap.put("CREATE_TIME",currTime);
				projectDao.addMemo(pmap);
			}
			if("edit".equals(type)){
				pmap.put("UPDATE_PERSON",pmap.get("SID"));
				pmap.put("UPDATE_TIME",currTime);
				projectDao.editMemo(pmap);
			}
			if("del".equals(type)){
				projectDao.delMemo(pmap);
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
	 * @Description: 查询成本list
	 * @author zq
	 */
	@Override
	public Map<String, Object> queryCost(HttpServletRequest request) {
		String[] must = new String[]{"limit","offset"};
		String[] nomust = new String[]{"PROJECT_NUM","PROJECT_NAME","COST_STATE","PROJECT_TYPE"};
		Map<String, Object> resultMap = new HashMap<String,Object>();
 		Map<String, String> pmap = MyUtil.requestToMap(request, must, nomust);
		if (null == pmap) {
			resultMap.put("result", "false");
			resultMap.put("mess", "缺少参数!");
			return resultMap;
		}
	
		try {
			//查询结果
			List<Map<String, String>> lmap = projectDao.queryCost(pmap);
			resultMap.put("rows", MyUtil.getPaging(pmap, lmap));
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
	 * @Description: 查询成本
	 * @author zq
	 */
	@Override
	public Map<String, Object> queryCostByProid(HttpServletRequest request) {
		String[] must = new String[]{"limit","offset","PROJECT_ID"};
		String[] nomust = new String[]{"COST_START_TIME","COST_END_TIME","COST_TYPE"};
		Map<String, Object> resultMap = new HashMap<String,Object>();
 		Map<String, String> pmap = MyUtil.requestToMap(request, must, nomust);
		if (null == pmap) {
			resultMap.put("result", "false");
			resultMap.put("mess", "缺少参数!");
			return resultMap;
		}
	
		try {
			//查询结果
			List<Map<String, String>> lmap = projectDao.queryCostByProid(pmap);//查询结果
			BigDecimal sumIn = projectDao.queryCostSumIn(pmap);//查询收入合计
			if(null == sumIn){
				sumIn = new BigDecimal(0);
			}
			BigDecimal sumOut = projectDao.queryCostSumOut(pmap);//查询支出合计
			if(null == sumOut){
				sumOut = new BigDecimal(0);
			}
			BigDecimal sum = sumIn.subtract(sumOut);//计算差值
			Map<String, String> smap = new HashMap<String, String>();
			smap.put("COST_ID", "00");
			smap.put("COST_NUM", "-");
			smap.put("COST_DATE", "合计");
			smap.put("COST_DETAIL", "-");
			smap.put("COST_AMOUNT", sum.toString());
			smap.put("COST_TYPE", "-");
			smap.put("COST_REMARK", "-");
			smap.put("PROJECT_ID", "-");
//			List<Map<String, String>> smap = projectDao.queryCostSumIn(pmap);
//			List<Map<String, String>> omap = projectDao.queryCostSumOut(pmap);
//			smap.get(0).get("COST_AMOUNT");
//			omap.get(0).get("COST_AMOUNT");
			//smap.get(0).put("", "");
			List<Map<String, String>> rmap = MyUtil.getPaging(pmap, lmap);//分页结果
			rmap.add(smap);//合计与结果合并
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
	 * 编辑成本
	 */
	@Override
	public Map<String, String> editProjectCost(HttpServletRequest request) {
		Map<String, String> resultMap = new HashMap<String, String>();
		String[] must = new String[]{};
		String[] nomust = new String[]{"COST_TYPE","COST_TYPE2","COST_DETAIL","COST_REMARK",
				"TYPE","COST_DATE","COST_AMOUNT","PROJECT_ID","COST_ID"};
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
				String cost_num  = "PC_"+ DateTimeUtils.getNumber();
				pmap.put("COST_NUM", cost_num);
				projectDao.addCost(pmap);
			}
			//修改
			if("edit".equals(type)){
				projectDao.editCost(pmap);
			}
			//删除
			if("del".equals(type)){
				projectDao.delCost(pmap);
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
	 * @Description: 查询具体成本
	 * @author zq
	 */
	@Override
	public Map<String, Object> queryCd(HttpServletRequest request) {
		String[] must = new String[]{"limit","offset","COST_ID"};
		String[] nomust = new String[]{};
		Map<String, Object> resultMap = new HashMap<String,Object>();
 		Map<String, String> pmap = MyUtil.requestToMap(request, must, nomust);
		if (null == pmap) {
			resultMap.put("result", "false");
			resultMap.put("mess", "缺少参数!");
			return resultMap;
		}
	
		try {
			//查询结果
			List<Map<String, String>> lmap = projectDao.queryCd(pmap);//查询结果
//			List<Map<String, String>> smap = projectDao.queryCostSum(pmap);//查询合计
//			List<Map<String, String>> rmap = MyUtil.getPaging(pmap, lmap);//分页结果
//			rmap.add(smap.get(0));//合计与结果合并
//			resultMap.put("rows", rmap);
			resultMap.put("rows", lmap);
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
	 * 编辑具体成本
	 */
	@Override
	public Map<String, String> editCd(HttpServletRequest request) {
		Map<String, String> resultMap = new HashMap<String, String>();
		String[] must = new String[]{};
		String[] nomust = new String[]{"CD_ID","CD_PROJECT","CD_DATE",
				"CD_TYPE","REMARK","CD_NAME","COST_ID","CD_STANDARD","CD_UNIT"};
		String[] money = new String[]{"AMOUNT","CD_PRICE","CD_COUNT","TYPE"};
		Map<String, String> pmap = MyUtil.requestToMap(request, must, nomust,money);
		if(null == pmap){
			resultMap.put("msg","必填项未填");
			resultMap.put("result","false");
			return resultMap;
		}
		
		try{
			String type = pmap.get("TYPE");
			//新建
			if("add".equals(type)){
				projectDao.addCd(pmap);
			}
			//修改
			if("edit".equals(type)){
				projectDao.editCd(pmap);
			}
			//删除
			if("del".equals(type)){
				projectDao.delCd(pmap);
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
	 * @Description: 查询付款list
	 * @author zq
	 */
	@Override
	public Map<String, Object> queryPay(HttpServletRequest request) {
		String[] must = new String[]{"limit","offset"};
		String[] nomust = new String[]{"PROJECT_NUM","PROJECT_NAME","PAY_STATE"};
		Map<String, Object> resultMap = new HashMap<String,Object>();
 		Map<String, String> pmap = MyUtil.requestToMap(request, must, nomust);
		if (null == pmap) {
			resultMap.put("result", "false");
			resultMap.put("mess", "缺少参数!");
			return resultMap;
		}
	
		try {
			//查询结果
			List<Map<String, String>> lmap = projectDao.queryPay(pmap);
			resultMap.put("rows", MyUtil.getPaging(pmap, lmap));
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
	 * @Description: 查询付款
	 * @author zq
	 */
	@Override
	public Map<String, Object> queryPayByProid(HttpServletRequest request) {
		String[] must = new String[]{"limit","offset","PROJECT_ID"};
		String[] nomust = new String[]{"PAY_START_TIME","PAY_END_TIME"};
		Map<String, Object> resultMap = new HashMap<String,Object>();
 		Map<String, String> pmap = MyUtil.requestToMap(request, must, nomust);
		if (null == pmap) {
			resultMap.put("result", "false");
			resultMap.put("mess", "缺少参数!");
			return resultMap;
		}
	
		try {
			//查询结果
			List<Map<String, String>> lmap = projectDao.queryPayByProid(pmap);//查询结果
			List<Map<String, String>> smap = projectDao.queryPaySum(pmap);//查询合计
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
	 * 编辑付款
	 */
	@Override
	public Map<String, String> editProjectPay(HttpServletRequest request) {
		Map<String, String> resultMap = new HashMap<String, String>();
		String[] must = new String[]{};
		String[] nomust = new String[]{"PAY_REMARK","TYPE","PAY_DATE",
				"PAY_AMOUNT","PROJECT_ID","PAY_ID"};
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
				String pay_num  = "PP_"+ DateTimeUtils.getNumber();
				pmap.put("PAY_NUM", pay_num);
				projectDao.addPay(pmap);
			}
			//修改
			if("edit".equals(type)){
				projectDao.editPay(pmap);
			}
			//删除
			if("del".equals(type)){
				projectDao.delPay(pmap);
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
	
	
	
}







