package com.xhl.controller;



import java.io.IOException;
import java.io.PrintWriter;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.xhl.entity.User;
import com.xhl.service.IProjectService;
import com.xhl.service.IUserService;
import com.xhl.utils.MyUtil;

import net.sf.json.JSONObject;



@Controller  
@RequestMapping("/user")  
public class UserController {
    @Resource  
    private IUserService userService;  
      
	
	/**
	 * 查询所有用户
	 * 
	 * @param req
	 * @param res
	 */

	@RequestMapping("/queryAllUser")
	public void queryAllUser(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,userService.queryAllUser(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
    
	/**
	 * 用户信息编辑
	 * 
	 * @param req
	 * @param res
	 */
	@RequestMapping("/editUser")
	public void editUser(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJson(userService.editUser(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 读取用户权限
	 * 
	 * @param req
	 * @param res
	 */
	@RequestMapping("/getUserRole")
	public void getUserRole(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJson(userService.getUserRole(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
 
}
