

function cardManage(item){
	var $page = getCurrentPageObj();//当前页
	var detailTable = $page.find("[tb='detailTable']");
	var detailCall = getMillisecond();
	var card_id = item.CARD_ID;
	var card_name = item.CARD_NAME;
	initDetailTable();//初始化列表
	
	//查询按钮
	 $page.find("[name='queryD']").click(function(){
		 var pay_class = $page.find("[name='PAY_CLASS']").val();
		 var pay_type = $page.find("[name='PAY_TYPE']").val();
		 var start_time = $page.find("[name='START_TIME']").val();
		 var end_time = $page.find("[name='END_TIME']").val();
		 if('点击选择' == start_time){
			 start_time = '';
		 }
		 if('点击选择' == end_time){
			 end_time = '';
		 }
		 if('选择类别' == pay_class){
			 pay_class = '';
		 }
		 if('选择类型' == pay_type){
			 pay_type = '';
		 }
		 detailTable.bootstrapTable('refresh',{
				url:'cardfunds/queryDetail.asp?call='+ detailCall +"&CARD_ID="+card_id
				+"&START_TIME="+start_time+"&END_TIME="+end_time+"&PAY_CLASS="+pay_class+"&PAY_TYPE="+pay_type});
	 });
	 
	 
	//重置按钮
	$page.find("[name='resetD']").click(function(){
		$page.find("table input").not("table input[type='button']").val("");
		$page.find("select").val(" ").select2();
	}); 
	
	//新增收支明细
	 $page.find("button[name='addDetail']").click(function(){
		 closeAndOpenInnerPageTab("addDetail","新增收支明细","pages/account_manage/card_funds/detail_edit.html", function(){
			 editDetail(null,card_id);
			});
	 });
	 
	//修改
	 $page.find("[name='editDetail']").click(function(){
			var seles = detailTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一条数据进行修改!");
					return;
			}
		 closeAndOpenInnerPageTab("editDetail","修改","pages/account_manage/card_funds/detail_edit.html", function(){
			 editDetail(seles[0],card_id);
			});
	 });
 
	//删除
	 $page.find("[name='delDetail']").click(function(){
		
			nconfirm("确定删除最新的一条数据:?",function(){
				var deCall = getMillisecond();
				var params = {};
				params.CARD_ID = card_id;
				baseAjaxJsonp('cardfunds/delDetail.asp?call=' + deCall, params, function(data) {
					if(data && data.result=="true"){
						alert(data.msg);
						refreshTable();
					}else{
						alert(data.msg);
					}
				},deCall,false);
			});
		
	 });
	 
	 
	//具体款项
	 $page.find("[name='goContent']").click(function(){
			var seles = detailTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一条数据!");
					return;
			}
		 closeAndOpenInnerPageTab("goContent","具体款项","pages/account_manage/card_funds/content_List.html", function(){
			 goContent(seles[0]);
			});
	 });
	 
	//查看类别统计表
	 $page.find("button[name='checkDetail']").click(function(){
		 closeAndOpenInnerPageTab("checkDetail","类别统计表","pages/account_manage/card_funds/classType_statistic.html", function(){
			 initStatistic(card_id,card_name);
			});
	 });
	 
	 function refreshTable(){
		 detailTable.bootstrapTable('refresh',{
				url:'cardfunds/queryDetail.asp?call='+detailCall+'&CARD_ID=' + card_id});
		 
	 }
	//初始化账户表	
	 function initDetailTable() {
			var queryParams = function(params) {
				var temp = {
					limit : params.limit, // 页面大小
					offset : params.offset// 页码
				};
				return temp;
			};
		 detailTable.bootstrapTable({
						url : 'cardfunds/queryDetail.asp?call='+ detailCall + '&CARD_ID=' + card_id,
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
						jsonpCallback: detailCall,
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
							field : "DETAIL_DATE",
							title : "日期",
							width : "9%",
							align : "center"
						}, {
							field : "DETAIL_EXPLAIN",
							title : "具体款项",
							width : "24%",
							align : "center"
						}, {
							field : "AMOUNT",
							title : "金额",
							width : "9%",
							align : "center"
						}, {
							field : "PAY_TYPE",
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
							field : "BALANCE",
							title : "余额",
							width : "9%",
							align : "center"
						}, {
							field : "PAY_CLASS",
							title : "类别",
							width : "9%",
							align : "center",
							formatter:function(value,row,index){
								var state = '';
								if(value == '00'){state = '工资'}
								if(value == '01'){state = '往来款'}
								if(value == '02'){state = '保证金'}
								if(value == '03'){state = '工程款'}
								if(value == '04'){state = '餐费'}
								if(value == '05'){state = '日常花销'}
								if(value == '06'){state = '工程花销'}
								if(value == '07'){state = '开标费用'}
								if(value == '08'){state = '货款'}
								if(value == '09'){state = '收入'}
								if(value == '10'){state = '其他'}
								return state;
							}
						}, {
							field : "PAY_EXPLAIN",
							title : "状态说明",
							width : "9%",
							align : "center"
						}, {
							field : "DETAIL_NUM",
							title : "流水号",
							width : "14%",
							align : "center"
						}
						]
					});
		}
}











