//初始化表

initpay();
function initpay(){
	var $page = getCurrentPageObj();//当前页
	var payTable = $page.find("[tb='payTable']");
	var formObj = $page.find("#payForm");//表单对象
	var cCall = getMillisecond() + '0';
	initpayTable();//初始化列表
	
	//重置按钮
	$page.find("[name='resetP']").click(function(){
		$page.find("table input").val("");
		$page.find("select").val(" ").select2();
	
	});
	
	//查询按钮
	 $page.find("[name='queryP']").click(function(){
		 var param = formObj.serialize();
		 pTable.bootstrapTable('refresh',{
				url:"project/queryPay.asp?call="+cCall+"&"+param});
	 });
	 

	 
	//付款管理
	 $page.find("[name='payManage']").click(function(){
			var seles = payTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一个项目!");
					return;
			}
			
//			if(seles[0].pay_STATE == "01"){
//				alert("已关闭项目不能操作");
//				return;
//			}
		 closeAndOpenInnerPageTab("payManage","成本管理","pages/project_manage/pay_manage/pay_List.html", function(){
			 	payManage(seles[0]);
			});
	 });
	 
	//关闭项目
//	 $page.find("[name='closepay']").click(function(){
//			var seles = payTable.bootstrapTable("getSelections");
//			if(seles.length!=1){
//					alert("请选择一个项目!");
//					return;
//			}
//			if(seles[0].pay_STATE != '00'){
//				alert("项目不在进行中!");
//				return;
//			}
//			var pay_name = seles[0].PAY_NAME;
//			nconfirm("确定关闭项目:"+pay_name+"?",function(){
//				var dcCall = getMillisecond();
//				var params = {};
//				params.pay_ID = seles[0].pay_ID;
//				params.TYPE = 'close';
//				baseAjaxJsonp('pay/closepay.asp?call=' + dcCall, params, function(data) {
//					if(data && data.result=="true"){
//						alert(data.msg);
//						refreshpayTable();
//					}else{
//						alert(data.msg);
//					}
//				},dcCall,false);
//			});
//		
//	 });
	 
		//打开项目
//	 $page.find("[name='openpay']").click(function(){
//			var seles = payTable.bootstrapTable("getSelections");
//			if(seles.length!=1){
//					alert("请选择一个项目!");
//					return;
//			}
//			if(seles[0].pay_STATE != '01'){
//				alert("项目不在关闭状态!");
//				return;
//			}
//			var pay_name = seles[0].pay_NAME;
//			nconfirm("确定重新打开项目:"+pay_name+"?",function(){
//				var ocCall = getMillisecond();
//				var params = {};
//				params.pay_ID = seles[0].pay_ID;
//				params.TYPE = 'open';
//				baseAjaxJsonp('project/closepay.asp?call=' + ocCall, params, function(data) {
//					if(data && data.result=="true"){
//						alert(data.msg);
//						refreshpayTable();
//					}else{
//						alert(data.msg);
//					}
//				},ocCall,false);
//			});
//		
//	 });
	 
	
	 
	//刷新项目列表
		function refreshpayTable(){
			pTable.bootstrapTable('refresh',{
				url:'project/queryPay.asp?call='+cCall});
			
		}
	//初始化项目表	
	 function initpayTable() {
			var queryParams = function(params) {
				var temp = {
					limit : params.limit, // 页面大小
					offset : params.offset
				// 页码
				};
				return temp;
			};
			payTable.bootstrapTable({
				url : 'project/queryProject.asp?call='+ cCall,
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
				pageSize : 5, // 每页的记录行数（*）
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
							width : "6%",
							formatter:function(value,row,index){
								return index + 1;
							}
						}, {
							field : "PROJECT_NUM",
							title : "项目编号",
							width : "14%",
							align : "center"
						}, {
							field : "PROJECT_NAME",
							title : "项目名称",
							width : "30%",
							align : "center"
						}, {
							field : "PROJECT_EMPLOYER",
							title : "发包商",
							width : "30%",
							align : "center"
						},{
							field : "PROJECT_MANAGER",
							title : "项目经理",
							width : "10%",
							align : "center"
						}
						]
					});
		}
	 

	 
	 
}











