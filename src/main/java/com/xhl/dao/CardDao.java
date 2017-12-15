package com.xhl.dao;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;


@Repository
public interface CardDao {

	//查询账户
	 List<Map<String, String>>  queryCard(Map<String, String> map);
	//查询合计
	List<Map<String, String>>  queryCardSum(Map<String, String> map);
	//新建账户
	 void addCard(Map<String, String> map);
	//修改账户
	 void editCard(Map<String, String> map);
	//启用或停用账户
	 void optCard(Map<String, String> map);
	//查询明细
	List<Map<String, String>>  queryDetail(Map<String, String> map);
	//查询明细合计
	List<Map<String, String>>  queryDetailSum(Map<String, String> map);
	//得到当前余额
	BigDecimal getBalance(Map<String, String> map);
	//最新日期
	String getDate(Map<String, String> map);
	//新建明细
	void addDetail(Map<String, String> map);
	//修改明细
	void editDetail(Map<String, String> map);
	//删除最近一条明细记录
	void delDetail(Map<String, String> map);
	//查询根据类别统计信息
	List<Map<String, String>>  queryStatistic(Map<String, String> map);
	
	//查询具体款项
	List<Map<String, String>>  queryContent(Map<String, String> map);
	//查询具体款项合计
	List<Map<String, String>>  queryContentSum(Map<String, String> map);
	//新建具体款项
	void addContent(Map<String, String> map);
	//修改具体款项
	void editContent(Map<String, String> map);
	//删除具体款项
	void delContent(Map<String, String> map);
}











