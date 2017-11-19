//初始化表

initRecord();
function initRecord(){
	var $page = getCurrentPageObj();//当前页
	var recordTable = $page.find("[tb='recordTable']");
	var formObj = $page.find("#recordForm");//表单对象
	var rCall = getMillisecond();
	initRecordTable();//初始化列表
	
	//重置按钮
	$page.find("[name='resetR']").click(function(){
		$page.find("table input").not("[type='button']").val("");
		$page.find("select").val(" ").select2();
	
	});
	
	//查询按钮
	 $page.find("[name='queryR']").click(function(){
		 var param = formObj.serialize();
		 recordTable.bootstrapTable('refresh',{
				url:"record/queryRecord.asp?call="+rCall+"&"+param});
	 });
	 
	//新建事件
	 $page.find("button[name='addRecord']").click(function(){
		 closeAndOpenInnerPageTab("addRecord","新增时间","pages/company_record/record_edit.html", function(){
			 editRecord(null);
			});
	 });
	 

	//修改事件
	 $page.find("[name='editRecord']").click(function(){
			var seles = recordTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一个事件进行修改!");
					return;
			}
			
		 closeAndOpenInnerPageTab("editRecord","事件信息编辑","pages/company_record/record_edit.html", function(){
			 editRecord(seles[0]);
			});
	 });
	
	//查看事件
	 $page.find("[name='viewRecord']").click(function(){
			var seles = recordTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一个事件进行查看!");
					return;
			}
			
		 closeAndOpenInnerPageTab("viewRecord","事件信息编辑","pages/company_record/record_view.html", function(){
			 viewRecord(seles[0]);
			});
	 });


	//刷新用事件列表
//		function refreshRecordTable(){
//			recordTable.bootstrapTable('refresh',{
//				url:'record/queryRecord.asp?call='+rCall});
//			
//		}
		
	//初始化用户表	
	 function initRecordTable() {
		 var queryParams = function(params) {
				var temp = {
					limit : params.limit, // 页面大小
					offset : params.offset
				// 页码
				};
				return temp;
			};
			recordTable.bootstrapTable({
						url : 'record/queryRecord.asp?call='+ rCall,
						method : 'get', // 请求方式（*）
						striped : false, // 是否显示行间隔色
						cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
						sortable : true, // 是否启用排序
						sortOrder : "asc", // 排序方式
						queryParams : queryParams,// 传递参数（*）
						sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
						pagination : true, // 是否显示分页（*）
						pageList : [10, 20 ], // 可供选择的每页的行数（*）
						pageNumber : 1, // 初始化加载第一页，默认第一页
						pageSize : 10, // 每页的记录行数（*）
						clickToSelect : true, // 是否启用点击选中行
						// height: 460, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
						uniqueId : "", // 每一行的唯一标识，一般为主键列
						cardView : false, // 是否显示详细视图
						detailView : false, // 是否显示父子表
						singleSelect : true,// 复选框单选
						jsonpCallback: rCall,
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
							field : "RECORD_NUM",
							title : "事件编号",
							width : "14%",
							align : "center"
						}, {
							field : "RECORD_NAME",
							title : "事件摘要",
							width : "30%",
							align : "center"
						}, {
							field : "RECORD_DATE",
							title : "日期",
							width : "30%",
							align : "center"
						}, {
							field : "RECORD_STATE",
							title : "状态",
							align : "center",
							width : "10%",
							formatter:function(value,row,index){
								var state = '';
								if(value == '00'){state = '进行中';}
								if(value == '01'){state = '已完成';}
								return state;
							}
						}
						]
					});

		}
	 
	 
	 
}











