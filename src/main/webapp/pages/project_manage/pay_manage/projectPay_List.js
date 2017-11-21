//初始化表

initpay();
function initpay(){
	var $page = getCurrentPageObj();//当前页
	var payTable = $page.find("[tb='payTable']");
	var formObj = $page.find("#payForm");//表单对象
	var payCall = getMillisecond() + '1';
	initpayTable();//初始化列表
	
	//重置按钮
	$page.find("[name='resetP']").click(function(){
		$page.find("table input").val("");
		$page.find("select").val(" ").select2();
	
	});
	
	//查询按钮
	 $page.find("[name='queryP']").click(function(){
		 var param = formObj.serialize();
		 payTable.bootstrapTable('refresh',{
				url:"project/queryPay.asp?call="+payCall+"&"+param});
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
	 
	//关闭成本管理
	 $page.find("[name='payClose']").click(function(){
			var seles = payTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一个项目!");
					return;
			}
			if(seles[0].PAY_STATE != '00'){
				alert("操作无效，该项目付款管理已在完成状态!");
				return;
			}
			var project_name = seles[0].PROJECT_NAME;
			nconfirm("确定关闭项目:"+project_name+"的付款管理吗?",function(){
				var dpCall = getMillisecond();
				var params = {};
				params.PROJECT_ID = seles[0].PROJECT_ID;
				params.TYPE = 'closepay';
				baseAjaxJsonp('project/closeProject.asp?call=' + dpCall, params, function(data) {
					if(data && data.result=="true"){
						alert(data.msg);
						refreshPayTable();
					}else{
						alert(data.msg);
					}
				},dpCall,false);
			});
		
	 });
	 
		//打开成本管理
	 $page.find("[name='payOpen']").click(function(){
			var seles = payTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一个项目!");
					return;
			}
			if(seles[0].PAY_STATE != '01'){
				alert("操作无效，项目付款管理尚未完成!");
				return;
			}
			var project_name = seles[0].PROJECT_NAME;
			nconfirm("确定打开项目:"+project_name+"的付款管理吗?",function(){
				var opCall = getMillisecond();
				var params = {};
				params.PROJECT_ID = seles[0].PROJECT_ID;
				params.TYPE = 'openpay';
				baseAjaxJsonp('project/closeProject.asp?call=' + opCall, params, function(data) {
					if(data && data.result=="true"){
						alert(data.msg);
						refreshPayTable();
					}else{
						alert(data.msg);
					}
				},opCall,false);
			});
		
	 });
	 
	
	 
	//刷新项目列表
		function refreshPayTable(){
			payTable.bootstrapTable('refresh',{
				url:'project/queryPay.asp?call='+payCall});
			
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
				url : 'project/queryPay.asp?call='+ payCall,
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
				jsonpCallback: payCall,
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
							field : "PROJECT_NUM",
							title : "项目编号",
							width : "18%",
							align : "center"
						}, {
							field : "PROJECT_NAME",
							title : "项目名称",
							width : "27%",
							align : "center"
						}, {
							field : "FINAL_TOTAL",
							title : "决算金额",
							width : "12%",
							align : "center"
						},{
							field : "PAY_SUM",
							title : "已付款金额",
							width : "12%",
							align : "center"
						},{
							field : "PAY_NOT",
							title : "未付款金额",
							width : "12%",
							align : "center",
							formatter:function(value,row,index){
								return row.FINAL_TOTAL - row.PAY_SUM;
							}
						},{
							field : "PAY_STATE",
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











