
//初始化
function initStatistic(card_id,card_name){
	var $page = getCurrentPageObj();//当前页
	var sTable = $page.find("[tb='statisticTable']");
	var stCall = getMillisecond();
	$page.find("#CARDNAME").text(card_name);
	initSTable();
	
	//查询按钮
	 $page.find("[name='queryS']").click(function(){
		 var start_time = $page.find("[name='START_TIME']").val();
		 var end_time = $page.find("[name='END_TIME']").val();
		 if('点击选择' == start_time){
			 start_time = '';
		 }
		 if('点击选择' == end_time){
			 end_time = '';
		 }
		 sTable.bootstrapTable('refresh',{
				url:'cardfunds/queryStatistic.asp?call='+ stCall + '&CARD_ID=' + card_id
				+"&START_TIME="+start_time+"&END_TIME="+end_time});
	 });
	 
	 
	//重置按钮
	$page.find("[name='resetS']").click(function(){
		$page.find("table input").not("table input[type='button']").val("");
		$page.find("select").val(" ").select2();
	});
	
	
	
	//初始化账户表	
	 function initSTable() {
		
			sTable.bootstrapTable({
						url : 'cardfunds/queryStatistic.asp?call='+ stCall + '&CARD_ID=' + card_id,
						method : 'get', // 请求方式（*）
						striped : false, // 是否显示行间隔色
						cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
						sortable : true, // 是否启用排序
						sortOrder : "asc", // 排序方式
						//queryParams : queryParams,// 传递参数（*）
						sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
						pagination : false, // 是否显示分页（*）
						pageList : [ 10, 20], // 可供选择的每页的行数（*）
						pageNumber : 1, // 初始化加载第一页，默认第一页
						pageSize : 10, // 每页的记录行数（*）
						clickToSelect : true, // 是否启用点击选中行
						// height: 460, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
						uniqueId : "", // 每一行的唯一标识，一般为主键列
						cardView : false, // 是否显示详细视图
						detailView : false, // 是否显示父子表
						singleSelect : true,// 复选框单选
						jsonpCallback: stCall,
						onLoadSuccess : function(data){
							gaveInfo();
						},onLoadError:function () {
		                    alert("数据加载失败！");
		                },
						columns : [ {
							field : 'ORDER_ID',
							title : '序号',
							align : "center",
							width : "6%",
							formatter:function(value,row,index){
								return index + 1;
							}
						}, {
							field : "NAME",
							title : "类别",
							width : "10%",
							align : "center"
						}, {
							field : "INCOME",
							title : "收入",
							width : "20%",
							align : "center"
						}, {
							field : "EXPEND",
							title : "支出",
							width : "20%",
							align : "center"
						}, {
							field : "BALANCE",
							title : "余额",
							width : "20%",
							align : "center"
						}
						]
					});
		}



}





