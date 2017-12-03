//初始化表

initQueryProject();
function initQueryProject(){
	var $page = getCurrentPageObj();//当前页
	var proTable = $page.find("[tb='projectQueryTable']");
	var formObj = $page.find("#projectQueryForm");//表单对象
	initProjectTable();//初始化列表
	
	//重置按钮
	$page.find("[name='resetPQ']").click(function(){
		$page.find("table input").val("");
		$page.find("select").val(" ").select2();
	
	});
	
	//查询按钮
	 $page.find("[name='queryPQ']").click(function(){
		 var param = formObj.serialize();
		 proTable.bootstrapTable('refresh',{
		 		url:"project/queryProject.asp?"+param});
	 });
	 
	 
	//查看项目
	 $page.find("[name='viewQueryProject']").click(function(){
			var seles = proTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一个项目进行查看!");
					return;
			}
			
		 closeAndOpenInnerPageTab("viewProject","项目详情","pages/project_manage/project_view.html", function(){
			 viewProject(seles[0]);
			});
	 });
	 
	

	//初始化项目表	
	 function initProjectTable() {
			var queryParams = function(params) {
				var temp = {
					limit : params.limit, // 页面大小
					offset : params.offset
				// 页码
				};
				return temp;
			};
			proTable.bootstrapTable({
						url : 'project/queryProject.asp',
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
						onLoadSuccess : function(data){
							gaveInfo();
						},onLoadError:function (data) {
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
							width : "8%",
							formatter:function(value,row,index){
								return index + 1;
							}
						}, {
							field : "PROJECT_NUM",
							title : "项目编号",
							width : "16%",
							align : "center"
						}, {
							field : "PROJECT_NAME",
							title : "项目名称",
							width : "24%",
							align : "center"
						}, {
							field : "PROJECT_TYPE",
							title : "项目类型",
							width : "10%",
							align : "center",
							formatter:function(value,row,index){
								var state = '';
								if(value == '00'){state = '自营';}
								if(value == '01'){state = '挂靠';}
								if(value == '02'){state = '陪标';}
								return state;
							}
						}, {
							field : "PROJECT_EMPLOYER",
							title : "发包商",
							width : "22%",
							align : "center"
						},{
							field : "PROJECT_MANAGER",
							title : "项目经理",
							width : "10%",
							align : "center"
						}, {
							field : "PROJECT_STATE",
							title : "项目状态",
							align : "center",
							width : "10%",
							formatter:function(value,row,index){
								var state = '';
								if(value == '00'){state = '进行中';}
								if(value == '01'){state = '已关闭';}
								if(value == '02'){state = '已删除';}
								return state;
							}
						}
						]
					});
		}
}











