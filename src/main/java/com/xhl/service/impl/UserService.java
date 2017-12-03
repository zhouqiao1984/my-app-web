package com.xhl.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xhl.dao.UserDao;
import com.xhl.entity.User;
import com.xhl.service.IUserService;
import com.xhl.utils.DateTimeUtils;
import com.xhl.utils.MyUtil;

@Service
@Transactional
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
	        
		
		/**
		 * @Description: 查询所有用户
		 * @author zq
		 */
		@Override
		public Map<String, Object> queryAllUser(HttpServletRequest request) {
			String[] must = new String[]{"limit","offset"};
			String[] nomust = new String[]{"LOGINNAME","USERNAME"};
			Map<String, Object> resultMap = new HashMap<String,Object>();
	 		Map<String, String> pmap = MyUtil.requestToMap(request, must, nomust);
			if (null == pmap) {
				resultMap.put("result", "false");
				resultMap.put("mess", "缺少参数!");
				return resultMap;
			}
			
			try {
				//查询结果
				List<Map<String, String>> lmap = userDao.queryAllUser(pmap);
				resultMap.put("rows", MyUtil.getPaging(pmap, lmap));
				resultMap.put("total", pmap.containsKey("total")?pmap.get("total"):lmap.size());
				return resultMap;
			} catch (Exception e) {
				resultMap.put("result", "false");
				//logger.info("操作 ProjectDao.queryProject 出错 uri为 --->>>" + req.getRequestURI()+"错误信息为："+e);
				e.printStackTrace();
			}
			
			return resultMap;
		}
		
		
		/**
		 * 新建修改用户
		 */
		@Override
		public Map<String, String> editUser(HttpServletRequest req) {
			Map<String, String> resultMap = new HashMap<String, String>();
			String[] must = new String[]{};
			String[] nomust = new String[]{"TYPE","USERID","LOGINNAME","PASSWORD",
					"USERNAME","ROLE","REMARK"};
			Map<String, String> pmap = MyUtil.requestToMap(req, must, nomust);
			if(null == pmap){
				resultMap.put("msg","必填项未填");
				resultMap.put("result","false");
				return resultMap;
			}
			
			try{
				String type = pmap.get("TYPE");
				//新建
				if("add".equals(type)){
					String password=pmap.get("PASSWORD");
					pmap.remove("PASSWORD");
					User user=userDao.findUser(pmap);
					if(user!=null){
						resultMap.put("result", "false");
						resultMap.put("msg", "用户名已存在!");
						return resultMap;
					}
					pmap.put("PASSWORD", password);
					pmap.put("USERSTATE", "00");//执行中
					userDao.addUser(pmap);
				}
				//修改
				if("edit".equals(type)){
					userDao.editUser(pmap);
				}
				resultMap.put("msg", "操作成功");
				resultMap.put("result", "true");
			}catch (Exception e) {
				resultMap.put("msg","操作失败");
				resultMap.put("result", "false");
				//logger.info("操作  ProjectDao.editProject 出错 uri为 --->>>" + req.getRequestURI()+"错误信息为："+e);
				e.printStackTrace();
			}
			return resultMap;
		}
		
		/**
		 * 读取权限
		 */
		@Override
		public Map<String, Object> getUserRole(HttpServletRequest request) {
			Map<String, Object> resultMap=new HashMap<String, Object>();
			try{
				HttpSession session=request.getSession();
				User user = (User)session.getAttribute("userinfo");
				resultMap.put("username", user.getUserName());
				resultMap.put("loginname", user.getLoginName());
				resultMap.put("role", user.getRole());
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




