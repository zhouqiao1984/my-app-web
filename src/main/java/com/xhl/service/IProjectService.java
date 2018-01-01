package com.xhl.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

public interface IProjectService {
	//查询我的项目
	public Map<String, Object> queryProject(HttpServletRequest request);
	//编辑项目基本信息
	public Map<String, String> editProject(HttpServletRequest request);
	
	
	//关闭一个项目
	public Map<String, String> closeProject(HttpServletRequest request);
	
	//查询备忘录
	public Map<String, Object> queryMemo(HttpServletRequest request);
	//编辑备忘录
	public Map<String, String> saveMemo(HttpServletRequest request);
	
	
	//查询成本List
	public Map<String, Object> queryCost(HttpServletRequest request);
	//查询成本
	public Map<String, Object> queryCostByProid(HttpServletRequest request);
	//编辑成本
	public Map<String, String> editProjectCost(HttpServletRequest request);

	//查询具体成本
	public Map<String, Object> queryCd(HttpServletRequest request);
	//编辑具体成本
	public Map<String, String> editCd(HttpServletRequest request);
	
	
	//查询付款List
	public Map<String, Object> queryPay(HttpServletRequest request);
	//查询付款
	public Map<String, Object> queryPayByProid(HttpServletRequest request);
	//编辑付款
	public Map<String, String> editProjectPay(HttpServletRequest request);
	
	
}
