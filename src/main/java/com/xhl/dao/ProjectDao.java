package com.xhl.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xhl.entity.User;

@Repository
public interface ProjectDao {

	//查询项目
	 List<Map<String, String>>  queryProject(Map<String, String> map);
	//新建项目
	 void addProject(Map<String, String> map);
	//修改项目
	 void editProject(Map<String, String> map);
	 
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
	
	//查询进项发票(普票)金额表
	List<Map<String, String>>  queryInputinvoice(Map<String, String> map);
	//新建进项发票(普票)
	void addInputInvoice(Map<String, String> map);
	//修改进项发票(普票)
	void editInputInvoice(Map<String, String> map);
	
	//查询进项发票金额表(专票)
	List<Map<String, String>>  queryInputinvoices(Map<String, String> map);
	//新建进项发票(专票)
	void addInputInvoices(Map<String, String> map);
	//修改进项发票(专票)
	void editInputInvoices(Map<String, String> map);
		
	//删除甲方付款记录
	void delFirstRecord(Map<String, String> map);
	//删除开发票金额
	void delOutRecord(Map<String, String> map);
	//删除进项发票(普票)
	void delInputRecord(Map<String, String> map);
	//删除进项发票(专票)
	void delSpecialRecord(Map<String, String> map);
	
	//操作一个项目
	void closeProject(Map<String, String> map);
	//查询备忘录
	List<Map<String, String>>  queryMemo(Map<String, String> map);
	//新建备忘录
	void addMemo(Map<String, String> map);
	//修改备忘录
	void editMemo(Map<String, String> map);
	//删除备忘录
	void delMemo(Map<String, String> map);
	
	
	//查询成本list
	List<Map<String, String>>  queryCost(Map<String, String> map);
	//查询成本
	List<Map<String, String>>  queryCostByProid(Map<String, String> map);
	//查询成本合计
	List<Map<String, String>>  queryCostSum(Map<String, String> map);
	//新建成本
	void addCost(Map<String, String> map);
	//修改成本
	void editCost(Map<String, String> map);
	//删除成本
	void delCost(Map<String, String> map);
	
	//查询付款list
	List<Map<String, String>>  queryPay(Map<String, String> map);
	//查询付款
	List<Map<String, String>>  queryPayByProid(Map<String, String> map);
	//查询付款合计
	List<Map<String, String>>  queryPaySum(Map<String, String> map);
	//新建付款
	void addPay(Map<String, String> map);
	//修改付款
	void editPay(Map<String, String> map);
	//删除付款
	void delPay(Map<String, String> map);
}











