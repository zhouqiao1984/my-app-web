//初始化表

initCardList();
function initCardList(){
	var $page = getCurrentPageObj();//当前页
	var cardTable = $page.find("[tb='cardTable']");
	var cardCall = getMillisecond();
	initCardTable();//初始化列表
	
	//查询按钮
	 $page.find("[name='queryC']").click(function(){
		 refreshTable();
	 });
	 
	//新建账户
	 $page.find("button[name='addCard']").click(function(){
		 closeAndOpenInnerPageTab("addCard","创建账户","pages/am/card_funds/card_add.html", function(){
			 editCard(null);
			});
	 });
	 
	//修改账户
	 $page.find("[name='editCard']").click(function(){
			var seles = cardTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一个账户进行修改!");
					return;
			}
		 closeAndOpenInnerPageTab("editCard","修改账户","pages/am/card_funds/card_add.html", function(){
			 editCard(seles[0]);
			});
	 });
	 
	//账户明细管理
	 $page.find("[name='cardManage']").click(function(){
			var seles = cardTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一个账户!");
					return;
			}
		 closeAndOpenInnerPageTab("cardManage","账户明细管理","pages/am/card_funds/detail_List.html", function(){
			 cardManage(seles[0]);
			});
	 });
	 
	//账户启用
	 $page.find("[name='openCard']").click(function(){
			var seles = cardTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一个账户!");
					return;
			}
			if(seles[0].CARD_STATE == '00'){
				alert("账户已在启用中!");
				return;
			}
			var card_name = seles[0].CARD_NAME;
			nconfirm("确定启用账户:"+card_name+"?",function(){
				var opCall1 = getMillisecond();
				var params = {};
				params.CARD_ID = seles[0].CARD_ID;
				params.TYPE = 'opt';
				params.CARD_STATE = '00';
				baseAjaxJsonp('cardfunds/editCard.asp?call=' + opCall1, params, function(data) {
					if(data && data.result=="true"){
						alert(data.msg);
						refreshTable();
					}else{
						alert(data.msg);
					}
				},opCall1,false);
			});
		
	 });
	 
	//账户停用
	 $page.find("[name='closeCard']").click(function(){
			var seles = cardTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一个账户!");
					return;
			}
			if(seles[0].CARD_STATE == '01'){
				alert("账户已在停用中!");
				return;
			}
			var card_name = seles[0].CARD_NAME;
			nconfirm("确定停用账户:"+card_name+"?",function(){
				var opCall2 = getMillisecond();
				var params = {};
				params.CARD_ID = seles[0].CARD_ID;
				params.TYPE = 'opt';
				params.CARD_STATE = '01';
				baseAjaxJsonp('cardfunds/editCard.asp?call=' + opCall2, params, function(data) {
					if(data && data.result=="true"){
						alert(data.msg);
						refreshTable();
					}else{
						alert(data.msg);
					}
				},opCall2,false);
			});
		
	 });
	 
	 function refreshTable(){
		 var card_state = $page.find("[name='CARD_STATE']").val();
		 cardTable.bootstrapTable('refresh',{
				url:"cardfunds/queryCard.asp?call="+cardCall+"&CARD_STATE="+card_state});
		 
	 }
	//初始化账户表	
	 function initCardTable() {

		 cardTable.bootstrapTable({
						url : 'cardfunds/queryCard.asp?call='+ cardCall,
						method : 'get', // 请求方式（*）
						striped : false, // 是否显示行间隔色
						cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
						sortable : true, // 是否启用排序
						sortOrder : "asc", // 排序方式
						//queryParams : queryParams,// 传递参数（*）
						sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
						pagination : false, // 是否显示分页（*）
						pageList : [ 5, 10, 15 ], // 可供选择的每页的行数（*）
						pageNumber : 1, // 初始化加载第一页，默认第一页
						pageSize : 5, // 每页的记录行数（*）
						clickToSelect : true, // 是否启用点击选中行
						// height: 460, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
						uniqueId : "", // 每一行的唯一标识，一般为主键列
						cardView : false, // 是否显示详细视图
						detailView : false, // 是否显示父子表
						singleSelect : true,// 复选框单选
						jsonpCallback: cardCall,
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
							field : "CARD_NAME",
							title : "账户名称",
							width : "20%",
							align : "center"
						}, {
							field : "BALANCE",
							title : "余额",
							width : "16%",
							align : "center"
						}, {
							field : "CARD_NUM",
							title : "卡号",
							width : "20%",
							align : "center"
						}, {
							field : "REMARK",
							title : "备注",
							width : "28%",
							align : "center"
						}, {
							field : "CARD_STATE",
							title : "状态",
							width : "10%",
							align : "center",
							formatter:function(value,row,index){
								var state = '';
								if(value == '00'){state = '启用'}
								if(value == '01'){state = '停用'}
								return state;
							}
						}
						]
					});
		}
}











