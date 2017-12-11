package com.xhl.dao;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;


@Repository
public interface DepositDao {

	//查询保证金
	 List<Map<String, String>>  queryDepositList(Map<String, String> map);
	//查询保证金合计
	List<Map<String, String>>  queryDepositSum(Map<String, String> map);
	// 保证金信息维护
	 void editDepositInfo(Map<String, String> map);
	// 保证金信息维护
	void updateDepositInfo(Map<String, String> map);
	//查询回款明细
	List<Map<String, String>>  queryReturnList(Map<String, String> map);
	//查询回款合计
	List<Map<String, String>>  queryReturnSum(Map<String, String> map);
	//新建回款
	 void addReturn(Map<String, String> map);
	//修改回款
	 void editReturn(Map<String, String> map);
	//删除回款
	void delReturn(Map<String, String> map);
	//查询保证金管理是否存在
	String getDetailId(Map<String, String> map);
	// 保证金状态修改
	void editDepositState(Map<String, String> map);
}











