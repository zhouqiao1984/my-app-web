package com.xhl.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;


@Repository
public interface OtherDao {

	//查询其他款项
	 List<Map<String, String>>  queryOther(Map<String, String> map);
	//查询其他款项合计
	List<Map<String, String>>  queryOtherSum(Map<String, String> map);
	//新建其他款项
	 void addOther(Map<String, String> map);
	//修改其他款项
	 void editOther(Map<String, String> map);
	//启用或停用其他款项
	 void optOther(Map<String, String> map);
	//查询明细
	List<Map<String, String>>  queryOtherDetail(Map<String, String> map);
	//新建明细
	void addOtherDetail(Map<String, String> map);
	//修改明细
	void editOtherDetail(Map<String, String> map);
	//删除明细
	void delOtherDetail(Map<String, String> map);
	//根据OTHER_ID查询合计
	List<Map<String, String>> querySum(Map<String, String> map);
	
}











