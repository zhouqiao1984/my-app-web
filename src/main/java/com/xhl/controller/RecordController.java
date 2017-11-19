package com.xhl.controller;



import java.io.IOException;
import java.io.PrintWriter;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.xhl.service.IRecordService;
import com.xhl.utils.MyUtil;

import net.sf.json.JSONObject;



@Controller  
@RequestMapping("/record")  
public class RecordController {
    @Resource  
    private IRecordService recordService;  
      
	
	/**
	 * 查询所有事件
	 * 
	 * @param req
	 * @param res
	 */

	@RequestMapping("/queryRecord")
	public void queryRecord(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,recordService.queryRecord(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
    
	/**
	 * 事件信息编辑
	 * 
	 * @param req
	 * @param res
	 */
	@RequestMapping("/editRecord")
	public void editRecord(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJson(recordService.editRecord(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
 
}
