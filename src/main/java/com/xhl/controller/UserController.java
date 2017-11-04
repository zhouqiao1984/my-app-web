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
import com.xhl.service.IUserService;

import net.sf.json.JSONObject;



@Controller  
@RequestMapping("/user")  
public class UserController {
    @Resource  
    private IUserService userService;  
      
//    @RequestMapping("/showUser")  
//    public void getUserById(HttpServletRequest req,HttpServletResponse res){ 
//        String userId = req.getParameter("id");  
//        User user = this.userService.getUserById(userId);  
//        JSONObject object = JSONObject.fromObject(user);  
//        writeUTFJson(res,object.toString());
//        
//    }
    
    
 
}
