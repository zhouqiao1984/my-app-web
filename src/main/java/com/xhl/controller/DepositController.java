package com.xhl.controller;


import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.xhl.service.IDepositService;
import com.xhl.utils.MyUtil;

@Controller
@RequestMapping("/deposit")
public class DepositController {
	
	@Resource
	private IDepositService depositService;
	
	/**
	 * 查询账户
	 * 
	 * @param req
	 * @param res
	 */

	@RequestMapping("/queryDepositList")
	public void queryDepositList(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,depositService.queryDepositList(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 保证金信息维护
	 * 
	 * @param req
	 * @param res
	 */
	@RequestMapping("/editDepositInfo")
	public void editDepositInfo(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJson(depositService.editDepositInfo(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 查询回款明细
	 * 
	 * @param req
	 * @param res
	 */

	@RequestMapping("/queryReturnList")
	public void queryReturnList(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,depositService.queryReturnList(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 回款明细编辑
	 * 
	 * @param req
	 * @param res
	 */
	@RequestMapping("/editReturn")
	public void editReturn(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJson(depositService.editReturn(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 保证金状态修改
	 * 
	 * @param req
	 * @param res
	 */
	@RequestMapping("/editDepositState")
	public void editDepositState(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJson(depositService.editDepositState(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
}





