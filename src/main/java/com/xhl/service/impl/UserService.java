package com.xhl.service.impl;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

import com.xhl.dao.UserDao;
import com.xhl.entity.User;
import com.xhl.service.IUserService;
import com.xhl.utils.MyUtil;

@Service("userService")
public class UserService implements IUserService{
	
		
	    @Resource  
	    private UserDao userDao;
	    

		/**
		 * 登陆名、密码和人数验证
		 */
		@Override
		public Map<String, Object> userLogin(HttpServletRequest request) {
			String []must={"LOGINNAME","PASSWORD"};
			Map<String, String> pmap=MyUtil.requestToMap(request, must, null);
			Map<String, Object> resultMap=new HashMap<String, Object>();
			try{
				
				String password=pmap.get("PASSWORD");
				pmap.remove("PASSWORD");
				User user=userDao.findUser(pmap);
				if(user==null){
					resultMap.put("result", "false");
					resultMap.put("msg", "用户名不存在!");
					return resultMap;
				}
				
				pmap.put("PASSWORD", password);
				User user1=userDao.findUser(pmap);
				if(user1==null){
					resultMap.put("result", "false");
					resultMap.put("msg", "密码错误!");
					return resultMap;
				}
				resultMap.put("userinfo", user1);
				resultMap.put("result", "true");
				return resultMap;
			}catch(Exception e){
				e.printStackTrace();
			}
			resultMap.put("result", "false");
			resultMap.put("msg", "未知错误!");
			return resultMap;
		}
	        
}
