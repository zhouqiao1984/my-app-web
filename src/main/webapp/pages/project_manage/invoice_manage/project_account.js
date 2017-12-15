
//初始化
function editAccount(item){
	var project_id = item.PROJECT_ID;
	var $page = getCurrentPageObj();//当前页
	//甲方付款
	var $fp_table = $page.find("[tb='firstPaymentTable']");
	//开发票
	var $oi_table = $page.find("[tb='outInvoiceTable']");
	//进项普通
	//var $ii_table = $page.find("[tb='inputInvoiceTable']");
	//进项专用
	var $ss_table = $page.find("[tb='inputInvoiceSTable']");
	var $memo_table = $page.find("[tb='memoTable']");
	$page.find("[btn='close_modal']").hide();
	initFirstPaymentTable();//初始化甲方付款表
	initOutInvoiceTable();//初始化开发票金额表
	//initInputInvoiceTable();//初始化进项发票(普票)金额表	
	initInputInvoiceSTable();//初始化进项发票(专票)金额表	
	

	/*************************  进项发票  *************************/ 
	
	//往来款管理
	 $page.find("[btn='payManage1']").click(function(){
			var seles = $ss_table.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一条记录!");
					return;
			}

		 closeAndOpenInnerPageTab("payManage1","往来款管理","pages/project_manage/invoice_manage/invoicePay_List.html", function(){
			 ipayManage(seles[0]);
			});
	 });
	
	//重置按钮
	$page.find("[name='resetS']").click(function(){
		$page.find("select").val(" ").select2();
	
	});

	//查询按钮
	 $page.find("[name='queryS']").click(function(){
		 var state = $page.find("[name='SQ.STATE']").val();
		 var type = $page.find("[name='SQ.TYPE']").val();
		 var invoice_type = $page.find("[name='SQ.INVOICE_TYPE']").val();
		 if(state == undefined){
			 state = '';
		 }
		 if(type == undefined){
			 type = '';
		 }
		 if(invoice_type == undefined){
			 invoice_type = '';
		 }
		 $ss_table.bootstrapTable('refresh',{
		 		url:'invoice/queryInputinvoice.asp?PROJECT_ID='+project_id+'&STATE='+state+'&TYPE='+type+'&INVOICE_TYPE='+invoice_type});
	 });
	 
	 
		//查看进项发票(专票)
		$page.find("[btn='viewInputInvoiceS']").unbind('click');
		$page.find("[btn='viewInputInvoiceS']").click(function(){
			var seles = $ss_table.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一条记录!");
					return;
			}
			if(seles[0].PROJECT_ID == '00'){
				alert("合计项不能执行修改操作");
				return;
			}
			$page.find("[name^='S.']").val('');
			$page.find("#inputs_modal").modal('show');
			for(var k in seles[0]){
				$page.find("[name='S."+k+"']").val(seles[0][k]);
				$page.find("[name='S."+k+"']").attr("readonly",true);
				if(k == 'STATE' || k == 'TYPE' || k == 'INVOICE_TYPE'){
					setSelected($page.find("[name='S."+k+"']"),seles[0][k]);
					$page.find("[name='S."+k+"']").attr("disabled",true);
				}
			}
			
			$page.find("[btn='inputs_save']").hide();
		});	
	 
 	//新增进项发票(专票)
	$page.find("[btn='addInputInvoiceS']").unbind('click');
	$page.find("[btn='addInputInvoiceS']").click(function(){
		$page.find("[name^='S.']").val('');
		$page.find("[name^='S.']").not("[name='S.PAYDATE']").attr("readonly",false);
		$page.find("select[name^='S.']").attr("disabled",false);
		$page.find("select").val(" ").select2();
		$page.find("#inputs_modal").modal('show');
		$page.find("[name='S.OPT_TYPE']").val('add');
		$page.find("[btn='inputs_save']").show();
	});	
	
	//修改进项发票(专票)
	$page.find("[btn='editInputInvoiceS']").unbind('click');
	$page.find("[btn='editInputInvoiceS']").click(function(){
		var seles = $ss_table.bootstrapTable("getSelections");
		if(seles.length!=1){
				alert("请选择一条记录!");
				return;
		}
		if(seles[0].PROJECT_ID == '00'){
			alert("合计项不能执行修改操作");
			return;
		}
		$page.find("[name^='S.']").val('');
		$page.find("#inputs_modal").modal('show');
		for(var k in seles[0]){
			$page.find("[name='S."+k+"']").val(seles[0][k]);
			if(k != 'PAYDATE'){
				$page.find("[name='S."+k+"']").attr("readonly",false);
			}
			if(k == 'STATE' || k == 'TYPE' || k == 'INVOICE_TYPE'){
				setSelected($page.find("[name='S."+k+"']"),seles[0][k]);
				$page.find("[name='S."+k+"']").attr("disabled",false);
			}
		}
		$page.find("[btn='inputs_save']").show();
		$page.find("[name='S.OPT_TYPE']").val('edit');
	});	
	
	
	
	
	//保存进项发票(专票)		
	$page.find("[btn='inputs_save']").unbind('click');
	$page.find("[btn='inputs_save']").click(function(){
		var params = getPageParam("S");
		if("" == params.PAYDATE || "点击选择" == params.PAYDATE){
			alert("请选择进项发票的日期");
			return;
		}
		if("" == params.INVOICE_TYPE || "请选择" == params.INVOICE_TYPE){
			alert("请选择发票种类");
			return;
		}
		if("" == params.STATE || "请选择" == params.STATE){
			alert("请选择状态");
			return;
		}
		if("" == params.TYPE || "请选择" == params.TYPE){
			alert("请选择类型");
			return;
		}
		var $valiObj = $page.find("#inputs_tab");
		if(!is_money($valiObj)){
			alert('金额输入格式有误');
			return;
		}
		var iCall = getMillisecond();
		baseAjaxJsonp('invoice/addInputInvoice.asp?PROJECT_ID='+project_id + "&call=" + iCall, params, function(data) {
			if(data && data.result=="true"){
				alert(data.msg);
				$page.find("[name^='S.']").val('');
				refreshInputInvoiceS();
			}else{
				alert(data.msg);
				
			}
		},iCall,false);
		$page.find("#inputs_modal").modal('hide');
	}); 
 
	//删除进项发票(专票)
	 $page.find("[btn='delInputInvoiceS']").click(function(){
			var seles = $ss_table.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一条开发票记录删除!");
					return;
			}
			if(seles[0].PROJECT_ID == '00'){
				alert("合计项不能执行删除操作");
				return;
			}
			nconfirm("确定删除该进项发票的记录?",function(){
				var diCall = getMillisecond();
				var params = {};
				params.DEL_ID = seles[0].INPUT_ID;
				params.TYPE = 'input';
				baseAjaxJsonp('invoice/delRecord.asp?call=' + diCall, params, function(data) {
					if(data && data.result=="true"){
						alert(data.msg);
						$page.find("[name^='S.']").val('');
						refreshInputInvoiceS();
					}else{
						alert(data.msg);
						
					}
				},diCall,false);
			});
		 
	 });
	 
	//刷新进项发票(专票)
	function refreshInputInvoiceS(){
		$ss_table.bootstrapTable('refresh',{
					url:'invoice/queryInputinvoice.asp?PROJECT_ID='+project_id+'&call=inputinvoices'});
	}
	 
	


	
	
