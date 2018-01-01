

function goCost(item){
	var $page = getCurrentPageObj();//当前页
	var currTable = $page.find("[tb='costdetailTable']");
	var cost_id = item.COST_ID;
	initcurrTable();//初始化列表
	

	
	//新增
	 $page.find("button[name='addCD']").click(function(){
		 closeAndOpenInnerPageTab("addCD","新增","pages/project_manage/cost_manage/costdetail_edit.html", function(){
			 editCD(null,cost_id);
			});
	 });
	 
	//修改
	 $page.find("[name='editCD']").click(function(){
			var seles = currTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一条数据进行修改!");
					return;
			}
		 closeAndOpenInnerPageTab("editCD","修改","pages/project_manage/cost_manage/costdetail_edit.html", function(){
			 editCD(seles[0],cost_id);
			});
	 });
 
	//删除
	 $page.find("[name='delCD']").click(function(){
			var seles = currTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一条数据进行删除!");
					return;
			}
			nconfirm("确定删除该数据?",function(){
				var params = {};
				params.CD_ID = seles[0].CD_ID;
				params.TYPE = 'del';
				baseAjax('project/editCd.asp', params, function(data) {
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
		 currTable.bootstrapTable('refresh',{
				url:'project/queryCd.asp'});
		 
	 }
	//初始化具体成本表	
	 function initcurrTable() {
			var queryParams = function(params) {
				var temp = {
					limit : params.limit, // 页面大小
					offset : params.offset,// 页码
					COST_ID : cost_id
				};
				return temp;
			};
		 currTable.bootstrapTable({
						url : 'project/queryCd.asp',
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
							width : "70",
							formatter:function(value,row,index){
								return index + 1;
							}
						}, {
							field : "CD_DATE",
							title : "日期",
							width : "100",
							align : "center"
						}, {
							field : "CD_PROJECT",
							title : "项目",
							width : "120",
							align : "center"
						}, {
							field : "CD_TYPE",
							title : "收入/支出",
							width : "100",
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
							width : "100",
							align : "center"
						}, {
							field : "CD_NAME",
							title : "名称",
							width : "120",
							align : "center"
						}, {
							field : "CD_STANDARD",
							title : "规格",
							width : "100",
							align : "center"
						}, {
							field : "CD_PRICE",
							title : "单价",
							width : "100",
							align : "center"
						}, {
							field : "CD_COUNT",
							title : "数量",
							width : "100",
							align : "center"
						}, {
							field : "",
							title : "总价",
							width : "100",
							align : "center",
							formatter:function(value,row,index){
								var a = row.CD_PRICE;
								var b= row.CD_COUNT;
								if(a == undefined || a == ''){a = 0;}
								if(b == undefined || b == ''){b = 0;}
								var result = Number(a * b).toFixed(2);
								return result;
							}
						}, {
							field : "CD_UNIT",
							title : "单位",
							width : "100",
							align : "center"
						}, {
							field : "REMARK",
							title : "备注",
							width : "160",
							align : "center"
						}
						]
					});
		}
}











