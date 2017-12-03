

function ipayManage(item){
	var $page = getCurrentPageObj();//当前页
	var invoice_payTable = $page.find("[tb='ipayManageTable']");
	var formObj = $page.find("#ipayManageForm");//表单对象
	var ipCall = getMillisecond();
	var project_id = item.PROJECT_ID;
	var input_id = item.INPUT_ID;
	if(item.PAYMENT== undefined){item.PAYMENT = 0;}
	if(item.PAID== undefined){item.PAID = 0;}
	var invoice_balance = item.PAYMENT - item.PAID;//余额

	initInvoice_payTable();//初始化列表
	
	//查询按钮
	 $page.find("[name='queryIPay']").click(function(){
		 var param = formObj.serialize();
		 if('点击选择' == param.PAY_START_TIME){
			 param.pay_START_TIME = '';
		 }
		 if('点击选择' == param.PAY_END_TIME){
			 param.pay_END_TIME = '';
		 }
		 invoice_payTable.bootstrapTable('refresh',{
				url:'invoice/queryPayByInput.asp?'+param});
	 });
	 
	 
	//重置按钮
	$page.find("[name='resetIPay']").click(function(){
		$page.find("table input").not("table input[type='button']").val("");
		$page.find("select").val(" ").select2();
	});
		
	//新增
	 $page.find("button[name='addIPay']").click(function(){
		 if(invoice_balance == 0){
			 alert('余额已为0，不能新增');
			 return;
		 }
		 item.INVOICE_BALANCE = invoice_balance;
		 closeAndOpenInnerPageTab("addIPay","新增付款","pages/project_manage/invoice_manage/invoicePay_edit.html", function(){
			 editInvoicePay(item,'add');
			});
	 });
	 
	//修改
	 $page.find("[name='editIPay']").click(function(){
			var seles = invoice_payTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一条数据进行修改!");
					return;
			}
			if(seles[0].IP_ID == '00'){
				alert("请不要试图修改合计！");
				return;
			}
		 closeAndOpenInnerPageTab("editIPay","修改付款信息","pages/project_manage/invoice_manage/invoicePay_edit.html", function(){
			 editInvoicePay(seles[0],'edit');
			});
	 });
 
	//删除
	 $page.find("[name='delIPay']").click(function(){
			var seles = invoice_payTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一条数据进行删除!");
					return;
			}
			if(seles[0].IP_ID == '00'){
				alert("别闹！");
				return;
			}
			nconfirm("确定删除编号为["+seles[0].IP_NUM+"]的记录?",function(){
				var dipCall = getMillisecond();
				var params = {};
				params.IP_ID = seles[0].IP_ID;
				params.TYPE = 'del';
				baseAjaxJsonp('invoice/editInvoicePay.asp?call=' + dipCall, params, function(data) {
					if(data && data.result=="true"){
						alert(data.msg);
						refreshIPayTable();
					}else{
						alert(data.msg);
					}
				},dipCall,false);
			});
		
	 });
	 
	 function refreshIPayTable(){
		 invoice_payTable.bootstrapTable('refresh',{
				url:'invoice/queryPayByInput.asp'});
		 
	 }
	//初始化款项明细表	
	 function initInvoice_payTable() {
			var queryParams = function(params) {
				var temp = {
					limit : params.limit, // 页面大小
					offset : params.offset,// 页码
					INPUT_ID : input_id,
					PROJECT_ID : project_id,
					call :ipCall
				};
				return temp;
			};
		 invoice_payTable.bootstrapTable({
						url : 'invoice/queryPayByInput.asp',
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
						jsonpCallback: ipCall,
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
							field : "IP_DATE",
							title : "日期",
							width : "20%",
							align : "center"
						}, {
							field : "IP_AMOUNT",
							title : "付款金额",
							width : "20%",
							align : "center",
							formatter:function(value,row,index){
								if(value == undefined){value = 0;}
								return value;
							}
						}, {
							field : "IP_REMARK",
							title : "备注",
							width : "30%",
							align : "center"
						}, {
							field : "IP_NUM",
							title : "流水号",
							width : "20%",
							align : "center"
						}
						]
					});
		}
}











