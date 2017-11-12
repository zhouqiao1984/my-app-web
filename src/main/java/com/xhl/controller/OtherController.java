package com.xhl.controller;


import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.xhl.service.IOtherService;
import com.xhl.utils.MyUtil;

@Controller
@RequestMapping("/otherfunds")
public class OtherController {
	
	@Resource
	private IOtherService otherService;
	
	/**
	 * 查询其他款项
	 * 
	 * @param req
	 * @param res
	 */

	@RequestMapping("/queryOther")
	public void queryOther(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,otherService.queryOther(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 其他款项信息编辑
	 * 
	 * @param req
	 * @param res
	 */
	@RequestMapping("/editOther")
	public void editOther(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,otherService.editOther(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 查询其他款项明细
	 * 
	 * @param req
	 * @param res
	 */

	@RequestMapping("/queryOtherDetail")
	public void queryOtherDetail(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,otherService.queryOtherDetail(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 其他款项明細编辑
	 * 
	 * @param req
	 * @param res
	 */
	@RequestMapping("/editOtherDetail")
	public void editOtherDetail(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,otherService.editOtherDetail(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	
}





