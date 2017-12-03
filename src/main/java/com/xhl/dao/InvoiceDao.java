package com.xhl.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xhl.entity.User;

@Repository
public interface InvoiceDao {

	//查询给甲方付款
	List<Map<String, String>>  queryFirstpayment(Map<String, String> map);
	//新建甲方付款
	void addFirstPayment(Map<String, String> map);
	//修改甲方付款
	void editFirstPayment(Map<String, String> map);
	
	//查询开发票金额表
	List<Map<String, String>>  queryOutinvoice(Map<String, String> map);
	//新建开发票
	void addOutInvoice(Map<String, String> map);
	//修改开发票
	void editOutInvoice(Map<String, String> map);
	
	//查询进项发票金额表
	List<Map<String, String>>  queryInputinvoice(Map<String, String> map);
	//新建进项发票
	void addInputInvoice(Map<String, String> map);
	//修改进项发票
	void editInputInvoice(Map<String, String> map);
	
		
	//删除甲方付款记录
	void delFirstRecord(Map<String, String> map);
	//删除开发票金额
	void delOutRecord(Map<String, String> map);
	//删除进项发票
	void delInputRecord(Map<String, String> map);
	
	

	//查询付款
	List<Map<String, String>>  queryPayByInput(Map<String, String> map);
	//查询付款合计
	List<Map<String, String>>  queryIPaySum(Map<String, String> map);
	//新建付款
	void addIPay(Map<String, String> map);
	//修改付款
	void editIPay(Map<String, String> map);
	//删除付款
	void delIPay(Map<String, String> map);

}











