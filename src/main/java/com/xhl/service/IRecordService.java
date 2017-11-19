package com.xhl.service;


import java.util.Map;

import javax.servlet.http.HttpServletRequest;


public interface IRecordService {
	
	//查询
	Map<String, Object> queryRecord(HttpServletRequest request);
	//编辑
	public Map<String, String> editRecord(HttpServletRequest request);

}
