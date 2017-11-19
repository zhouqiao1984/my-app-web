package com.xhl.service;


import java.util.Map;

import javax.servlet.http.HttpServletRequest;


public interface IUserService {
	
	//用户登录
	Map<String, Object> userLogin(HttpServletRequest request);
	//查询所有用户
	Map<String, Object> queryAllUser(HttpServletRequest request);
	//编辑用户信息
	public Map<String, String> editUser(HttpServletRequest request);

}
