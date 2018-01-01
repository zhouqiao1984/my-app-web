

function payManage(item){
	var $page = getCurrentPageObj();//当前页
	$page.find("#pn3").text(item.PROJECT_NAME);
	var pmTable = $page.find("[tb='payManageTable']");
	var formObj = $page.find("#payManageForm");//表单对象
	var pmCall = getMillisecond();
	var project_id = item.PROJECT_ID;
	initpmTable();//初始化列表
	
	//查询按钮
	 $page.find("[name='queryPay']").click(function(){
		 var param = formObj.serialize();
		 if('点击选择' == param.pay_START_TIME){
			 param.pay_START_TIME = '';
		 }
		 if('点击选择' == param.pay_END_TIME){
			 param.pay_END_TIME = '';
		 }
		 if('选择类型' == param.pay_TYPE){
			 param.pay_TYPE = '';
		 }
		 pmTable.bootstrapTable('refresh',{
				url:'project/queryPayByProid.asp?call='+ pmCall + '&PROJECT_ID=' + project_id +'&'+param});
	 });
	 
	 
	//重置按钮
	$page.find("[name='resetPay']").click(function(){
		$page.find("table input").not("table input[type='button']").val("");
		$page.find("select").val(" ").select2();
	});
		
	//新增
	 $page.find("button[name='addPay']").click(function(){
		 closeAndOpenInnerPageTab("addPay","新增付款","pages/project_manage/pay_manage/pay_edit.html", function(){
			 editPay(null,project_id);
			});
	 });
	 
	//修改
	 $page.find("[name='editPay']").click(function(){
			var seles = pmTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一条数据进行修改!");
					return;
			}
			if(seles[0].PAY_ID == '00'){
				alert("修改合计?你真淘气！");
				return;
			}
		 closeAndOpenInnerPageTab("editPay","修改付款信息","pages/project_manage/pay_manage/pay_edit.html", function(){
			 editPay(seles[0],project_id);
			});
	 });
 
	//删除
	 $page.find("[name='delPay']").click(function(){
			var seles = pmTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一条数据进行删除!");
					return;
			}
			if(seles[0].PAY_ID == '00'){
				alert("别闹！");
				return;
			}
			nconfirm("确定删除编号为["+seles[0].PAY_NUM+"]的记录?",function(){
				var depCall = getMillisecond();
				var params = {};
				params.PAY_ID = seles[0].PAY_ID;
				params.TYPE = 'del';
				baseAjaxJsonp('project/editProjectPay.asp?call=' + depCall, params, function(data) {
					if(data && data.result=="true"){
						alert(data.msg);
						refreshPayTable();
					}else{
						alert(data.msg);
					}
				},depCall,false);
			});
		
	 });
	 
	 function refreshPayTable(){
		 pmTable.bootstrapTable('refresh',{
				url:'project/queryPayByProid.asp?call='+pmCall+'&PROJECT_ID=' + project_id});
		 
	 }
	//初始化款项明细表	
	 function initpmTable() {
			var queryParams = function(params) {
				var temp = {
					limit : params.limit, // 页面大小
					offset : params.offset// 页码
				};
				return temp;
			};
		 pmTable.bootstrapTable({
						url : 'project/queryPayByProid.asp?call='+ pmCall + '&PROJECT_ID=' + project_id,
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
						jsonpCallback: pmCall,
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
							field : "PAY_DATE",
							title : "日期",
							width : "20%",
							align : "center"
						}, {
							field : "PAY_AMOUNT",
							title : "付款金额",
							width : "20%",
							align : "center"
						}, {
							field : "PAY_REMARK",
							title : "备注",
							width : "30%",
							align : "center"
						}, {
							field : "PAY_NUM",
							title : "流水号",
							width : "20%",
							align : "center"
						}
						]
					});
		}
}











