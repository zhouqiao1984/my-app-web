
//初始化
function editAccount(item){
	var project_id = item.PROJECT_ID;
	var $page = getCurrentPageObj();//当前页
	var $fp_table = $page.find("[tb='firstPaymentTable']");
	var $oi_table = $page.find("[tb='outInvoiceTable']");
	var $ii_table = $page.find("[tb='inputInvoiceTable']");
	var $ss_table = $page.find("[tb='inputInvoiceSTable']");
	var $memo_table = $page.find("[tb='memoTable']");
	$page.find("#MEMO_VIEW").val("00");
	$page.find("[btn='close_modal']").hide();
	initProjectInfo();//初始化项目信息
	initFirstPaymentTable();//初始化甲方付款表
	initOutInvoiceTable();//初始化开发票金额表
	initInputInvoiceTable();//初始化进项发票(普票)金额表	
	initInputInvoiceSTable();//初始化进项发票(专票)金额表	
	initMemoTable();//初始化项目备忘录表
	initButton();//初始化按钮
	//新增甲方付款
	$page.find("[btn='addFirstPay']").click(function(){
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
		baseAjaxJsonp('project/addFirstPayment.asp?PROJECT_ID='+project_id + "&call=" + fCall, params, function(data) {
			if(data && data.result=="true"){
				alert(data.msg);
				$page.find("input[name^='F.']").val('');
				refreshFirstPayment();
			}else{
				alert(data.msg);
				
			}
		},fCall,false);
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
				baseAjaxJsonp('project/delRecord.asp?call=' + dfCall, params, function(data) {
					if(data && data.result=="true"){
						alert(data.msg);
						refreshFirstPayment();
					}else{
						alert(data.msg);
						
					}
				},dfCall,false);
			});
		 
	 });
	 
	//新增甲方开发票金额
	$page.find("[btn='addOutInvoice']").click(function(){
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
		baseAjaxJsonp('project/addOutInvoice.asp?PROJECT_ID='+project_id + "&call=" + oCall, params, function(data) {
			if(data && data.result=="true"){
				alert(data.msg);
				$page.find("input[name^='O.']").val('');
				refreshOutInvoice();
			}else{
				alert(data.msg);
				
			}
		},oCall,false);
		
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
				baseAjaxJsonp('project/delRecord.asp?call=' + doCall, params, function(data) {
					if(data && data.result=="true"){
						alert(data.msg);
						$page.find("input[name^='O.']").val('');
						refreshOutInvoice();
					}else{
						alert(data.msg);
						
					}
				},doCall,false);
			});
		 
	 });
	
	//新增进项发票(普票)
	$page.find("[btn='addInputInvoice']").click(function(){
		var params = getPageParam("I");
		if("" == params.PAYDATE || "点击选择" == params.PAYDATE){
			alert("请选择新增进项发票(普通)的日期");
			return;
		}
		var $valiObj = $page.find("#input_tab");
		if(!is_money($valiObj)){
			alert('金额输入格式有误');
			return;
		}
		var iCall = getMillisecond();
		baseAjaxJsonp('project/addInputInvoice.asp?PROJECT_ID='+project_id + "&call=" + iCall, params, function(data) {
			if(data && data.result=="true"){
				alert(data.msg);
				$page.find("input[name^='I.']").val('');
				refreshInputInvoice();
			}else{
				alert(data.msg);
				
			}
		},iCall,false);
		
	});
	
	//删除进项发票(普票)
	 $page.find("[btn='delInputInvoice']").click(function(){
			var seles = $ii_table.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一条开发票记录删除!");
					return;
			}
			if(seles[0].PROJECT_ID == '00'){
				alert("合计项不能执行删除操作");
				return;
			}
			nconfirm("确定删除该进项发票(普通)的记录?",function(){
				var diCall = getMillisecond();
				var params = {};
				params.DEL_ID = seles[0].INPUT_ID;
				params.TYPE = 'input';
				baseAjaxJsonp('project/delRecord.asp?call=' + diCall, params, function(data) {
					if(data && data.result=="true"){
						alert(data.msg);
						$page.find("input[name^='I.']").val('');
						refreshInputInvoice();
					}else{
						alert(data.msg);
						
					}
				},diCall,false);
			});
		 
	 });

	//新增进项发票(专票)
		$page.find("[btn='addInputInvoiceS']").click(function(){
			var params = getPageParam("S");
			if("" == params.PAYDATE || "点击选择" == params.PAYDATE){
				alert("请选择进项发票(专用)的日期");
				return;
			}
			var $valiObj = $page.find("#inputs_tab");
			if(!is_money($valiObj)){
				alert('金额输入格式有误');
				return;
			}
			var iCall = getMillisecond();
			baseAjaxJsonp('project/addInputInvoices.asp?PROJECT_ID='+project_id + "&call=" + iCall, params, function(data) {
				if(data && data.result=="true"){
					alert(data.msg);
					$page.find("input[name^='S.']").val('');
					refreshInputInvoiceS();
				}else{
					alert(data.msg);
					
				}
			},iCall,false);
			
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
				nconfirm("确定删除该进项发票(专用)的记录?",function(){
					var diCall = getMillisecond();
					var params = {};
					params.DEL_ID = seles[0].INPUT_ID;
					params.TYPE = 'special';
					baseAjaxJsonp('project/delRecord.asp?call=' + diCall, params, function(data) {
						if(data && data.result=="true"){
							alert(data.msg);
							$page.find("input[name^='S.']").val('');
							refreshInputInvoiceS();
						}else{
							alert(data.msg);
							
						}
					},diCall,false);
				});
			 
		 });
	 
	 
	//初始化信息
	function initProjectInfo(){
		for(var k in item){
		
			$page.find("[name='P."+ k +"']").val(item[k]);
		}
	}
	
	//刷新甲方付款表
	function refreshFirstPayment(){
		$fp_table.bootstrapTable('refresh',{
					url:'project/queryFirstpayment.asp?PROJECT_ID='+project_id+'&call=firstpayment'});
	}
	
	//刷新开发票金额
	function refreshOutInvoice(){
		$oi_table.bootstrapTable('refresh',{
					url:'project/queryOutinvoice.asp?PROJECT_ID='+project_id+'&call=outinvoice'});
	}
	
	
	//刷新进项发票(普票)
	function refreshInputInvoice(){
		$ii_table.bootstrapTable('refresh',{
					url:'project/queryInputinvoice.asp?PROJECT_ID='+project_id+'&call=inputinvoice'});
	}
	
	//刷新进项发票(专票)
	function refreshInputInvoiceS(){
		$ss_table.bootstrapTable('refresh',{
					url:'project/queryInputinvoices.asp?PROJECT_ID='+project_id+'&call=inputinvoices'});
	}
	
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
					url : 'project/queryFirstpayment.asp?PROJECT_ID='+project_id+"&call=firstpayment",
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
						width : "60",
						formatter:function(value,row,index){
							return index + 1;
						}
					}, {
						field : "PAYDATE",
						title : "付款日期",
						width : "100",
						align : "center"
					}, {
						field : "PAYMENT",
						title : "金额",
						width : "100",
						align : "center"
					}, {
						field : "BALANCE",
						title : "余额",
						width : "100",
						align : "center"
					},{
						field : "REMARK",
						title : "备注",
						width : "200",
						align : "center"
					}, {
						field : "FIRST_NUM",
						title : "编号",
						width : "100",
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
					url : 'project/queryOutinvoice.asp?PROJECT_ID='+project_id+'&call=outinvoice',
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
						width : "60",
						formatter:function(value,row,index){
							return index + 1;
						}
					}, {
						field : "PAYDATE",
						title : "开发票日期",
						width : "100",
						align : "center"
					}, {
						field : "PAYMENT",
						title : "金额",
						width : "100",
						align : "center"
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
						field : "BALANCE",
						title : "余额",
						width : "100",
						align : "center"
					},{
						field : "UPTAX",
						title : "增值税额",
						width : "100",
						align : "center"
					},{
						field : "ADDTAX",
						title : "附加税额",
						width : "100",
						align : "center"
					},{
						field : "OTHERTAX",
						title : "其他税额",
						width : "100",
						align : "center"
					},{
						field : "REMARK",
						title : "备注",
						width : "200",
						align : "center"
					}, {
						field : "OUT_NUM",
						title : "编号",
						width : "100",
						align : "center"
					}
					]
				});
	}

	//初始化进项发票(普票)金额表
	function initInputInvoiceTable() {
		var queryParams = function(params) {
			var temp = {
				limit : params.limit, // 页面大小
				offset : params.offset
			// 页码
			};
			return temp;
		};
		$ii_table.bootstrapTable({
					url : 'project/queryInputinvoice.asp?PROJECT_ID='+project_id+'&call=inputinvoice',
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
					jsonpCallback: 'inputinvoice',
					onLoadSuccess : function(data){
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
						width : "60",
						formatter:function(value,row,index){
							return index + 1;
						}
					}, {
						field : "PAYDATE",
						title : "发票(普通)日期",
						width : "100",
						align : "center"
					}, {
						field : "PAYMENT",
						title : "金额",
						width : "100",
						align : "center"
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
					},{
						field : "REMARK",
						title : "备注",
						width : "200",
						align : "center"
					}, {
						field : "INPUT_NUM",
						title : "编号",
						width : "100",
						align : "center"
					}
					]
				});
	}

	//初始化进项发票(专票)金额表
	function initInputInvoiceSTable() {
		var queryParams = function(params) {
			var temp = {
				limit : params.limit, // 页面大小
				offset : params.offset
			// 页码
			};
			return temp;
		};
		$ss_table.bootstrapTable({
					url : 'project/queryInputinvoices.asp?PROJECT_ID='+project_id+'&call=inputinvoices',
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
						width : "60",
						formatter:function(value,row,index){
							return index + 1;
						}
					}, {
						field : "PAYDATE",
						title : "发票(专用)日期",
						width : "100",
						align : "center"
					}, {
						field : "PAYMENT",
						title : "金额",
						width : "100",
						align : "center"
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
					},{
						field : "REMARK",
						title : "备注",
						width : "200",
						align : "center"
					}, {
						field : "INPUT_NUM",
						title : "编号",
						width : "100",
						align : "center"
					}
					]
				});
	}
	
	
	//初始化项目记事表
	function initMemoTable() {
		var queryParams = function(params) {
			var temp = {
				limit : params.limit, // 页面大小
				offset : params.offset
			// 页码
			};
			return temp;
		};
		$memo_table.bootstrapTable({
					url : 'project/queryMemo.asp?PROJECT_ID='+project_id+"&MEMO_STATE=00&call=projectmemo",
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
					uniqueId : "MENO_ID", // 每一行的唯一标识，一般为主键列
					cardView : false, // 是否显示详细视图
					detailView : false, // 是否显示父子表
					singleSelect : true,// 复选框单选
					jsonpCallback: 'projectmemo',
					onLoadSuccess : function(data){
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
						field : "MEMO_NUM",
						title : "编号",
						width : "20%",
						align : "center"
					}, {
						field : "MEMO_TITLE",
						title : "标题",
						width : "50%",
						align : "center"
					}, {
						field : "MEMO_STATE",
						title : "状态",
						width : "10%",
						align : "center",
						formatter:function(value,row,index){
							var state = '';
							if(value == '00'){state = '未完成';}
							if(value == '01'){state = '已完成';}
							return state;
						}
					},{
						field : "",
						title : "查看",
						width : "10%",
						align : "center",
						formatter:function(value,row,index){
							return "<a style='color:blue'  href='javascript:void(0)' onclick=openDetail('"+index+"')>详情</a>" ;
						}
					}
					]
				});
	}
	
	
	function initButton(){
			//新增记事
			$page.find("[btn='addMemo']").unbind('click');
			$page.find("[btn='addMemo']").click(function(){
				setSelected($page.find("#MEMO_STATE"),"00");
				$page.find("#memo_modal").modal('show');
				$page.find("#memo_tr3").hide();
				$page.find("#memo_tr4").hide();
				$page.find("#memo_type").val("add");
				$page.find("[name^='M.']").attr("readonly",false);
				$page.find("#MEMO_STATE").attr("disabled",false);
				$page.find("[name^='M.']").val("");
			});
			
			//修改记事
			$page.find("[btn='editMemo']").unbind('click');
			$page.find("[btn='editMemo']").click(function(){
				var seles = $memo_table.bootstrapTable("getSelections");
				if(seles.length!=1){
						alert("请选择一条记录修改!");
						return;
				}
				$page.find("#memo_modal").modal('show');
				$page.find("#memo_tr3").show();
				$page.find("#memo_tr4").show();
				$page.find("[name^='M.']").attr("readonly",false);
				$page.find("#MEMO_STATE").attr("disabled",false);
				for(var k in seles[0]){
					$page.find("#"+ k).val(seles[0][k]);
					if(k == 'MEMO_STATE'){
						setSelected($page.find("#MEMO_STATE"),seles[0][k]);
					}
				}
				$page.find("#memo_type").val("edit");
			});
			
			//删除记事
			$page.find("[btn='delMemo']").unbind('click');
			$page.find("[btn='delMemo']").click(function(){
				var seles = $memo_table.bootstrapTable("getSelections");
				if(seles.length!=1){
						alert("请选择一条记录删除!");
						return;
				}
				nconfirm("确定删除该记录?",function(){
					var params = {};
					params["TYPE"] = 'del';
					params["MEMO_ID"] = seles[0].MEMO_ID;
					saveMemo(params);
				});
			});
			
			//保存模态框
			$page.find("[btn='memo_save']").unbind('click');
			$page.find("[btn='memo_save']").click(function(){
				var memoType = $page.find("#memo_type").val();
				if(memoType == 'add'){
					var params = getPageParam("M");
					params["TYPE"] =  memoType;
					params["SID"] = SID;
					saveMemo(params);
				}
				if(memoType == 'edit'){
					var params = getPageParam("M");
					params["TYPE"] =  memoType;
					params["SID"] = SID;
					params["MEMO_ID"] = $page.find("#MEMO_ID").val();
					saveMemo(params);
				}
				
			});
			
			//已完成与未完成显示切换
			$page.find("[btn='changeView']").unbind('click');
			$page.find("[btn='changeView']").click(function(){
				$page.find("[btn='changeView']").unbind('click');
				var currView = $page.find("#MEMO_VIEW").val();
				if(currView == ""){
					currView = '00';
				}
				if(currView == '00'){//当前显示已完成
					$page.find("#MEMO_VIEW").val("01");
					$page.find("[btn='changeView']").text("切换至未完成");
					refreshMemo('01');
				}
				if(currView == '01'){//当前显示未完成
					$page.find("#MEMO_VIEW").val("00");
					$page.find("[btn='changeView']").text("切换至已完成");
					refreshMemo('00');
				}
			});
			
			//关闭查看记事详情
			$page.find("[btn='close_modal']").unbind('click');
			$page.find("[btn='close_modal']").click(function(){
				getCurrentPageObj().find("[name^='M.']").attr("readonly",false);
				getCurrentPageObj().find("#MEMO_STATE").attr("disabled",false);
				getCurrentPageObj().find("[btn='close_modal']").hide();
				getCurrentPageObj().find("[btn='memo_save']").show();
				getCurrentPageObj().find("[btn='close2']").show();
				getCurrentPageObj().find("#memo_modal").modal('hide');
			});
	
	}
	//提交MEMO
	function saveMemo(params){
		var memoCall = getMillisecond();
		baseAjaxJsonp('project/saveMemo.asp?call=' + memoCall +'&PROJECT_ID='+project_id, params, function(data) {
			if(data && data.result=="true"){
				alert(data.msg);
				$page.find("#memo_modal").find("[name^='M.']").val('');
				$page.find("#memo_modal").modal('hide');
				refreshMemo();
			}else{
				alert(data.msg);
				$page.find("#memo_modal").modal('hide');
			}
		},memoCall,false);
	}
	
	//刷新记事列表未完成
	function refreshMemo(param){
		var memo_view = '00';
		if(param != null){
			memo_view = param;
		}else{
			$page.find("#MEMO_VIEW").val("00");
			$page.find("[btn='changeView']").text("切换至已完成");
		}
		$memo_table.bootstrapTable('refresh',{
					url:'project/queryMemo.asp?PROJECT_ID='+project_id+'&MEMO_STATE='+memo_view+'&call=projectmemo'});
		initButton();
	}
	
}

function openDetail(index){
	getCurrentPageObj().find("[btn='close_modal']").show();
	var dataTble = getCurrentPageObj().find("[tb='memoTable']").bootstrapTable('getData');
	var rowData = dataTble[index];
	getCurrentPageObj().find("#memo_modal").modal('show');
	getCurrentPageObj().find("#memo_tr3").show();
	getCurrentPageObj().find("#memo_tr4").show();
	for(var k in rowData){
		getCurrentPageObj().find("#"+ k).val(rowData[k]);
		if(k == 'MEMO_STATE'){
			setSelected(getCurrentPageObj().find("#MEMO_STATE"),rowData[k]);
		}
	}
	getCurrentPageObj().find("[btn='memo_save']").hide();
	getCurrentPageObj().find("[btn='close2']").hide();
	getCurrentPageObj().find("[name^='M.']").attr("readonly",true);
	getCurrentPageObj().find("#MEMO_STATE").attr("disabled",true);
	
}



