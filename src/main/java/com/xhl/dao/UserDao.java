package com.xhl.dao;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.xhl.entity.User;

@Repository
public interface UserDao {

	//用户登陆
	User findUser(Map<String, String> pmap);

	//查询用户
	 List<Map<String, String>>  queryAllUser(Map<String, String> map);
	//新建用户
	void addUser(Map<String, String> map);
	//修改用户
	void editUser(Map<String, String> map);
}
