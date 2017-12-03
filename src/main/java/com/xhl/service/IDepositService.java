package com.xhl.service;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

public interface IDepositService {
	//查询账户
	public Map<String, Object> queryDepositList(HttpServletRequest request);
	//保证金信息维护
	public Map<String, String> editDepositInfo(HttpServletRequest request);
	//查询回款明细
	public Map<String, Object> queryReturnList(HttpServletRequest request);
	//编辑回款明细
	public Map<String, String> editReturn(HttpServletRequest request);

}
