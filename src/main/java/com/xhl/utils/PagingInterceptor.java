


package com.xhl.utils;


public class PagingInterceptor{
	
}
//import java.sql.Connection;
//import java.sql.PreparedStatement;
//import java.sql.ResultSet;
//import java.util.Map;
//import java.util.Properties;
//
//import org.apache.ibatis.executor.Executor;
//import org.apache.ibatis.mapping.BoundSql;
//import org.apache.ibatis.mapping.MappedStatement;
//import org.apache.ibatis.mapping.MappedStatement.Builder;
//import org.apache.ibatis.mapping.ParameterMapping;
//import org.apache.ibatis.mapping.SqlSource;
//import org.apache.ibatis.plugin.Interceptor;
//import org.apache.ibatis.plugin.Intercepts;
//import org.apache.ibatis.plugin.Invocation;
//import org.apache.ibatis.plugin.Plugin;
//import org.apache.ibatis.plugin.Signature;
//import org.apache.ibatis.scripting.defaults.DefaultParameterHandler;
//import org.apache.ibatis.session.ResultHandler;
//import org.apache.ibatis.session.RowBounds;
//
//@Intercepts({ @Signature(type = Executor.class, method = "query", args = {
//		MappedStatement.class, Object.class, RowBounds.class,
//		ResultHandler.class }) })
//public class PagingInterceptor implements Interceptor {
//	@Override
//	public Object intercept(Invocation invocation) throws Throwable {
//		MappedStatement mappedStatement = (MappedStatement) invocation.getArgs()[0];//获取方法名
//		Object parameter = invocation.getArgs()[1];//获取请求的参数{limit=10,offset=0,...}
//		int[] limitOffset = getLimitOffset(parameter);//获取分页数据[offset,limit]
//		if (limitOffset.length == 2) {//是否获取到分页数据
//			BoundSql boundSql = mappedStatement.getBoundSql(parameter);
//			String originalSql = boundSql.getSql().trim();//得到原始SQL语句
//
//			String countSql = getCountSql(originalSql);//计算总数的SQL语句
//
//			Connection connection = mappedStatement.getConfiguration().getEnvironment().getDataSource().getConnection();
//			PreparedStatement countStmt = connection.prepareStatement(countSql);
//			BoundSql countBS = copyFromBoundSql(mappedStatement, boundSql,countSql);
//			DefaultParameterHandler parameterHandler = new DefaultParameterHandler(mappedStatement, boundSql.getParameterObject(), countBS);
//			parameterHandler.setParameters(countStmt);
//			ResultSet rs = countStmt.executeQuery();//执行获取总数的SQL
//			int totpage = 0;
//			if (rs.next()) {
//				totpage = rs.getInt(1);//5
//			}
//			rs.close();
//			countStmt.close();
//			connection.close();
//			int start = limitOffset[0];
//			int len = limitOffset[1];
//			final BoundSql newBoundSql = copyFromBoundSql(mappedStatement, boundSql, getLimitSql(originalSql,start,len)); 
//			 MappedStatement newMs = copyFromMappedStatement(mappedStatement,new SqlSource() {
//				BoundSql boundSql=newBoundSql;
//				@Override
//				public BoundSql getBoundSql(Object paramObject) {
//					return boundSql;
//				}
//			});
//			 Map<String, String> map = (Map<String, String>)parameter;
//			 map.put("total", totpage+"");
//			 invocation.getArgs()[0]= newMs;
//		}
//		return invocation.proceed();
//	}
//
//	/**
//	 * 获取分页数据
//	 * 
//	 * @param o
//	 * 
//	 * @return offset,limit
//	 */
//	private int[] getLimitOffset(Object o) {
//		if (o == null) {
//			return new int[] {};
//		}
//		try {
//			if (o instanceof Map) {
//				Map map = (Map)o;
//				if (map.containsKey("offset")&&map.containsKey("limit")) {//
//					Object offset = map.get("offset");
//					Object limit = map.get("limit");
//					if((offset != null&& limit != null&&!"".equals(limit) )){
//						return new int[] { Integer.parseInt(offset+""),
//								Integer.parseInt(limit+"") };
//					}
//				}
//			}
//		} catch (ClassCastException e) {
//			e.printStackTrace();
//		}
//		return new int[] {};
//	}
//
//	/**
//	 * 根据原Sql语句获取对应的查询总记录数的Sql语句
//	 */
//	private String getCountSql(String sql) {
//		return "select count(1) from (" + sql + ") sumsel";
//	}
//
//	/**
//	 * 获取分页Sql
//	 * 
//	 * @param sql
//	 * @param start 开始位置
//	 * @param len	获取长度
//	 * @return
//	 */
//	private String getLimitSql(String sql, int start, int len) {
//		StringBuilder sb = new StringBuilder();
//		sb.append(sql);
//		sb.append(" limit "+start+","+len);
//		return sb.toString();
//	}
//
//	/**
//	 * 复制BoundSql对象
//	 */
//	private BoundSql copyFromBoundSql(MappedStatement ms, BoundSql boundSql,
//			String sql) {
//		BoundSql newBoundSql = new BoundSql(ms.getConfiguration(), sql,
//				boundSql.getParameterMappings(), boundSql.getParameterObject());
//		for (ParameterMapping mapping : boundSql.getParameterMappings()) {
//			String prop = mapping.getProperty();
//			if (boundSql.hasAdditionalParameter(prop)) {
//				newBoundSql.setAdditionalParameter(prop,
//						boundSql.getAdditionalParameter(prop));
//			}
//		}
//		return newBoundSql;
//	}
//	  /** 
//	   * 复制MappedStatement对象 
//	   */  
//	  private MappedStatement copyFromMappedStatement(MappedStatement ms,SqlSource newSqlSource) {  
//	    Builder builder = new Builder(ms.getConfiguration(),ms.getId(),newSqlSource,ms.getSqlCommandType());  
//	      
//	    builder.resource(ms.getResource());  
//	    builder.fetchSize(ms.getFetchSize());  
//	    builder.statementType(ms.getStatementType());  
//	    builder.keyGenerator(ms.getKeyGenerator());  
//	    builder.timeout(ms.getTimeout());  
//	    builder.parameterMap(ms.getParameterMap());  
//	    builder.resultMaps(ms.getResultMaps());  
//	    builder.resultSetType(ms.getResultSetType());  
//	    builder.cache(ms.getCache());  
//	    builder.flushCacheRequired(ms.isFlushCacheRequired());  
//	    builder.useCache(ms.isUseCache());  
//	      
//	    return builder.build();  
//	  }  
//	@Override
//	public Object plugin(Object target) {
//
//		return Plugin.wrap(target, this);
//	}
//
//	@Override
//	public void setProperties(Properties arg0) {
//
//	}
//}
