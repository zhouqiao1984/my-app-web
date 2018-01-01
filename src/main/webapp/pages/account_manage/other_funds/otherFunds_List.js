//初始化表

initCardFundsList();
function initCardFundsList(){
	var $page = getCurrentPageObj();//当前页
	var otherTable = $page.find("[tb='otherTable']");
	var otherCall = getMillisecond() + '1';
	initOtherTable();//初始化其他款项列表
	//查询其他款项按钮
	 $page.find("[name='queryO']").click(function(){
		 refreshOtherTable();
	 });
	 
	//重置按钮
		$page.find("[name='queryR']").click(function(){
			$page.find("table select").val(" ").select2();
		});
	 
	//新建其他款项
	 $page.find("button[name='addOther']").click(function(){
		 closeAndOpenInnerPageTab("addOther","新建款项","pages/account_manage/other_funds/other_add.html", function(){
			 editOther(null);
			});
	 });
	 
	//修改其他款项
	 $page.find("[name='editOther']").click(function(){
			var seles = otherTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一条款项进行修改!");
					return;
			}
			if(seles[0].OTHER_ID == '00'){
				alert("合计你还想改!");
				return;
			}
		 closeAndOpenInnerPageTab("editOther","修改款项","pages/account_manage/other_funds/other_add.html", function(){
			 editOther(seles[0]);
			});
	 });
	 
	//其他款项明细管理
	 $page.find("[name='otherManage']").click(function(){
			var seles = otherTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一条款项!");
					return;
			}
			if(seles[0].OTHER_ID == '00'){
				alert("这里没有明细管理!");
				return;
			}
		 closeAndOpenInnerPageTab("otherManage","款项明细管理","pages/account_manage/other_funds/otherDetail_List.html", function(){
			 otherManage(seles[0]);
			});
	 });
	 
	//其他款项启用
	 $page.find("[name='openOther']").click(function(){
			var seles = otherTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一条款项!");
					return;
			}
			if(seles[0].OTHER_ID == '00'){
				alert("合计已经启用!");
				return;
			}
			if(seles[0].OTHER_STATE == '00'){
				alert("款项已在启用中!");
				return;
			}
			var other_name = seles[0].OTHER_NAME;
			nconfirm("确定启用账户:"+other_name+"?",function(){
				var opCall3 = getMillisecond() + '3';
				var params = {};
				params.OTHER_ID = seles[0].OTHER_ID;
				params.TYPE = 'opt';
				params.OTHER_STATE = '00';
				baseAjaxJsonp('otherfunds/editOther.asp?call=' + opCall3, params, function(data) {
					if(data && data.result=="true"){
						alert(data.msg);
						refreshOtherTable();
					}else{
						alert(data.msg);
					}
				},opCall3,false);
			});
		
	 });
	 
	//其他款项停用
	 $page.find("[name='closeOther']").click(function(){
			var seles = otherTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一条款项!");
					return;
			}
			if(seles[0].OTHER_ID == '00'){
				alert("合计不是想停就能停!");
				return;
			}
			if(seles[0].OTHER_STATE == '01'){
				alert("款项已在停用中!");
				return;
			}
			var other_name = seles[0].OTHER_NAME;
			nconfirm("确定停用款项:"+other_name+"?",function(){
				var opCall4 = getMillisecond() + '4';
				var params = {};
				params.OTHER_ID = seles[0].OTHER_ID;
				params.TYPE = 'opt';
				params.OTHER_STATE = '01';
				baseAjaxJsonp('otherfunds/editOther.asp?call=' + opCall4, params, function(data) {
					if(data && data.result=="true"){
						alert(data.msg);
						refreshOtherTable();
					}else{
						alert(data.msg);
					}
				},opCall4,false);
			});
		
	 });
	 
	 function refreshOtherTable(){
		 var other_state = $page.find("[name='OTHER_STATE']").val();
		 var other_type = $page.find("[name='OTHER_TYPE']").val();
		 otherTable.bootstrapTable('refresh',{
				url:"otherfunds/queryOther.asp?call="+otherCall+"&OTHER_STATE="+other_state+"&OTHER_TYPE="+other_type});
		 
	 }
	//初始化其他款项表	
	 function initOtherTable() {
		 var queryParams = function(params) {
				var temp = {
					limit : params.limit, // 页面大小
					offset : params.offset
				// 页码
				};
				return temp;
			};
		 otherTable.bootstrapTable({
						url : 'otherfunds/queryOther.asp?call='+ otherCall,
						method : 'get', // 请求方式（*）
						striped : false, // 是否显示行间隔色
						cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
						sortable : true, // 是否启用排序
						sortOrder : "asc", // 排序方式
						//queryParams : queryParams,// 传递参数（*）
						sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
						pagination : true, // 是否显示分页（*）
						pageList : [ 10, 15 ], // 可供选择的每页的行数（*）
						pageNumber : 1, // 初始化加载第一页，默认第一页
						pageSize : 10, // 每页的记录行数（*）
						clickToSelect : true, // 是否启用点击选中行
						// height: 460, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
						uniqueId : "", // 每一行的唯一标识，一般为主键列
						cardView : false, // 是否显示详细视图
						detailView : false, // 是否显示父子表
						singleSelect : true,// 复选框单选
						jsonpCallback: otherCall,
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
							field : "OTHER_NAME",
							title : "款项名称",
							width : "20%",
							align : "center"
						}, {
							field : "BALANCE",
							title : "余额",
							width : "20%",
							align : "center"
						}, {
							field : "REMARK",
							title : "备注",
							width : "20%",
							align : "center"
						}, {
							field : "OTHER_TYPE",
							title : "类型",
							width : "10%",
							align : "center",
							formatter:function(value,row,index){
								var state = '';
								if(value == '00'){state = '应收'}
								else if(value == '01'){state = '应付'}
								else if(value == '02'){state = '流水'}
								else{state = '-'}
								return state;
							}
						}, {
							field : "OTHER_STATE",
							title : "状态",
							width : "10%",
							align : "center",
							formatter:function(value,row,index){
								var state = '';
								if(value == '00'){state = '启用'}
								else if(value == '01'){state = '停用'}
								else{state = '-'}
								return state;
							}
						}
						]
					});
		}
	 
	 
	 
}











