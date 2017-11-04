package com.xhl.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

public interface IProjectService {
	//查询我的项目
	public Map<String, Object> queryProject(HttpServletRequest request);
	//编辑项目基本信息
	public Map<String, String> editProject(HttpServletRequest request);
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
	
	//查询进项发票(专票)金额表
	public Map<String, Object> queryInputinvoices(HttpServletRequest request);
	//增加进项发票(专票)金额
	public Map<String, String> addInputInvoices(HttpServletRequest request);
	
	//删除一条记录
	public Map<String, String> delRecord(HttpServletRequest request);
	
	//关闭一个项目
	public Map<String, String> closeProject(HttpServletRequest request);
	
	//查询备忘录
	public Map<String, Object> queryMemo(HttpServletRequest request);
	//编辑备忘录
	public Map<String, String> saveMemo(HttpServletRequest request);
	
	
}
