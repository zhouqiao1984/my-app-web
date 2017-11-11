package com.xhl.utils;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

public class MyUtil {
	
	
	/**
	 * 将json字符串处理为utf-8格式的编码并返回
	 * @param res
	 * @param json
	 */
	public static void writeUTFJson(HttpServletResponse response, String json) {
		PrintWriter writer = null;
		try {
			response.setCharacterEncoding("UTF-8");
			writer = response.getWriter();
			writer.write(json);
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (writer != null) {
				writer.flush();
			}
		}
	}
	
	
	 /**
     * 将java对象转换成json字符串
     *
     * @param bean
     * @return
     */
    public static String beanToJson(Object bean) {

        JSONObject json = JSONObject.fromObject(bean);
        return json.toString();

    }
    
    /**
	 * 请求对象request转成map 
	 * @param req
	 * @param must   必填列表
	 * @param nomust 非必填列表
	 * @return
	 */
	public static Map<String, String> requestToMap(HttpServletRequest req,String[] must,String []nomust){
		Map<String, String> map=new HashMap<String, String>();
		String p=null;
		if (must!=null) {
			for (int i = 0; i < must.length; i++) {
				p=getParamValue(req,must[i]);
				if (p==null) {
					p=getParamValue(req,must[i]+"[]");
				}
				if (p!=null&&p.trim().length()>0) {
					map.put(must[i], p);
				}else{//必填项出现 未填
					return null;
				}
			}
		}
		if (nomust!=null) {
			for (int i = 0; i < nomust.length; i++) {
				p=getParamValue(req,nomust[i]);
				if (p!=null&&p.trim().length()>0) {
					map.put(nomust[i], p);
				}else{
					map.put(nomust[i], "");
				}
			}
		}
		return map;
	}
	
	/**
	 * 获取参数值
	 * @param req
	 * @param paramName
	 * @return
	 */
	public static String getParamValue(HttpServletRequest req,String paramName){
		//增加传值过滤，防止sql注入
		///////////////////
		return req.getParameter(paramName);
	}
	
	 /**
     * 将java对象转换成jsonp字符串
     *
     * @param bean
     * @return
     */
    public static String beanToJsonp(HttpServletRequest req,Object bean) {
    	String call = (String)req.getParameter("call");
    	JSONObject json = JSONObject.fromObject(bean);
    	if(call!=null && !"".equals(call)){
    		return call+"("+json.toString()+")";
    	}else{
    		return "jsonp_success("+json.toString()+")";
    	}

    }
    
    /**
     * 将金额为空的字段设置成null
     *
     * @param bean
     * @return
     */
    public static Map<String, String> formatMoney(Map<String, String> pmap,String[] pay){
    	String payment = "";
    	if(null != pay){
    		for(int i=0;i<pay.length;i++){
    			payment = pmap.get(pay[i]);
    			if("".equals(payment) && !"REMARK".equals(pay[i])){
    				pmap.put(pay[i],"null");
    			}
    		}
    	}
    	return pmap;
    }
    
    
    /**
     * 对查询的List<Map<String, String>>分页
     *
     * @param 
     * @return
     */
    public static List<Map<String, String>> getPaging(Map<String, String> pmap,List<Map<String, String>> lmap){
    	List<Map<String, String>> rmap = new ArrayList<Map<String, String>>();
    	int offset = Integer.parseInt(pmap.get("offset"));
    	int limit = Integer.parseInt(pmap.get("limit"));
		int len = offset + limit;
		if(lmap.size()<len){
			len = lmap.size();
		}
		for(int i=offset;i<len;i++){
			rmap.add(lmap.get(i));
		}
    	return rmap;
    }
 
}
