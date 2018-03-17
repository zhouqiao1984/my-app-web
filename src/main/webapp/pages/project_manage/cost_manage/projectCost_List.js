//初始化表

initCost();
function initCost(){
	var $page = getCurrentPageObj();//当前页
	var costTable = $page.find("[tb='costTable']");
	var formObj = $page.find("#costForm");//表单对象
	var cCall = getMillisecond() + '0';
	initCostTable();//初始化列表
	
	//重置按钮
	$page.find("[name='resetC']").click(function(){
		$page.find("table input").val("");
		$page.find("select").val(" ").select2();
	
	});
	
	//查询按钮
	 $page.find("[name='queryC']").click(function(){
		 var param = formObj.serialize();
		 costTable.bootstrapTable('refresh',{
				url:"project/queryCost.asp?call="+cCall+"&"+param});
	 });
	 

	 
	//成本管理
	 $page.find("[name='costManage']").click(function(){
			var seles = costTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一个项目!");
					return;
			}
			
//			if(seles[0].Cost_STATE == "01"){
//				alert("已关闭项目不能操作");
//				return;
//			}
		 closeAndOpenInnerPageTab("costManage","成本详情管理","pages/project_manage/cost_manage/cost_List.html", function(){
			 	costManage(seles[0]);
			});
	 });
	 
	//成本备忘录
	 $page.find("[name='costRecord']").click(function(){
			var seles = costTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一个项目!");
					return;
			}
			
		 closeAndOpenInnerPageTab("commonRecord","备忘录","pages/project_manage/common_recordList.html", function(){
			 initCRecord(seles[0].PROJECT_ID,'02');//成本02
			});
	 });
	 
	 
	//关闭成本管理
	 $page.find("[name='costClose']").click(function(){
			var seles = costTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一个项目!");
					return;
			}
			if(seles[0].COST_STATE != '00'){
				alert("操作无效，项目成本管理已在完成状态!");
				return;
			}
			var project_name = seles[0].PROJECT_NAME;
			nconfirm("确定关闭项目:"+project_name+"的成本管理吗?",function(){
				var dcCall = getMillisecond();
				var params = {};
				params.PROJECT_ID = seles[0].PROJECT_ID;
				params.TYPE = 'closecost';
				baseAjaxJsonp('project/closeProject.asp?call=' + dcCall, params, function(data) {
					if(data && data.result=="true"){
						alert(data.msg);
						refreshCostTable();
					}else{
						alert(data.msg);
					}
				},dcCall,false);
			});
		
	 });
	 
		//打开成本管理
	 $page.find("[name='costOpen']").click(function(){
			var seles = costTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一个项目!");
					return;
			}
			if(seles[0].COST_STATE != '01'){
				alert("操作无效，项目成本管理尚未完成!");
				return;
			}
			var project_name = seles[0].PROJECT_NAME;
			nconfirm("确定打开项目:"+project_name+"的成本管理吗?",function(){
				var ocCall = getMillisecond();
				var params = {};
				params.PROJECT_ID = seles[0].PROJECT_ID;
				params.TYPE = 'opencost';
				baseAjaxJsonp('project/closeProject.asp?call=' + ocCall, params, function(data) {
					if(data && data.result=="true"){
						alert(data.msg);
						refreshCostTable();
					}else{
						alert(data.msg);
					}
				},ocCall,false);
			});
		
	 });
	 
	
	 
	//刷新项目列表
		function refreshCostTable(){
			costTable.bootstrapTable('refresh',{
				url:'project/queryCost.asp?call='+cCall});
			
		}
	//初始化项目表	
	 function initCostTable() {
			var queryParams = function(params) {
				var temp = {
					limit : params.limit, // 页面大小
					offset : params.offset
				// 页码
				};
				return temp;
			};
			costTable.bootstrapTable({
				url : 'project/queryCost.asp?call='+ cCall,
				method : 'get', // 请求方式（*）
				striped : false, // 是否显示行间隔色
				cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
				sortable : true, // 是否启用排序
				sortOrder : "asc", // 排序方式
				queryParams : queryParams,// 传递参数（*）
				sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
				pagination : true, // 是否显示分页（*）
				pageList : [ 5, 10, 15 ], // 可供选择的每页的行数（*）
				pageNumber : 1, // 初始化加载第一页，默认第一页
				pageSize : 10, // 每页的记录行数（*）
				clickToSelect : true, // 是否启用点击选中行
				// height: 460, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
				uniqueId : "", // 每一行的唯一标识，一般为主键列
				cardView : false, // 是否显示详细视图
				detailView : false, // 是否显示父子表
				singleSelect : true,// 复选框单选
				jsonpCallback: cCall,
						onLoadSuccess : function(data){
							gaveInfo();
						},onLoadError:function () {
		                    alert("数据加载失败！");
		                },
						columns : [ {
							checkbox : true,
							rowspan : 2,
							align : 'center',
							valign : 'middle'
						},{
							field : 'ORDER_ID',
							title : '序号',
							align : "center",
							width : "7%",
							formatter:function(value,row,index){
								return index + 1;
							}
						}, {
							field : "PROJECT_NAME",
							title : "项目名称",
							width : "35%",
							align : "center"
						}, {
							field : "PROJECT_TYPE",
							title : "项目类型",
							width : "10%",
							align : "center",
							formatter:function(value,row,index){
								var result = '';
								if(value == 00){
									result = '自营';
								}
								if(value == 01){
									result = '挂靠';
								}
								if(value == 02){
									result = '陪标';
								}
								return result;
							}
						}, {
							field : "FINAL_TOTAL",
							title : "决算金额",
							width : "12%",
							align : "center",
							formatter:function(value,row,index){
								if(value == undefined){
									value = 0;
								}
								return value;
							}
						},{
							field : "COST_SUM",
							title : "成本",
							width : "12%",
							align : "center",
							formatter:function(value,row,index){
								var cost_sum = 0;
								var cost_out = 0;
								if(row.COST_SUM){cost_sum = row.COST_SUM;}
								if(row.COST_OUT){cost_out = row.COST_OUT;}
								return Number(cost_out - cost_sum).toFixed(2);
							}
						},{
							field : "PROFIT",
							title : "利润",
							width : "12%",
							align : "center",
							formatter:function(value,row,index){
								var final_total = 0;
								var cost_sum = 0;
								var cost_out = 0;
								if(row.FINAL_TOTAL){final_total = row.FINAL_TOTAL}
								if(row.COST_SUM){cost_sum = row.COST_SUM}
								if(row.COST_OUT){cost_out = row.COST_OUT;}
								return Number(final_total + cost_sum - cost_out).toFixed(2);
							}
						},{
							field : "COST_STATE",
							title : "状态",
							width : "12%",
							align : "center",
							formatter:function(value,row,index){
								var state = '';
								if(value == '00'){state = '未完成'};
								if(value == '01'){state = '已完成'};
								return state;
							}
						}
						]
					});
		}
	 

	 
	 
}











