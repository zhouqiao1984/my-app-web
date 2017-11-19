package com.xhl.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.xhl.entity.User;
import com.xhl.service.IUserService;
import com.xhl.utils.MyUtil;

@Controller
@RequestMapping("/")
public class LoginController {
	
	@Resource
	private IUserService userService;
	
	/**
	 * 登录验证
	 * 
	 * @param req
	 * @param res
	 */
	@RequestMapping("login")
	public void login(HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> loginMap = new HashMap<String, Object>();
		loginMap = userService.userLogin(request);
		if ("true".equals(loginMap.get("result"))) {
			Object object = loginMap.get("userinfo");
			HttpSession session=request.getSession();
			session.setAttribute("userinfo", object);
		}
		MyUtil.writeUTFJson(response, MyUtil.beanToJson(loginMap));
	}
	
	
	@RequestMapping("main")
	public void toIndex(HttpServletRequest request, HttpServletResponse response) {
		try {
			request.getRequestDispatcher("WEB-INF/pages/main.jsp").forward(request, response);
		} catch (ServletException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
//	@RequestMapping("nav")
//	public void toIndex_top(HttpServletRequest request, HttpServletResponse response) {
//		try {
//			request.getRequestDispatcher("WEB-INF/nav.jsp").forward(request, response);
//		} catch (ServletException e) {
//			e.printStackTrace();
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//	}
	
}
