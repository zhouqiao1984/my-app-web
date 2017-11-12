package com.xhl.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

public interface ICardService {
	//查询账户
	public Map<String, Object> queryCard(HttpServletRequest request);
	//编辑账户信息
	public Map<String, String> editCard(HttpServletRequest request);
	//查询账户明细
	public Map<String, Object> queryDetail(HttpServletRequest request);
	//编辑明细信息
	public Map<String, String> editDetail(HttpServletRequest request);
	//删除明细信息
	public Map<String, String> delDetail(HttpServletRequest request);
	//查询根据类别统计信息
	public Map<String, Object> queryStatistic(HttpServletRequest request);
}
