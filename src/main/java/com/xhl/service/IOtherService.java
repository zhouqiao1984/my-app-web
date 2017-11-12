package com.xhl.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

public interface IOtherService {
	//查询其他款项
	public Map<String, Object> queryOther(HttpServletRequest request);
	//编辑其他款项信息
	public Map<String, String> editOther(HttpServletRequest request);
	//查询其他款项明细
	public Map<String, Object> queryOtherDetail(HttpServletRequest request);
	//编辑明细信息
	public Map<String, String> editOtherDetail(HttpServletRequest request);

}
