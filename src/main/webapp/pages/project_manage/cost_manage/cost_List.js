

function costManage(item){
	var $page = getCurrentPageObj();//当前页
	var cmTable = $page.find("[tb='costManageTable']");
	var formObj = $page.find("#costManageForm");//表单对象
	var cmCall = getMillisecond();
	var project_id = item.PROJECT_ID;
	initcmTable();//初始化列表
	
	//查询按钮
	 $page.find("[name='queryCost']").click(function(){
		 var param = formObj.serialize();
		 if('点击选择' == param.COST_START_TIME){
			 param.COST_START_TIME = '';
		 }
		 if('点击选择' == param.COST_END_TIME){
			 param.COST_END_TIME = '';
		 }
		 if('选择类型' == param.COST_TYPE){
			 param.COST_TYPE = '';
		 }
		 cmTable.bootstrapTable('refresh',{
				url:'project/queryCostByProid.asp?call='+ cmCall + '&PROJECT_ID=' + project_id +'&'+param});
	 });
	 
	 
	//重置按钮
	$page.find("[name='resetCost']").click(function(){
		$page.find("table input").not("table input[type='button']").val("");
		$page.find("select").val(" ").select2();
	});
		
	//新增
	 $page.find("button[name='addCost']").click(function(){
		 closeAndOpenInnerPageTab("addCost","新增成本","pages/project_manage/cost_manage/cost_edit.html", function(){
			 editCost(null,project_id);
			});
	 });
	 
	//修改
	 $page.find("[name='editCost']").click(function(){
			var seles = cmTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一条数据进行修改!");
					return;
			}
			if(seles[0].COST_ID == '00'){
				alert("修改合计?你真淘气！");
				return;
			}
		 closeAndOpenInnerPageTab("editCost","修改成本信息","pages/project_manage/cost_manage/cost_edit.html", function(){
			 editCost(seles[0],project_id);
			});
	 });
 
	//删除
	 $page.find("[name='delCost']").click(function(){
			var seles = cmTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一条数据进行删除!");
					return;
			}
			if(seles[0].COST_ID == '00'){
				alert("别闹！");
				return;
			}
			nconfirm("确定删除编号为["+seles[0].COST_NUM+"]的记录?",function(){
				var decCall = getMillisecond();
				var params = {};
				params.COST_ID = seles[0].COST_ID;
				params.TYPE = 'del';
				baseAjaxJsonp('project/editProjectCost.asp?call=' + decCall, params, function(data) {
					if(data && data.result=="true"){
						alert(data.msg);
						refreshCostTable();
					}else{
						alert(data.msg);
					}
				},decCall,false);
			});
		
	 });
	 
	 function refreshCostTable(){
		 cmTable.bootstrapTable('refresh',{
				url:'project/queryCostByProid.asp?call='+cmCall+'&PROJECT_ID=' + project_id});
		 
	 }
	//初始化款项明细表	
	 function initcmTable() {
			var queryParams = function(params) {
				var temp = {
					limit : params.limit, // 页面大小
					offset : params.offset// 页码
				};
				return temp;
			};
		 cmTable.bootstrapTable({
						url : 'project/queryCostByProid.asp?call='+ cmCall + '&PROJECT_ID=' + project_id,
						method : 'get', // 请求方式（*）
						striped : false, // 是否显示行间隔色
						cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
						sortable : true, // 是否启用排序
						sortOrder : "asc", // 排序方式
						queryParams : queryParams,// 传递参数（*）
						sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
						pagination : true, // 是否显示分页（*）
						pageList : [10, 20], // 可供选择的每页的行数（*）
						pageNumber : 1, // 初始化加载第一页，默认第一页
						pageSize : 10, // 每页的记录行数（*）
						clickToSelect : true, // 是否启用点击选中行
						// height: 460, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
						uniqueId : "", // 每一行的唯一标识，一般为主键列
						cardView : false, // 是否显示详细视图
						detailView : false, // 是否显示父子表
						singleSelect : true,// 复选框单选
						jsonpCallback: cmCall,
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
							width : "10%",
							formatter:function(value,row,index){
								return index + 1;
							}
						}, {
							field : "COST_DATE",
							title : "日期",
							width : "15%",
							align : "center"
						}, {
							field : "COST_AMOUNT",
							title : "金额",
							width : "15%",
							align : "center"
						}, {
							field : "COST_DETAIL",
							title : "明细",
							width : "25%",
							align : "center"
						},{
							field : "COST_TYPE",
							title : "类别",
							width : "15%",
							align : "center",
							formatter:function(value,row,index){
								var state = '';
								if(value == '00'){state = '材料'}
								else if(value == '01'){state = '工资'}
								else if(value == '02'){state = '买水'}
								else if(value == '03'){state = '吃饭'}
								else if(value == '04'){state = '机械'}
								else if(value == '05'){state = '发票'}
								else if(value == '06'){state = '税费'}
								else if(value == '07'){state = '管理费'}
								else if(value == '08'){state = '分包费'}
								else if(value == '09'){state = '其它'}
								else{state = '-'}
								return state;
							}
						}, {
							field : "COST_NUM",
							title : "流水号",
							width : "20%",
							align : "center"
						}
						]
					});
		}
}











