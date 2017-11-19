package com.xhl.utils;

import java.util.TimeZone;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.xhl.utils.MyUtil;
import com.xhl.entity.User;

public class GlobalInterceptor extends HandlerInterceptorAdapter {
	private static final Logger logger = Logger.getLogger(GlobalInterceptor.class);
	private final static int maxSessionActive = 3600;//session有效时间1小时
	public GlobalInterceptor(){//设置默认的时区
		TimeZone.setDefault(TimeZone.getTimeZone("GMT+8"));
	}
	
	public boolean preHandle(HttpServletRequest request,HttpServletResponse response, Object handler) throws Exception {
		User user = (User) request.getSession().getAttribute("userinfo");
		HttpSession session = request.getSession();
		if (user == null) {
			MyUtil.jsonMessage(response, "{\"logintimeout\":true}");
			return false;
		}
		
		session.setMaxInactiveInterval(maxSessionActive);
		//logger.info("用户登录名及请求地址uri:"+user.getLogin_name()+">>>"+request.getRequestURI());
		return true;
	}

	public void postHandle(HttpServletRequest request,HttpServletResponse response, Object handler,ModelAndView modelAndView) throws Exception {

	}

	public void afterCompletion(HttpServletRequest request,HttpServletResponse response, Object handler, Exception ex)throws Exception {

	}

}