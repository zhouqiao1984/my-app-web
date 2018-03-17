package com.xhl.dao;

import java.math.BigDecimal;
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
	//查询成本收入合计
	BigDecimal queryCostSumIn(Map<String, String> map);
	//查询成本支出合计
	BigDecimal  queryCostSumOut(Map<String, String> map);
	//新建成本
	void addCost(Map<String, String> map);
	//修改成本
	void editCost(Map<String, String> map);
	//删除成本
	void delCost(Map<String, String> map);
	
	//查询具体成本
	List<Map<String, String>>  queryCd(Map<String, String> map);
	//新建具体成本
	void addCd(Map<String, String> map);
	//修改具体成本
	void editCd(Map<String, String> map);
	//删除具体成本
	void delCd(Map<String, String> map);
	
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











