package com.xhl.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;


@Repository
public interface RecordDao {

	//查询记录
	 List<Map<String, String>>  queryRecord(Map<String, String> map);
	//新建记录
	void addRecord(Map<String, String> map);
	//修改记录
	void editRecord(Map<String, String> map);
	//删除记录
	void delRecord(Map<String, String> map);
}
