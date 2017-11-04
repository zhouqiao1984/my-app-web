package com.xhl.service;


import java.util.Map;

import javax.servlet.http.HttpServletRequest;


public interface IUserService {
	
	//用户登录
	Map<String, Object> userLogin(HttpServletRequest request);
	

}
