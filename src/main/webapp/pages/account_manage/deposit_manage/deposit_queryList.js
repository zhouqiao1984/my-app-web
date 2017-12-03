//初始化表

initDepositList();
function initDepositList(){
	var $page = getCurrentPageObj();//当前页
	var depositTable = $page.find("[tb='depositListTable']");
	var formObj = $page.find("#depositForm");//表单对象
	initDepositTable();//初始化保证金列表

	//重置按钮
	$page.find("[name='resetDQ']").click(function(){
		$page.find("table input").val("");
		$page.find("select").val(" ").select2();
	
	});
	
	//查询按钮
	 $page.find("[name='queryDQ']").click(function(){
		 var param = formObj.serialize();
		 depositTable.bootstrapTable('refresh',{
		 		url:"deposit/queryDepositList.asp?"+param});
	 });
	 
	//保证金信息维护
	 $page.find("[name='editDeposit']").click(function(){
			var seles = depositTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一条数据!");
					return;
			}

		 closeAndOpenInnerPageTab("editDeposit","保证金信息维护","pages/account_manage/deposit_manage/deposit_edit.html", function(){
			 editDeposit(seles[0]);
			});
	 });

	 
		//保证金回款管理
	 $page.find("[name='returnMoney']").click(function(){
			var seles = depositTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一条数据!");
					return;
			}
			
		 closeAndOpenInnerPageTab("returnMoney","回款管理","pages/account_manage/deposit_manage/return_List.html", function(){
			 initReturnList(seles[0]);
			});
	 });
	 
	//初始化账户表	
	 function initDepositTable() {
		 var queryParams = function(params) {
				var temp = {
					limit : params.limit, // 页面大小
					offset : params.offset
				// 页码
				};
				return temp;
			};
		 depositTable.bootstrapTable({
						url : 'deposit/queryDepositList.asp',
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
							width : "80",
							formatter:function(value,row,index){
								return index + 1;
							}
						}, {
							field : "DETAIL_DATE",
							title : "日期",
							width : "100",
							align : "center"
						}, {
							field : "AMOUNT",
							title : "金额",
							width : "100",
							align : "center"
						}, {
							field : "RETURN_AMOUNT_SUM",
							title : "已回款",
							width : "100",
							align : "center",
							formatter:function(value,row,index){
								if(value == undefined){value = 0;}
								return value;
							}
						}, {
							field : " ",
							title : "余额",
							width : "100",
							align : "center",
							formatter:function(value,row,index){
								var a = row.AMOUNT;
								var b = row.RETURN_AMOUNT_SUM;
								if(a == undefined){a = 0;}
								if(b == undefined){b = 0;}
								return a - b;
							}
						}, {
							field : "PROJECT_NAME",
							title : "项目名称",
							width : "140",
							align : "center"
						}, {
							field : "PROJECT_TYPE",
							title : "项目类型",
							width : "100",
							align : "center",
							formatter:function(value,row,index){
								var state = '';
								if(value == '00'){state = '自营'}
								if(value == '01'){state = '挂靠'}
								if(value == '02'){state = '陪标'}
								return state;
							}
						}, {
							field : "PROJECT_STATE",
							title : "项目状态",
							align : "center",
							width : "100",
							formatter:function(value,row,index){
								var state = '';
								if(value == '00'){state = '进行中';}
								if(value == '01'){state = '已关闭';}
								if(value == '02'){state = '已删除';}
								return state;
							}
						}, {
							field : "CARD_NAME",
							title : "汇入账户名",
							width : "120",
							align : "center"
						}, {
							field : "CARD_NUM",
							title : "账号",
							width : "140",
							align : "center"
						}, {
							field : "CARD_BANK",
							title : "开户行",
							width : "140",
							align : "center"
						}, {
							field : "DETAIL_NUM",
							title : "保证金编号",
							width : "140",
							align : "center"
						}

						]
					});
		}
	 
	 
	 
	 
	 
	 
	 
	 

	 
	 
}