/*************************  甲方付款   *************************/	
	//新增甲方甲方付款
	$page.find("[btn='addFirstPay']").unbind('click');
	$page.find("[btn='addFirstPay']").click(function(){
		$page.find("[name^='F.']").val('');
		$page.find("#first_modal").modal('show');
		$page.find("[name='F.OPT_TYPE']").val('add');
	});	
	
	//修改甲方付款
	$page.find("[btn='editFirstPay']").unbind('click');
	$page.find("[btn='editFirstPay']").click(function(){
		var seles = $fp_table.bootstrapTable("getSelections");
		if(seles.length!=1){
				alert("请选择一条记录!");
				return;
		}
		if(seles[0].PROJECT_ID == '00'){
			alert("合计项不能执行修改操作");
			return;
		}
		$page.find("[name^='F.']").val('');
		$page.find("#first_modal").modal('show');
		for(var k in seles[0]){
			$page.find("[name='F."+k+"']").val(seles[0][k]);
		}
		
		$page.find("[name='F.OPT_TYPE']").val('edit');
	});	
	
	
	
	
	//保存甲方付款
	$page.find("[btn='first_save']").unbind('click');
	$page.find("[btn='first_save']").click(function(){
		var params = getPageParam("F");
		if("" == params.PAYDATE || "点击选择" == params.PAYDATE){
			alert("请选择付款日期");
			return;
		}
		var $valiObj = $page.find("#first_tab");
		if(!is_money($valiObj)){
			alert('金额输入格式有误');
			return;
		}
		var fCall = getMillisecond();
		baseAjaxJsonp('invoice/addFirstPayment.asp?PROJECT_ID='+project_id + "&call=" + fCall, params, function(data) {
			if(data && data.result=="true"){
				alert(data.msg);
				$page.find("[name^='F.']").val('');
				refreshFirstPayment();
			}else{
				alert(data.msg);
				
			}
		},fCall,false);
		$page.find("#first_modal").modal('hide');
	});
	
	//删除甲方付款
	 $page.find("[btn='delFirstPay']").click(function(){
			var seles = $fp_table.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一条甲方付款记录删除!");
					return;
			}
			if(seles[0].PROJECT_ID == '00'){
				alert("合计项不能执行删除操作");
				return;
			}
			nconfirm("确定删除该甲方付款记录?",function(){
				var dfCall = getMillisecond();
				var params = {};
				params['DEL_ID'] = seles[0].FIRST_ID;
				params['TYPE'] = 'first';
				baseAjaxJsonp('invoice/delRecord.asp?call=' + dfCall, params, function(data) {
					if(data && data.result=="true"){
						alert(data.msg);
						refreshFirstPayment();
					}else{
						alert(data.msg);
						
					}
				},dfCall,false);
			});
		 
	 });
	 
	//刷新甲方付款表
	function refreshFirstPayment(){
		$fp_table.bootstrapTable('refresh',{
					url:'invoice/queryFirstpayment.asp?PROJECT_ID='+project_id+'&call=firstpayment'});
	}
