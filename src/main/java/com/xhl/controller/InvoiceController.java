package com.xhl.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.xhl.service.IInvoiceService;
import com.xhl.utils.MyUtil;

@Controller
@RequestMapping("/invoice")
public class InvoiceController {
	
	@Resource
	private IInvoiceService invoiceService;
	
	
	
	
	/**
	 * 查询甲方付款信息
	 * 
	 * @param req
	 * @param res
	 */

	@RequestMapping("/queryFirstpayment")
	public void queryFirstpayment(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,invoiceService.queryFirstpayment(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 增加甲方付款信息
	 * 
	 * @param req
	 * @param res
	 */

	@RequestMapping("/addFirstPayment")
	public void addFirstPayment(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,invoiceService.addFirstPayment(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 新增开发票金额
	 * 
	 * @param req
	 * @param res
	 */

	@RequestMapping("/addOutInvoice")
	public void addOutInvoice(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,invoiceService.addOutInvoice(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	
	/**
	 * 查询开发票金额表
	 * 
	 * @param req
	 * @param res
	 */

	@RequestMapping("/queryOutinvoice")
	public void queryOutinvoice(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,invoiceService.queryOutinvoice(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	
	/**
	 * 新增进项发票(普票)
	 * 
	 * @param req
	 * @param res
	 */

	@RequestMapping("/addInputInvoice")
	public void addInputInvoice(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,invoiceService.addInputInvoice(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 查询进项发票(普票)金额表
	 * 
	 * @param req
	 * @param res
	 */

	@RequestMapping("/queryInputinvoice")
	public void queryInputinvoice(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,invoiceService.queryInputinvoice(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	

	
	/**
	 * 删除一条记录
	 * 
	 * @param req
	 * @param res
	 */

	@RequestMapping("/delRecord")
	public void delRecord(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,invoiceService.delRecord(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	/**
	 * 查询付款记录根据进项发票ID
	 * 
	 * @param req
	 * @param res
	 */

	@RequestMapping("/queryPayByInput")
	public void queryPayByInput(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,invoiceService.queryPayByInput(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 编辑付款管理
	 * 
	 * @param req
	 * @param res
	 */

	@RequestMapping("/editInvoicePay")
	public void editInvoicePay(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,invoiceService.editInvoicePay(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}





