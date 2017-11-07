package com.xhl.controller;


import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.xhl.service.ICardService;
import com.xhl.utils.MyUtil;

@Controller
@RequestMapping("/cardfunds")
public class CardController {
	
	@Resource
	private ICardService cardService;
	
	/**
	 * 查询账户
	 * 
	 * @param req
	 * @param res
	 */

	@RequestMapping("/queryCard")
	public void queryCard(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,cardService.queryCard(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 账户信息编辑
	 * 
	 * @param req
	 * @param res
	 */
	@RequestMapping("/editCard")
	public void editCard(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,cardService.editCard(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 查询账户明细
	 * 
	 * @param req
	 * @param res
	 */

	@RequestMapping("/queryDetail")
	public void queryDetail(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,cardService.queryDetail(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 账户明細编辑
	 * 
	 * @param req
	 * @param res
	 */
	@RequestMapping("/editDetail")
	public void editDetail(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,cardService.editDetail(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	/**
	 * 账户明細删除
	 * 
	 * @param req
	 * @param res
	 */
	@RequestMapping("/delDetail")
	public void delDetail(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,cardService.delDetail(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}