/*************************  甲方开发票金额   *************************/	 
	//新增甲方开发票金额
	$page.find("[btn='addOutInvoice']").unbind('click');
	$page.find("[btn='addOutInvoice']").click(function(){
		$page.find("[name^='O.']").val('');
		$page.find("#out_modal").modal('show');
		$page.find("[name='O.OPT_TYPE']").val('add');
	});	
	
	//修改甲方开发票金额
	$page.find("[btn='editOutInvoice']").unbind('click');
	$page.find("[btn='editOutInvoice']").click(function(){
		var seles = $oi_table.bootstrapTable("getSelections");
		if(seles.length!=1){
				alert("请选择一条记录!");
				return;
		}
		if(seles[0].PROJECT_ID == '00'){
			alert("合计项不能执行修改操作");
			return;
		}
		$page.find("[name^='O.']").val('');
		$page.find("#out_modal").modal('show');
		for(var k in seles[0]){
			$page.find("[name='O."+k+"']").val(seles[0][k]);
		}
		
		$page.find("[name='O.OPT_TYPE']").val('edit');
	});	
	
	//保存甲方开发票金额
	$page.find("[btn='out_save']").unbind('click');
	$page.find("[btn='out_save']").click(function(){
		var params = getPageParam("O");
		if("" == params.PAYDATE || "点击选择" == params.PAYDATE){
			alert("请选择开发票日期");
			return;
		}
		var $valiObj = $page.find("#out_tab");
		if(!is_money($valiObj)){
			alert('金额输入格式有误');
			return;
		}
		var oCall = getMillisecond();
		baseAjaxJsonp('invoice/addOutInvoice.asp?PROJECT_ID='+project_id + "&call=" + oCall, params, function(data) {
			if(data && data.result=="true"){
				alert(data.msg);
				$page.find("[name^='O.']").val('');
				refreshOutInvoice();
			}else{
				alert(data.msg);
				
			}
		},oCall,false);
		$page.find("#out_modal").modal('hide');
	});
	

	//删除甲方开发票
	 $page.find("[btn='delOutInvoice']").click(function(){
			var seles = $oi_table.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一条开发票记录删除!");
					return;
			}
			if(seles[0].PROJECT_ID == '00'){
				alert("合计项不能执行删除操作");
				return;
			}
			nconfirm("确定删除开发票记录?",function(){
				var doCall = getMillisecond();
				var params = {};
				params.DEL_ID = seles[0].OUT_ID;
				params.TYPE = 'out';
				baseAjaxJsonp('invoice/delRecord.asp?call=' + doCall, params, function(data) {
					if(data && data.result=="true"){
						alert(data.msg);
						$page.find("[name^='O.']").val('');
						refreshOutInvoice();
					}else{
						alert(data.msg);
						
					}
				},doCall,false);
			});
		 
	 });
	
	//刷新开发票金额
	function refreshOutInvoice(){
		$oi_table.bootstrapTable('refresh',{
					url:'invoice/queryOutinvoice.asp?PROJECT_ID='+project_id+'&call=outinvoice'});
		
		
		
		
		
	}

	 
