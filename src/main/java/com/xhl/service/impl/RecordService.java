package com.xhl.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.xhl.dao.RecordDao;
import com.xhl.service.IRecordService;
import com.xhl.utils.DateTimeUtils;
import com.xhl.utils.MyUtil;

@Service
@Transactional
public class RecordService implements IRecordService{
	
		
	    @Resource  
	    private RecordDao recordDao;
	    

		/**
		 * @Description: 查询
		 * @author zq
		 */
		@Override
		public Map<String, Object> queryRecord(HttpServletRequest request) {
			String[] must = new String[]{"limit","offset"};
			String[] nomust = new String[]{"RECORD_NAME","RECORD_STATE"};
			Map<String, Object> resultMap = new HashMap<String,Object>();
	 		Map<String, String> pmap = MyUtil.requestToMap(request, must, nomust);
			if (null == pmap) {
				resultMap.put("result", "false");
				resultMap.put("mess", "缺少参数!");
				return resultMap;
			}
			
			try {
				//查询结果
				List<Map<String, String>> lmap = recordDao.queryRecord(pmap);
				resultMap.put("rows", MyUtil.getPaging(pmap, lmap));
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
		 * 新建修改
		 */
		@Override
		public Map<String, String> editRecord(HttpServletRequest req) {
			Map<String, String> resultMap = new HashMap<String, String>();
			String[] must = new String[]{"TYPE"};
			String[] nomust = new String[]{"RECORD_NAME","RECORD_DATE","RECORD_STATE","RECORD_REMARK","LNID","RECORD_ID"};
			Map<String, String> pmap = MyUtil.requestToMap(req, must, nomust);
			if(null == pmap){
				resultMap.put("msg","必填项未填");
				resultMap.put("result","false");
				return resultMap;
			}
			
			try{
				String type = pmap.get("TYPE");
				//新建
				if("add".equals(type)){
					String record_num = "R_"+DateTimeUtils.getNumber();
					pmap.put("RECORD_NUM", record_num);
					pmap.put("CREATE_PERSON", pmap.get("LNID"));
					pmap.put("CREATE_TIME", DateTimeUtils.getFormatCurrentDate());
					recordDao.addRecord(pmap);
				}
				//修改
				if("edit".equals(type)){
					pmap.put("UPDATE_PERSON", pmap.get("LNID"));
					pmap.put("UPDATE_TIME", DateTimeUtils.getFormatCurrentDate());
					recordDao.editRecord(pmap);
				}
				resultMap.put("msg", "操作成功");
				resultMap.put("result", "true");
			}catch (Exception e) {
				resultMap.put("msg","操作失败");
				resultMap.put("result", "false");
				//logger.info("操作  ProjectDao.editProject 出错 uri为 --->>>" + req.getRequestURI()+"错误信息为："+e);
				e.printStackTrace();
			}
			return resultMap;
		}
}
