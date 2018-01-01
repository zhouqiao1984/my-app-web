package com.xhl.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xhl.utils.MyUtil;
import com.xhl.dao.InvoiceDao;
import com.xhl.service.IInvoiceService;
import com.xhl.utils.DateTimeUtils;


@Service
@Transactional
public class InvoiceService implements IInvoiceService{
	
	@Resource
	private InvoiceDao invoiceDao;
	
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
			List<Map<String, String>> lmap = invoiceDao.queryFirstpayment(pmap);
			resultMap.put("rows", lmap);
			resultMap.put("total", pmap.containsKey("total")?pmap.get("total"):lmap.size());
			return resultMap;
		} catch (Exception e) {
			resultMap.put("result", "false");
			//logger.info("操作 invoiceDao.queryProject 出错 uri为 --->>>" + req.getRequestURI()+"错误信息为："+e);
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
			pmap = MyUtil.formatMoney(pmap, nomust);
			String opt_type = pmap.get("OPT_TYPE");
			if("add".equals(opt_type)){
				String first_num  = "FP_"+ DateTimeUtils.getNumber();
				pmap.put("FIRST_NUM",first_num);
				invoiceDao.addFirstPayment(pmap);
			}
			if("edit".equals(opt_type)){
				String first_id = MyUtil.getParamValue(req,"FIRST_ID");
				pmap.put("FIRST_ID", first_id);
				invoiceDao.editFirstPayment(pmap);
			}
			resultMap.put("msg", "操作成功");
			resultMap.put("result", "true");
		}catch (Exception e) {
			resultMap.put("msg","操作失败");
			resultMap.put("result", "false");
			//logger.info("操作  invoiceDao.editProject 出错 uri为 --->>>" + req.getRequestURI()+"错误信息为："+e);
			e.printStackTrace();
		}
		return resultMap;
	}
	
	/**
	 * @Description: 查询出项发票金额表
	 * @author zhouqiao
	 */
	@Override
	public Map<String, Object> queryOutinvoice(HttpServletRequest request) {
		String[] must = new String[]{"PROJECT_ID"};	
		String[] nomust = new String[]{"limit","offset","STATE","TYPE","INVOICE_TYPE"};
		Map<String, Object> resultMap = new HashMap<String,Object>();
 		Map<String, String> pmap = MyUtil.requestToMap(request, must, nomust);
		if (null == pmap) {
			resultMap.put("result", "false");
			resultMap.put("mess", "缺少参数!");
			return resultMap;
		}
		try {
			//查询结果
			List<Map<String, String>> lmap = invoiceDao.queryOutinvoice(pmap);
			resultMap.put("rows", lmap);
			resultMap.put("total", pmap.containsKey("total")?pmap.get("total"):lmap.size());
			return resultMap;
		} catch (Exception e) {
			resultMap.put("result", "false");
			//logger.info("操作 invoiceDao.queryProject 出错 uri为 --->>>" + req.getRequestURI()+"错误信息为："+e);
			e.printStackTrace();
		}
		
		return resultMap;
	}
	
	
	/**
	 * 新增出项发票金额
	 */
	@Override
	public Map<String, String> addOutInvoice(HttpServletRequest req) {
		Map<String, String> resultMap = new HashMap<String, String>();
		String[] must = new String[]{"PAYDATE","PROJECT_ID","OPT_TYPE"};
		String[] nomust = new String[]{"REMARK","STATE","TYPE","COMPANY","INVOICE_TYPE","UNDERFILLED"};
		String[] money = new String[]{"PAYMENT","PAYNOTAX","TAXVALUE","UPTAX","ADDTAX","OTHERTAX"};
		Map<String, String> pmap = MyUtil.requestToMap(req, must, nomust ,money);
		if(null == pmap){
			resultMap.put("msg","必填项未填");
			resultMap.put("result","false");
			return resultMap;
		}
		
		try{
			pmap = MyUtil.formatMoney(pmap, nomust);
			String opt_type = pmap.get("OPT_TYPE");
			if("add".equals(opt_type)){
				String invioce_type = pmap.get("INVOICE_TYPE");
				String out_num = "";
				if("00".equals(invioce_type)){ out_num = "GO_"+ DateTimeUtils.getNumber();};//普通
				if("01".equals(invioce_type)){ out_num = "SO_"+ DateTimeUtils.getNumber();};//专用
				pmap.put("OUT_NUM", out_num);
				invoiceDao.addOutInvoice(pmap);
			}
			if("edit".equals(opt_type)){
				String out_id = MyUtil.getParamValue(req,"OUT_ID");
				pmap.put("OUT_ID", out_id);
				invoiceDao.editOutInvoice(pmap);
			}
		
			resultMap.put("msg", "操作成功");
			resultMap.put("result", "true");
		}catch (Exception e) {
			resultMap.put("msg","操作失败");
			resultMap.put("result", "false");
			//logger.info("操作  invoiceDao.editProject 出错 uri为 --->>>" + req.getRequestURI()+"错误信息为："+e);
			e.printStackTrace();
		}
		return resultMap;
	}
	
	/**
	 * @Description: 查询进项发票金额表
	 * @author zhouqiao
	 */
	@Override
	public Map<String, Object> queryInputinvoice(HttpServletRequest request) {
		String[] must = new String[]{"PROJECT_ID"};	
		String[] nomust = new String[]{"limit","offset","STATE","TYPE","INVOICE_TYPE"};
		Map<String, Object> resultMap = new HashMap<String,Object>();
 		Map<String, String> pmap = MyUtil.requestToMap(request, must, nomust);
		if (null == pmap) {
			resultMap.put("result", "false");
			resultMap.put("mess", "缺少参数!");
			return resultMap;
		}
		try {
			//查询结果
			List<Map<String, String>> lmap = invoiceDao.queryInputinvoice(pmap);
			resultMap.put("rows", lmap);
			resultMap.put("total", pmap.containsKey("total")?pmap.get("total"):lmap.size());
			return resultMap;
		} catch (Exception e) {
			resultMap.put("result", "false");
			//logger.info("操作 invoiceDao.queryProject 出错 uri为 --->>>" + req.getRequestURI()+"错误信息为："+e);
			e.printStackTrace();
		}
		
		return resultMap;
	}
	
	/**
	 * 新增进项发票
	 */
	@Override
	public Map<String, String> addInputInvoice(HttpServletRequest req) {
		Map<String, String> resultMap = new HashMap<String, String>();
		String[] must = new String[]{"PAYDATE","PROJECT_ID","OPT_TYPE"};
		String[] nomust = new String[]{"REMARK","STATE","TYPE","COMPANY","INVOICE_TYPE","UNDERFILLED"};
		String[] money = new String[]{"PAYMENT","PAYNOTAX","TAXVALUE"};
		Map<String, String> pmap = MyUtil.requestToMap(req, must, nomust,money);
		if(null == pmap){
			resultMap.put("msg","必填项未填");
			resultMap.put("result","false");
			return resultMap;
		}
		
		try{
			String opt_type = pmap.get("OPT_TYPE");
			if("add".equals(opt_type)){
				String invioce_type = pmap.get("INVOICE_TYPE");
				String input_num = "";
				if("00".equals(invioce_type)){ input_num = "GI_"+ DateTimeUtils.getNumber();};//普通
				if("01".equals(invioce_type)){ input_num = "SI_"+ DateTimeUtils.getNumber();};//专用
				pmap.put("INPUT_NUM", input_num);
				invoiceDao.addInputInvoice(pmap);
			}
			if("edit".equals(opt_type)){
				String input_id = MyUtil.getParamValue(req,"INPUT_ID");
				pmap.put("INPUT_ID", input_id);
				invoiceDao.editInputInvoice(pmap);
			}
			resultMap.put("msg", "操作成功");
			resultMap.put("result", "true");
		}catch (Exception e) {
			resultMap.put("msg","操作失败");
			resultMap.put("result", "false");
			//logger.info("操作  invoiceDao.editProject 出错 uri为 --->>>" + req.getRequestURI()+"错误信息为："+e);
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
				invoiceDao.delFirstRecord(pmap);
			}
			if(type.equals("out")){//开发票
				invoiceDao.delOutRecord(pmap);
			}
			if(type.equals("input")){//进项发票
				invoiceDao.delInputRecord(pmap);
			}
			
			resultMap.put("msg", "操作成功");
			resultMap.put("result", "true");
		}catch (Exception e) {
			resultMap.put("msg","操作失败");
			resultMap.put("result", "false");
			//logger.info("操作  invoiceDao.editProject 出错 uri为 --->>>" + req.getRequestURI()+"错误信息为："+e);
			e.printStackTrace();
		}
		return resultMap;
	}
	
	
	/**
	 * @Description: 查询付款记录根据发票ID
	 * @author zq
	 */
	@Override
	public Map<String, Object> queryPayByInput(HttpServletRequest request) {
		String[] must = new String[]{"limit","offset","INPUT_ID"};
		String[] nomust = new String[]{"PAY_START_TIME","PAY_END_TIME","IP_TYPE"};
		Map<String, Object> resultMap = new HashMap<String,Object>();
 		Map<String, String> pmap = MyUtil.requestToMap(request, must, nomust);
		if (null == pmap) {
			resultMap.put("result", "false");
			resultMap.put("mess", "缺少参数!");
			return resultMap;
		}
	
		try {
			//查询结果
			List<Map<String, String>> lmap = invoiceDao.queryPayByInput(pmap);//查询结果
			List<Map<String, String>> smap = invoiceDao.queryIPaySum(pmap);//查询合计
			List<Map<String, String>> rmap = MyUtil.getPaging(pmap, lmap);//分页结果
			rmap.add(smap.get(0));//合计与结果合并
			resultMap.put("rows", rmap);
			resultMap.put("total", pmap.containsKey("total")?pmap.get("total"):lmap.size());
			return resultMap;
		} catch (Exception e) {
			resultMap.put("result", "false");
			//logger.info("操作 invoiceDao.queryProject 出错 uri为 --->>>" + req.getRequestURI()+"错误信息为："+e);
			e.printStackTrace();
		}
		
		return resultMap;
	}
	
	
	/**
	 * 编辑付款
	 */
	@Override
	public Map<String, String> editInvoicePay(HttpServletRequest request) {
		Map<String, String> resultMap = new HashMap<String, String>();
		String[] must = new String[]{};
		String[] nomust = new String[]{"IP_REMARK","TYPE","IP_DATE",
				"IP_AMOUNT","PROJECT_ID","INPUT_ID","IP_ID","IP_TYPE"};
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
				String ip_num  = "IP_"+ DateTimeUtils.getNumber();
				pmap.put("IP_NUM", ip_num);
				invoiceDao.addIPay(pmap);
			}
			//修改
			if("edit".equals(type)){
				invoiceDao.editIPay(pmap);
			}
			//删除
			if("del".equals(type)){
				invoiceDao.delIPay(pmap);
			}
		
			resultMap.put("msg", "操作成功");
			resultMap.put("result", "true");
		}catch (Exception e) {
			resultMap.put("msg","操作失败");
			resultMap.put("result", "false");
			//logger.info("操作  invoiceDao.editInvoicePay 出错 uri为 --->>>" + req.getRequestURI()+"错误信息为："+e);
			e.printStackTrace();
		}
		return resultMap;
	}
	
	
}







