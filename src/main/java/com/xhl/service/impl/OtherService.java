package com.xhl.service.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xhl.dao.OtherDao;
import com.xhl.service.IOtherService;
import com.xhl.utils.DateTimeUtils;
import com.xhl.utils.MyUtil;


@Service
@Transactional
public class OtherService implements IOtherService{
	
	@Resource
	private OtherDao otherDao;
	
	/**
	 * @Description: 查询其他款项
	 * @author zhouqiao
	 */
	@Override
	public Map<String, Object> queryOther(HttpServletRequest request) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		String[] must = new String[]{"limit","offset"};
		String[] nomust = new String[]{"OTHER_STATE","OTHER_TYPE"};
		Map<String, String> pmap = MyUtil.requestToMap(request, must, nomust);
		if(null == pmap){
			resultMap.put("msg","必填项未填");
			resultMap.put("result","false");
			return resultMap;
		}
			
		try {
			//查询结果
			List<Map<String, String>> lmap = otherDao.queryOther(pmap);
			List<Map<String, String>> smap = otherDao.queryOtherSum(pmap);//查询合计
			List<Map<String, String>> rmap = MyUtil.getPaging(pmap, lmap);//分页结果
			rmap.add(smap.get(0));//合计与结果合并
			resultMap.put("rows", rmap);
			resultMap.put("total", pmap.containsKey("total")?pmap.get("total"):lmap.size());
			return resultMap;
		} catch (Exception e) {
			resultMap.put("result", "false");
			//logger.info("操作 ProjectDao.queryProject 出错 uri为 --->>>" + req.getRequestURI()+"错误信息为："+e);
			e.printStackTrace();
		}
		
		return resultMap;
	}
	
	/**
	 * 新建修改其他款项
	 */
	@Override
	public Map<String, String> editOther(HttpServletRequest request) {
		Map<String, String> resultMap = new HashMap<String, String>();
		String[] must = new String[]{};
		String[] nomust = new String[]{"TYPE","OTHER_ID","OTHER_NAME","REMARK","OTHER_STATE","OTHER_TYPE"};
		Map<String, String> pmap = MyUtil.requestToMap(request, must, nomust);
		if(null == pmap){
			resultMap.put("msg","必填项未填");
			resultMap.put("result","false");
			return resultMap;
		}
		
		try{
			String type = pmap.get("TYPE");
			//新建其他款项
			if("add".equals(type)){
				pmap.put("OTHER_STATE", "00");
				otherDao.addOther(pmap);
			}
			//修改其他款项
			if("edit".equals(type)){
				otherDao.editOther(pmap);
			}
			//启用停用
			if("opt".equals(type)){
				otherDao.optOther(pmap);
			}
		
			resultMap.put("msg", "操作成功");
			resultMap.put("result", "true");
		}catch (Exception e) {
			resultMap.put("msg","操作失败");
			resultMap.put("result", "false");
			//logger.info("操作  otherDao.editOther 出错 uri为 --->>>" + req.getRequestURI()+"错误信息为："+e);
			e.printStackTrace();
		}
		return resultMap;
	}
	
	
	/**
	 * @Description: 查询其他款项明细
	 * @author zhouqiao
	 */
	@Override
	public Map<String, Object> queryOtherDetail(HttpServletRequest request) {
		String[] must = new String[]{"limit","offset","OTHER_ID"};
		String[] nomust = new String[]{"OTHER_START_TIME","OTHER_END_TIME","OTHER_PAY_TYPE"};
		Map<String, Object> resultMap = new HashMap<String,Object>();
 		Map<String, String> pmap = MyUtil.requestToMap(request, must, nomust);
		if (null == pmap) {
			resultMap.put("result", "false");
			resultMap.put("msg", "缺少参数!");
			return resultMap;
		}
	
		try {
			List<Map<String, String>> lmap = otherDao.queryOtherDetail(pmap);//查询结果
			List<Map<String, String>> smap = otherDao.querySum(pmap);//查询合计
			List<Map<String, String>> rmap = MyUtil.getPaging(pmap, lmap);//分页结果
			rmap.add(smap.get(0));//合计与结果合并
			resultMap.put("rows", rmap);
			resultMap.put("total", pmap.containsKey("total")?pmap.get("total"):lmap.size());
			return resultMap;
		} catch (Exception e) {
			resultMap.put("result", "false");
			//logger.info("操作 OtherDao.queryOtherDetail 出错 uri为 --->>>" + req.getRequestURI()+"错误信息为："+e);
			e.printStackTrace();
		}
		
		return resultMap;
	}
	
	/**
	 * 编辑明细信息
	 */
	@Override
	public Map<String, String> editOtherDetail(HttpServletRequest request) {
		Map<String, String> resultMap = new HashMap<String, String>();
		String[] must = new String[]{"TYPE"};
		String[] nomust = new String[]{"OTHER_DETAIL_ID","REMARK","OTHER_DETAIL_DATE","OTHER_AMOUNT","OTHER_ID","OTHER_PAY_TYPE"};
		Map<String, String> pmap = MyUtil.requestToMap(request, must, nomust);
		if(null == pmap){
			resultMap.put("msg","缺少必填项");
			resultMap.put("result","false");
			return resultMap;
		}
		try{
			String type = pmap.get("TYPE");
			//新建 REAL_AMOUNT
			if("add".equals(type)){
				String other_detail_num = DateTimeUtils.getNumber();
				pmap.put("OTHER_DETAIL_NUM", other_detail_num);
				String pay_type = pmap.get("OTHER_PAY_TYPE");
				if("00".equals(pay_type)){
					pmap.put("REAL_AMOUNT", pmap.get("OTHER_AMOUNT"));
				}
				if("01".equals(pay_type)){
					pmap.put("REAL_AMOUNT", "-"+pmap.get("OTHER_AMOUNT"));
				}
				otherDao.addOtherDetail(pmap);
			}
			//修改
			if("edit".equals(type)){
				String pay_type = pmap.get("OTHER_PAY_TYPE");
				if("00".equals(pay_type)){
					pmap.put("REAL_AMOUNT", pmap.get("OTHER_AMOUNT"));
				}
				if("01".equals(pay_type)){
					pmap.put("REAL_AMOUNT", "-"+pmap.get("OTHER_AMOUNT"));
				}
				otherDao.editOtherDetail(pmap);
			}
			//删除
			if("del".equals(type)){
				otherDao.delOtherDetail(pmap);
			}
			resultMap.put("msg", "操作成功");
			resultMap.put("result", "true");
		}catch (Exception e) {
			resultMap.put("msg","操作失败");
			resultMap.put("result", "false");
			//logger.info("操作  OtherDao.editOtherDetail 出错 uri为 --->>>" + req.getRequestURI()+"错误信息为："+e);
			e.printStackTrace();
		}
		return resultMap;
	}

	
}






