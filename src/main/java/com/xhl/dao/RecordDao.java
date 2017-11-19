package com.xhl.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;


@Repository
public interface RecordDao {

	//查询用户
	 List<Map<String, String>>  queryRecord(Map<String, String> map);
	//新建用户
	void addRecord(Map<String, String> map);
	//修改用户
	void editRecord(Map<String, String> map);
}