/**************************************************/ 	
	

	
	//初始化甲方付款表
	function initFirstPaymentTable() {
		var queryParams = function(params) {
			var temp = {
				limit : params.limit, // 页面大小
				offset : params.offset
			// 页码
			};
			return temp;
		};
		$fp_table.bootstrapTable({
					url : 'invoice/queryFirstpayment.asp?PROJECT_ID='+project_id+"&call=firstpayment",
					method : 'get', // 请求方式（*）
					striped : false, // 是否显示行间隔色
					cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
					sortable : true, // 是否启用排序
					sortOrder : "asc", // 排序方式
					queryParams : queryParams,// 传递参数（*）
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
					jsonpCallback: 'firstpayment',
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
						width : "8%",
						formatter:function(value,row,index){
							return index + 1;
						}
					}, {
						field : "PAYDATE",
						title : "付款日期",
						width : "12%",
						align : "center"
					}, {
						field : "PAYMENT",
						title : "金额",
						width : "15%",
						align : "center"
					}, {
						field : "BALANCE",
						title : "余额",
						width : "15%",
						align : "center"
					},{
						field : "REMARK",
						title : "备注",
						width : "35%",
						align : "center"
					}, {
						field : "FIRST_NUM",
						title : "编号",
						width : "15%",
						align : "center"
					}
					]
				});
	}


	//初始化给甲方开发票金额表
	function initOutInvoiceTable() {
		var queryParams = function(params) {
			var temp = {
				limit : params.limit, // 页面大小
				offset : params.offset
			// 页码
			};
			return temp;
		};
		$oi_table.bootstrapTable({
					url : 'invoice/queryOutinvoice.asp?PROJECT_ID='+project_id+'&call=outinvoice',
					method : 'get', // 请求方式（*）
					striped : false, // 是否显示行间隔色
					cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
					sortable : true, // 是否启用排序
					sortOrder : "asc", // 排序方式
					queryParams : queryParams,// 传递参数（*）
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
					jsonpCallback: 'outinvoice',
					onLoadSuccess : function(data){
						gaveInfo();
					},onLoadError:function () {
	 
	                    alert("数据加载失败！");
	 
	                },
					columns : [{
						checkbox : true,
						rowspan : 2,
						align : 'center',
						valign : 'middle'
					}, {
						field : 'ORDER_ID',
						title : '序号',
						align : "center",
						width : "5%",
						formatter:function(value,row,index){
							return index + 1;
						}
					}, {
						field : "PAYDATE",
						title : "开发票日期",
						width : "8%",
						align : "center"
					}, {
						field : "PAYMENT",
						title : "金额",
						width : "10%",
						align : "center"
					}, {
						field : "PAYNOTAX",
						title : "金额(不含税)",
						width : "10%",
						align : "center"
					}, {
						field : "TAXVALUE",
						title : "税额",
						width : "10%",
						align : "center"
					}, {
						field : "BALANCE",
						title : "余额",
						width : "10%",
						align : "center"
					},{
						field : "UPTAX",
						title : "增值税额",
						width : "10%",
						align : "center"
					},{
						field : "ADDTAX",
						title : "附加税额",
						width : "10%",
						align : "center"
					},{
						field : "OTHERTAX",
						title : "其他税额",
						width : "10%",
						align : "center"
					},{
						field : "REMARK",
						title : "备注",
						width : "10%",
						align : "center"
					}, {
						field : "OUT_NUM",
						title : "编号",
						width : "9%",
						align : "center"
					}
					]
				});
	}



	//初始化进项发票金额表
	function initInputInvoiceSTable() {
		var queryParams = function(params) {
			var temp = {
				limit : params.limit, // 页面大小
				offset : params.offset,
				call : 'inputinvoices'
			// 页码
			};
			return temp;
		};
		$ss_table.bootstrapTable({
					url : 'invoice/queryInputinvoice.asp?PROJECT_ID='+project_id,
					method : 'get', // 请求方式（*）
					striped : false, // 是否显示行间隔色
					cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
					sortable : true, // 是否启用排序
					sortOrder : "asc", // 排序方式
					queryParams : queryParams,// 传递参数（*）
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
					jsonpCallback: 'inputinvoices',
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
						field : "PAYDATE",
						title : "发票日期",
						width : "100",
						align : "center"
					}, {
						field : "PAYMENT",
						title : "金额",
						width : "100",
						align : "center"
					}, {
						field : "PAID",
						title : "已付金额",
						width : "100",
						align : "center",
						formatter:function(value,row,index){
						   var paid = value;
						   if(paid == undefined){ paid = 0;}
						   return paid;
						}
					}, {
						field : "",
						title : "余额",
						width : "100",
						align : "center",
						formatter:function(value,row,index){
							var payment = row.PAYMENT;
							var paid = row.PAID;
							if(payment == undefined || payment == ''){payment = 0;}
							if(paid == undefined || paid == ''){paid = 0;}
							var result = payment - paid;
							return result;
						}
					}, {
						field : "PAYNOTAX",
						title : "金额(不含税)",
						width : "100",
						align : "center"
					}, {
						field : "TAXVALUE",
						title : "税额",
						width : "100",
						align : "center"
					}, {
						field : "TAXBALANCE",
						title : "税额余额",
						width : "100",
						align : "center"
					}, {
						field : "COMPANY",
						title : "开票单位",
						width : "100",
						align : "center"
					}, {
						field : "INVOICE_TYPE",
						title : "发票种类",
						width : "100",
						align : "center",
						formatter:function(value,row,index){
							var type = '';
							if(value == '00'){ type = '普通' }
							if(value == '01'){ type = '专用' }
							return type;
						}
					},{
						field : "TYPE",
						title : "类型",
						width : "100",
						align : "center",
						formatter:function(value,row,index){
							var type = '';
							if(value == '00'){ type = '个人垫付' }
							if(value == '01'){ type = '未付款' }
							if(value == '02'){ type = '公司付款' }
							if(value == '04'){ type = '库存' }
							if(value == '03'){ type = '已完成' }
							return type;
						}
					},{
						field : "STATE",
						title : "状态",
						width : "100",
						align : "center",
						formatter:function(value,row,index){
							var state = '';
							if(value == '00'){ state = '已开' }
							if(value == '01'){ state = '未开' }
							if(value == '02'){ state = '完成' }
							return state;
						}
					}
					]
				});
	}
	
	
}

function checkPay1(value){
	var $valiObj = getCurrentPageObj().find("#inputs_tab");
	if(!is_money($valiObj)){
		alert('金额输入格式有误');
		return;
	}
	var $value3 = getCurrentPageObj().find("[name='S.TAXVALUE']");
	var value2 = getCurrentPageObj().find("[name='S.PAYNOTAX']").val();
	if(value2 == '' || value2 == undefined){ value2 = 0;}
	var value3 = Number(value - value2).toFixed(2);
	$value3.val(value3);
}
function checkPay2(value){
	var $valiObj = getCurrentPageObj().find("#inputs_tab");
	if(!is_money($valiObj)){
		alert('金额输入格式有误');
		return;
	}
	var $value3 = getCurrentPageObj().find("[name='S.TAXVALUE']");
	var value1 = getCurrentPageObj().find("[name='S.PAYMENT']").val();
	if(value1 == '' || value1 == undefined){ value1 = 0;}
	var value3 = Number(value1 - value).toFixed(2);
	$value3.val(value3);
	
	
}
