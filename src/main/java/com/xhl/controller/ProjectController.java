package com.xhl.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.xhl.service.IProjectService;
import com.xhl.utils.MyUtil;

@Controller
@RequestMapping("/project")
public class ProjectController {
	
	@Resource
	private IProjectService projectService;
	
	/**
	 * 查询
	 * 
	 * @param req
	 * @param res
	 */

	@RequestMapping("/queryProject")
	public void queryProject(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,projectService.queryProject(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 项目信息编辑
	 * 
	 * @param req
	 * @param res
	 */
	@RequestMapping("/editProject")
	public void editProject(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJson(projectService.editProject(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 查询甲方付款信息
	 * 
	 * @param req
	 * @param res
	 */

	@RequestMapping("/queryFirstpayment")
	public void queryFirstpayment(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,projectService.queryFirstpayment(request)));
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
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,projectService.addFirstPayment(request)));
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
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,projectService.addOutInvoice(request)));
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
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,projectService.queryOutinvoice(request)));
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
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,projectService.addInputInvoice(request)));
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
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,projectService.queryInputinvoice(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	
	/**
	 * 新增进项发票(专票)
	 * 
	 * @param req
	 * @param res
	 */

	@RequestMapping("/addInputInvoices")
	public void addInputInvoices(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,projectService.addInputInvoices(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 查询进项发票(专票)金额表
	 * 
	 * @param req
	 * @param res
	 */

	@RequestMapping("/queryInputinvoices")
	public void queryInputinvoices(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,projectService.queryInputinvoices(request)));
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
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,projectService.delRecord(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 关闭一个项目
	 * 
	 * @param req
	 * @param res
	 */

	@RequestMapping("/closeProject")
	public void closeProject(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,projectService.closeProject(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	/**
	 * 查询备忘录
	 * 
	 * @param req
	 * @param res
	 */
	@RequestMapping("/queryMemo")
	public void queryMemo(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,projectService.queryMemo(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	/**
	 * 编辑备忘录
	 * 
	 * @param req
	 * @param res
	 */
	@RequestMapping("/saveMemo")
	public void saveMemo(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,projectService.saveMemo(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	/**
	 * 查询成本管理
	 * 
	 * @param req
	 * @param res
	 */

	@RequestMapping("/queryCost")
	public void queryCost(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,projectService.queryCost(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 查询成本管理由项目ID
	 * 
	 * @param req
	 * @param res
	 */

	@RequestMapping("/queryCostByProid")
	public void queryCostByProid(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,projectService.queryCostByProid(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 编辑成本管理
	 * 
	 * @param req
	 * @param res
	 */

	@RequestMapping("/editProjectCost")
	public void editProjectCost(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,projectService.editProjectCost(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	
	/**
	 * 查询付款管理
	 * 
	 * @param req
	 * @param res
	 */

	@RequestMapping("/queryPay")
	public void queryPay(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,projectService.queryPay(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 查询付款管理由项目ID
	 * 
	 * @param req
	 * @param res
	 */

	@RequestMapping("/queryPayByProid")
	public void queryPayByProid(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,projectService.queryPayByProid(request)));
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

	@RequestMapping("/editProjectPay")
	public void editProjectPay(HttpServletRequest request, HttpServletResponse response) {
		try {
			MyUtil.writeUTFJson(response, MyUtil.beanToJsonp(request,projectService.editProjectPay(request)));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}





