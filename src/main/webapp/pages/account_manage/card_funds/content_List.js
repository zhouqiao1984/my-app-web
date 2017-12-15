

function goContent(item){
	var $page = getCurrentPageObj();//当前页
	var contentTable = $page.find("[tb='contentTable']");
	var detail_id = item.DETAIL_ID;
	initContentTable();//初始化列表
	

	
	//新增
	 $page.find("button[name='addContent']").click(function(){
		 closeAndOpenInnerPageTab("addContent","新增","pages/account_manage/card_funds/content_edit.html", function(){
			 editContent(null,detail_id);
			});
	 });
	 
	//修改
	 $page.find("[name='editContent']").click(function(){
			var seles = contentTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一条数据进行修改!");
					return;
			}
		 closeAndOpenInnerPageTab("editContent","修改","pages/account_manage/card_funds/content_edit.html", function(){
			 editContent(seles[0],detail_id);
			});
	 });
 
	//删除
	 $page.find("[name='delContent']").click(function(){
			var seles = contentTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一条数据进行删除!");
					return;
			}
			nconfirm("确定删除该数据?",function(){
				var params = {};
				params.CONTENT_ID = seles[0].CONTENT_ID;
				params.TYPE = 'del';
				baseAjax('cardfunds/editContent.asp', params, function(data) {
					if(data && data.result=="true"){
						alert(data.msg);
						refreshTable();
					}else{
						alert(data.msg);
					}
				});
			});
		
	 });
	 
	 function refreshTable(){
		 contentTable.bootstrapTable('refresh',{
				url:'cardfunds/queryContent.asp?DETAIL_ID=' + detail_id});
		 
	 }
	//初始化账户表	
	 function initContentTable() {
			var queryParams = function(params) {
				var temp = {
					limit : params.limit, // 页面大小
					offset : params.offset// 页码
				};
				return temp;
			};
		 contentTable.bootstrapTable({
						url : 'cardfunds/queryContent.asp?DETAIL_ID=' + detail_id,
						method : 'get', // 请求方式（*）
						striped : false, // 是否显示行间隔色
						cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
						sortable : true, // 是否启用排序
						sortOrder : "asc", // 排序方式
						queryParams : queryParams,// 传递参数（*）
						sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
						pagination : true, // 是否显示分页（*）
						pageList : [ 10, 20], // 可供选择的每页的行数（*）
						pageNumber : 1, // 初始化加载第一页，默认第一页
						pageSize : 10, // 每页的记录行数（*）
						clickToSelect : true, // 是否启用点击选中行
						// height: 460, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
						uniqueId : "", // 每一行的唯一标识，一般为主键列
						cardView : false, // 是否显示详细视图
						detailView : false, // 是否显示父子表
						singleSelect : true,// 复选框单选
						//jsonpCallback: detailCall,
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
							field : "CONTENT_DATE",
							title : "日期",
							width : "9%",
							align : "center"
						}, {
							field : "CONTENT_NAME",
							title : "具体款项",
							width : "24%",
							align : "center"
						}, {
							field : "CONTENT_TYPE",
							title : "收入/支出",
							width : "10%",
							align : "center",
							formatter:function(value,row,index){
								var state = '';
								if(value == '00'){state = '收入'}
								if(value == '01'){state = '支出'}
								return state;
							}
						}, {
							field : "AMOUNT",
							title : "金额",
							width : "9%",
							align : "center"
						}, {
							field : "REMARK",
							title : "备注",
							width : "14%",
							align : "center"
						}
						]
					});
		}
}











