//初始化表

initUser();
function initUser(){
	var $page = getCurrentPageObj();//当前页
	var userTable = $page.find("[tb='userTable']");
	var formObj = $page.find("#userForm");//表单对象
	var uCall = getMillisecond();
	var pCall = getMillisecond() + '2';
	initUserTable();//初始化列表
	
	//重置按钮
	$page.find("[name='resetU']").click(function(){
		$page.find("table input").val("");
		$page.find("select").val(" ").select2();
	
	});
	
	//查询按钮
	 $page.find("[name='queryU']").click(function(){
		 var param = formObj.serialize();
		 userTable.bootstrapTable('refresh',{
				url:"user/queryAllUser.asp?call="+uCall+"&"+param});
	 });
	 
	//新建用户
	 $page.find("button[name='addUser']").click(function(){
		 closeAndOpenInnerPageTab("addUser","新建用户","pages/system_manage/user_manage/user_edit.html", function(){
			 editUser(null);
			});
	 });
	 

	//修改用户
	 $page.find("[name='editUser']").click(function(){
			var seles = userTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一个用户进行修改!");
					return;
			}
			
		 closeAndOpenInnerPageTab("editUser","用户信息编辑","pages/system_manage/user_manage/user_edit.html", function(){
			 editUser(seles[0]);
			});
	 });
	
	 
	//用户停用
	 $page.find("[name='closeUser']").click(function(){
		 alert("尚未开发");
//			var seles = userTable.bootstrapTable("getSelections");
//			if(seles.length!=1){
//					alert("请选择一个用户!");
//					return;
//			}
//			if(seles[0].User_STATE != '00'){
//				alert("项目不在进行中!");
//				return;
//			}
//			var User_name = seles[0].User_NAME;
//			nconfirm("确定关闭项目:"+User_name+"?",function(){
//				var duCall = getMillisecond();
//				var params = {};
//				params.User_ID = seles[0].User_ID;
//				params.TYPE = 'close';
//				baseAjaxJsonp('User/closeUser.asp?call=' + duCall, params, function(data) {
//					if(data && data.result=="true"){
//						alert(data.msg);
//						refreshUserTable();
//					}else{
//						alert(data.msg);
//					}
//				},duCall,false);
//			});
		
	 });
	 
		//用户启用
	 $page.find("[name='openUser']").click(function(){
		 alert("尚未开发");
//			var seles = userTable.bootstrapTable("getSelections");
//			if(seles.length!=1){
//					alert("请选择一个项目!");
//					return;
//			}
//			if(seles[0].User_STATE != '01'){
//				alert("项目不在关闭状态!");
//				return;
//			}
//			var User_name = seles[0].User_NAME;
//			nconfirm("确定重新打开项目:"+User_name+"?",function(){
//				var ouCall = getMillisecond();
//				var params = {};
//				params.User_ID = seles[0].User_ID;
//				params.TYPE = 'open';
//				baseAjaxJsonp('User/closeUser.asp?call=' + ouCall, params, function(data) {
//					if(data && data.result=="true"){
//						alert(data.msg);
//						refreshUserTable();
//					}else{
//						alert(data.msg);
//					}
//				},ouCall,false);
//			});
//		
	 });
	 

	//刷新用户列表
		function refreshUserTable(){
			userTable.bootstrapTable('refresh',{
				url:'user/queryAllUser.asp?call='+uCall});
			
		}
		
	//初始化用户表	
	 function initUserTable() {
		 var queryParams = function(params) {
				var temp = {
					limit : params.limit, // 页面大小
					offset : params.offset
				// 页码
				};
				return temp;
			};
			userTable.bootstrapTable({
						url : 'user/queryAllUser.asp?call='+ uCall,
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
						jsonpCallback: uCall,
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
							field : "USERID",
							title : "用户编号",
							width : "14%",
							align : "center"
						}, {
							field : "LOGINNAME",
							title : "系统账号",
							width : "30%",
							align : "center"
						}, {
							field : "USERNAME",
							title : "姓名",
							width : "30%",
							align : "center"
						},{
							field : "ROLE",
							title : "权限",
							width : "10%",
							align : "center"
						}, {
							field : "USERSTATE",
							title : "状态",
							align : "center",
							width : "10%",
							formatter:function(value,row,index){
								var state = '';
								if(value == '00'){state = '启用';}
								if(value == '01'){state = '停用';}
								return state;
							}
						}
						]
					});

		}
	 
	 
	 
}











