package com.xhl.service.impl;

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
				"PROJECT_MANAGER","PROJECT_STATE"};
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
		String[] nomust = new String[]{"TYPE","PROJECT_ID","PROJECT_NAME","PROJECT_EMPLOYER",
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
	 * @Description: 查询甲方付款信息
	 * @author zhouqiao
	 */
	@Override
	public Map<String, Object> queryFirstpayment(HttpServletRequest request) {
		String[] must = new String[]{"PROJECT_ID"};	
		String[] nomust = new String[]{"limit","offset"};
		Map<String, Object> resultMap = new HashMap<String,Object>();
 		Map<String, String> pmap = MyUtil.requestToMap(request, must, nomust);
		if (null == pmap) {
			resultMap.put("result", "false");
			resultMap.put("mess", "缺少参数!");
			return resultMap;
		}
		try {
			//查询结果
			List<Map<String, String>> lmap = projectDao.queryFirstpayment(pmap);
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
	 * 增加甲方付款信息
	 */
	@Override
	public Map<String, String> addFirstPayment(HttpServletRequest req) {
		Map<String, String> resultMap = new HashMap<String, String>();
		String[] must = new String[]{"PAYDATE","PROJECT_ID","OPT_TYPE"};
		String[] nomust = new String[]{"REMARK","PAYMENT","BALANCE"};
		Map<String, String> pmap = MyUtil.requestToMap(req, must, nomust);
		if(null == pmap){
			resultMap.put("msg","必填项未填");
			resultMap.put("result","false");
			return resultMap;
		}
		
		try{
			String opt_type = pmap.get("OPT_TYPE");
			if("add".equals(opt_type)){
				pmap = MyUtil.formatMoney(pmap, nomust);
				String first_num  = "FP_"+ DateTimeUtils.getNumber();
				pmap.put("FIRST_NUM",first_num);
				projectDao.addFirstPayment(pmap);
			}
			if("edit".equals(opt_type)){
				String first_id = MyUtil.getParamValue(req,"FIRST_ID");
				pmap.put("FIRST_ID", first_id);
				projectDao.editFirstPayment(pmap);
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
	 * @Description: 查询给甲方开发票金额表
	 * @author zhouqiao
	 */
	@Override
	public Map<String, Object> queryOutinvoice(HttpServletRequest request) {
		String[] must = new String[]{"PROJECT_ID"};	
		String[] nomust = new String[]{"limit","offset"};
		Map<String, Object> resultMap = new HashMap<String,Object>();
 		Map<String, String> pmap = MyUtil.requestToMap(request, must, nomust);
		if (null == pmap) {
			resultMap.put("result", "false");
			resultMap.put("mess", "缺少参数!");
			return resultMap;
		}
		try {
			//查询结果
			List<Map<String, String>> lmap = projectDao.queryOutinvoice(pmap);
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
	 * 新增给甲方开发票金额
	 */
	@Override
	public Map<String, String> addOutInvoice(HttpServletRequest req) {
		Map<String, String> resultMap = new HashMap<String, String>();
		String[] must = new String[]{"PAYDATE","PROJECT_ID","OPT_TYPE"};
		String[] nomust = new String[]{"PAYMENT","PAYNOTAX","TAXVALUE","BALANCE","REMARK","UPTAX","ADDTAX","OTHERTAX"};
		Map<String, String> pmap = MyUtil.requestToMap(req, must, nomust);
		if(null == pmap){
			resultMap.put("msg","必填项未填");
			resultMap.put("result","false");
			return resultMap;
		}
		
		try{
			String opt_type = pmap.get("OPT_TYPE");
			if("add".equals(opt_type)){
				pmap = MyUtil.formatMoney(pmap, nomust);
				String out_num = "FI_"+ DateTimeUtils.getNumber();
				pmap.put("OUT_NUM", out_num);
				projectDao.addOutInvoice(pmap);
			}
			if("edit".equals(opt_type)){
				String out_id = MyUtil.getParamValue(req,"OUT_ID");
				pmap.put("OUT_ID", out_id);
				projectDao.editOutInvoice(pmap);
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
	 * @Description: 查询进项发票(普票)金额表
	 * @author zhouqiao
	 */
	@Override
	public Map<String, Object> queryInputinvoice(HttpServletRequest request) {
		String[] must = new String[]{"PROJECT_ID"};	
		String[] nomust = new String[]{"limit","offset"};
		Map<String, Object> resultMap = new HashMap<String,Object>();
 		Map<String, String> pmap = MyUtil.requestToMap(request, must, nomust);
		if (null == pmap) {
			resultMap.put("result", "false");
			resultMap.put("mess", "缺少参数!");
			return resultMap;
		}
		try {
			//查询结果
			List<Map<String, String>> lmap = projectDao.queryInputinvoice(pmap);
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
	 * 新增进项发票(普票)
	 */
	@Override
	public Map<String, String> addInputInvoice(HttpServletRequest req) {
		Map<String, String> resultMap = new HashMap<String, String>();
		String[] must = new String[]{"PAYDATE","PROJECT_ID","OPT_TYPE"};
		String[] nomust = new String[]{"PAYMENT","PAYNOTAX","TAXVALUE","TAXBALANCE","REMARK"};
		Map<String, String> pmap = MyUtil.requestToMap(req, must, nomust);
		if(null == pmap){
			resultMap.put("msg","必填项未填");
			resultMap.put("result","false");
			return resultMap;
		}
		
		try{
			String opt_type = pmap.get("OPT_TYPE");
			if("add".equals(opt_type)){
				pmap = MyUtil.formatMoney(pmap, nomust);
				String input_num = "GI_"+ DateTimeUtils.getNumber();
				pmap.put("INPUT_NUM", input_num);
				projectDao.addInputInvoice(pmap);
			}
			if("edit".equals(opt_type)){
				String input_id = MyUtil.getParamValue(req,"INPUT_ID");
				pmap.put("INPUT_ID", input_id);
				projectDao.editInputInvoice(pmap);
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
	 * @Description: 查询进项发票(专票)金额表
	 * @author zhouqiao
	 */
	@Override
	public Map<String, Object> queryInputinvoices(HttpServletRequest request) {
		String[] must = new String[]{"PROJECT_ID"};	
		String[] nomust = new String[]{"limit","offset"};
		Map<String, Object> resultMap = new HashMap<String,Object>();
 		Map<String, String> pmap = MyUtil.requestToMap(request, must, nomust);
		if (null == pmap) {
			resultMap.put("result", "false");
			resultMap.put("mess", "缺少参数!");
			return resultMap;
		}
		try {
			//查询结果
			List<Map<String, String>> lmap = projectDao.queryInputinvoices(pmap);
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
	 * 新增或修改进项发票(专票)
	 */
	@Override
	public Map<String, String> addInputInvoices(HttpServletRequest req) {
		Map<String, String> resultMap = new HashMap<String, String>();
		String[] must = new String[]{"PAYDATE","PROJECT_ID","OPT_TYPE"};
		String[] nomust = new String[]{"PAYMENT","PAYNOTAX","TAXVALUE","TAXBALANCE","REMARK"};
		Map<String, String> pmap = MyUtil.requestToMap(req, must, nomust);
		if(null == pmap){
			resultMap.put("msg","必填项未填");
			resultMap.put("result","false");
			return resultMap;
		}
		
		try{
			String opt_type = pmap.get("OPT_TYPE");
			if("add".equals(opt_type)){
				pmap = MyUtil.formatMoney(pmap, nomust);
				String input_num = "SI_"+ DateTimeUtils.getNumber();
				pmap.put("INPUT_NUM", input_num);
				projectDao.addInputInvoices(pmap);
			}
			if("edit".equals(opt_type)){
				String input_id = MyUtil.getParamValue(req,"INPUT_ID");
				pmap.put("INPUT_ID", input_id);
				projectDao.editInputInvoices(pmap);
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
	 * 删除一条记录
	 */
	@Override
	public Map<String, String> delRecord(HttpServletRequest req) {
		Map<String, String> resultMap = new HashMap<String, String>();
		String[] must = new String[]{"DEL_ID","TYPE"};
		String[] nomust = new String[]{};
		Map<String, String> pmap = MyUtil.requestToMap(req, must, nomust);
		if(null == pmap){
			resultMap.put("msg","必填项未填");
			resultMap.put("result","false");
			return resultMap;
		}
		
		try{
			String type = pmap.get("TYPE");
			if(type.equals("first")){//删除甲方付款
				projectDao.delFirstRecord(pmap);
			}
			if(type.equals("out")){//开发票
				projectDao.delOutRecord(pmap);
			}
			if(type.equals("input")){//进项发票
				projectDao.delInputRecord(pmap);
			}
			if(type.equals("special")){//进项发票
				projectDao.delSpecialRecord(pmap);
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
		String[] nomust = new String[]{"PROJECT_ID","TYPE","MEMO_ID","MEMO_STATE","MEMO_TITLE","MEMO_CONTENT","SID"};
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
		String[] nomust = new String[]{"PROJECT_NUM","PROJECT_NAME","COST_STATE"};
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
			List<Map<String, String>> smap = projectDao.queryCostSum(pmap);//查询合计
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
	 * 编辑成本
	 */
	@Override
	public Map<String, String> editProjectCost(HttpServletRequest request) {
		Map<String, String> resultMap = new HashMap<String, String>();
		String[] must = new String[]{};
		String[] nomust = new String[]{"COST_TYPE","COST_DETAIL","COST_REMARK",
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







