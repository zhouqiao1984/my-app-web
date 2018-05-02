package com.xhl.controller;

import java.io.IOException;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
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
import com.xhl.utils.RSAUtil.RSAUtils;

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
	
	/**
	 * 登录密码加密 20180502
	 * 
	 * @param req
	 * @param res
	 */
	@RequestMapping("loginrsa")
	public void loginRSA(HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> loginMap = new HashMap<String, Object>();
		
		RSAUtils rsa = new RSAUtils();
		//生成公钥和密钥
		Map<String,Object> keyMap = rsa.createKey();
		RSAPublicKey publicKey = (RSAPublicKey) keyMap.get("publicKey");
		RSAPrivateKey privateKey = (RSAPrivateKey) keyMap.get("privateKey");
		//js通过模和公钥指数获取公钥对字符串进行加密，注意必须转为16进制
		//模
		String Modulus = publicKey.getModulus().toString(16);
		//公钥指数
		String Exponent = publicKey.getPublicExponent().toString(16);
		//私钥指数    
        String private_exponent = privateKey.getPrivateExponent().toString();
        HttpSession session = request.getSession();
        //java中的模和私钥指数不需要转16进制，但是js中的需要转换为16进制
        session.setAttribute("Modulus", publicKey.getModulus().toString());
        session.setAttribute("private_exponent", private_exponent);
        String strSet = Modulus+";"+Exponent;
        loginMap.put("RSA", strSet);
		MyUtil.writeUTFJson(response, MyUtil.beanToJson(loginMap));
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
