package com.xhl.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

public interface IInvoiceService {
	
	//查询甲方付款信息
	public Map<String, Object> queryFirstpayment(HttpServletRequest request);
	//增加甲方付款信息
	public Map<String, String> addFirstPayment(HttpServletRequest request);
	//查询开发票金额表
	public Map<String, Object> queryOutinvoice(HttpServletRequest request);
	//增加开发票金额
	public Map<String, String> addOutInvoice(HttpServletRequest request);
	
	//查询进项发票(普票)金额表
	public Map<String, Object> queryInputinvoice(HttpServletRequest request);
	//增加进项发票(普票)金额
	public Map<String, String> addInputInvoice(HttpServletRequest request);
	
	
	//删除一条记录
	public Map<String, String> delRecord(HttpServletRequest request);
	
	//查询付款记录根据进项发票ID
	public Map<String, Object> queryPayByInput(HttpServletRequest request);
	//编辑付款管理
	public Map<String, String> editInvoicePay(HttpServletRequest request);
	
}
