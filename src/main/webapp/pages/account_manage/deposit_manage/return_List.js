

function initReturnList(item){
	var $page = getCurrentPageObj();//当前页
	var returnTable = $page.find("[tb='returnTable']");
	var formObj = $page.find("#returnForm");//表单对象
	var detail_id = item.DETAIL_ID;
	initReturnTable();//初始化列表
	
	//查询按钮
	 $page.find("[name='queryReturn']").click(function(){
		 var param = formObj.serialize();
		 if('点击选择' == param.RETURN_START_TIME){
			 param.RETURN_START_TIME = '';
		 }
		 if('点击选择' == param.RETURN_END_TIME){
			 param.RETURN_END_TIME = '';
		 }
		 returnTable.bootstrapTable('refresh',{
				url:'deposit/queryReturnList.asp?DETAIL_ID=' + detail_id +'&'+param});
	 });
	 
	 
	//重置按钮
	$page.find("[name='resetReturn']").click(function(){
		$page.find("table input").not("table input[type='button']").val("");
		$page.find("select").val(" ").select2();
	});
		
	//新增
	 $page.find("button[name='addReturn']").click(function(){
		 closeAndOpenInnerPageTab("addReturn","新增回款","pages/account_manage/deposit_manage/return_edit.html", function(){
			 editReturn(null,detail_id);
			});
	 });
	 
	//修改
	 $page.find("[name='editReturn']").click(function(){
			var seles = returnTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一条数据进行修改!");
					return;
			}
			if(seles[0].RETURN_ID == '00'){
				alert("不许你修改合计！");
				return;
			}
		 closeAndOpenInnerPageTab("editReturn","修改回款信息","pages/account_manage/deposit_manage/return_edit.html", function(){
			 editReturn(seles[0],detail_id);
			});
	 });
 
	//删除
	 $page.find("[name='delReturn']").click(function(){
			var seles = returnTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一条数据进行删除!");
					return;
			}
			if(seles[0].RETURN_ID == '00'){
				alert("别闹！");
				return;
			}
			nconfirm("确定删除记录?",function(){
				var params = {};
				params.RETURN_ID = seles[0].RETURN_ID;
				params.TYPE = 'del';
				baseAjax('deposit/editReturn.asp', params, function(data) {
					if(data && data.result=="true"){
						alert(data.msg);
						refreshReturnTable();
					}else{
						alert(data.msg);
					}
				});
			});
		
	 });
	 
	 function refreshReturnTable(){
		 returnTable.bootstrapTable('refresh',{
				url:'deposit/queryReturnList.asp'});
		 
	 }
	//初始化款项明细表	
	 function initReturnTable() {
			var queryParams = function(params) {
				var temp = {
					limit : params.limit, // 页面大小
					offset : params.offset,// 页码
					DETAIL_ID : detail_id
				};
				return temp;
			};
		 returnTable.bootstrapTable({
						url : 'deposit/queryReturnList.asp',
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
						//jsonpCallback: pmCall,
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
							field : "RETURN_DATE",
							title : "日期",
							width : "20%",
							align : "center"
						}, {
							field : "RETURN_AMOUNT",
							title : "回款金额",
							width : "20%",
							align : "center"
						}, {
							field : "RETURN_REMARK",
							title : "备注",
							width : "50%",
							align : "center"
						}
						]
					});
		}
}











