function openCardPop(obj,params){
	$('#card_modal').remove();
	obj.load("pages/account_manage/deposit_manage/cardInfo_POP.html",{},function(){
		$("#card_modal").modal("show");
		initCardPopTable(params);
	});

}

function initCardPopTable(item){
	var queryParams = function(params) {
		var temp = {
			limit : params.limit, // 页面大小
			offset : params.offset,
			pop : 'true'
		// 页码
		};
		return temp;
	};
	
	//重置
	getCurrentPageObj().find("[btn='pop_cardReset']").click(function(){
		getCurrentPageObj().find("#cardQuery input").val("");
	});
	//查询
	getCurrentPageObj().find("[btn='pop_cardQuery']").click(function(){ debugger;
		 var card_num = $("[name='C.CARD_NUM']").val();
		 var card_name =  $("[name='C.CARD_NAME']").val();
		
		 getCurrentPageObj().find("[tb='cardPopTable']").bootstrapTable('refresh',{
		 		url:"cardfunds/queryCard.asp?"+'&CARD_NUM='+card_num+'&CARD_NAME='+card_name});
	});
	
	getCurrentPageObj().find("[tb='cardPopTable']").bootstrapTable("destroy").bootstrapTable({
				url : 'cardfunds/queryCard.asp',
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
                },onDblClickRow:function(row){
                	$('#card_modal').modal('hide');
                	item.CARD_NAME.val(row.CARD_NAME);
                	item.CARD_ID.val(row.CARD_ID);
                	item.CARD_NUM.val(row.CARD_NUM);
                	item.CARD_BANK.val(row.CARD_BANK);
				},
				columns : [ {
					checkbox : true,
					rowspan : 2,
					align : 'center',
					valign : 'middle',
					visible:false
				},{
					field : 'ORDER_ID',
					title : '序号',
					align : "center",
					width : "10%",
					formatter:function(value,row,index){
						return index + 1;
					}
				}, {
					field : "CARD_NAME",
					title : "账户名称",
					width : "20%",
					align : "center"
				}, {
					field : "CARD_NUM",
					title : "账号",
					width : "20%",
					align : "center"
				}, {
					field : "CARD_BANK",
					title : "开户行",
					width : "30%",
					align : "center"
				}, {
					field : "CARD_STATE",
					title : "账户状态",
					align : "center",
					width : "20%",
					formatter:function(value,row,index){
						var state = '';
						if(value == '00'){state = '启用'}
						else if(value == '01'){state = '停用'}
						else{state = '-'}
						return state;
					}
				}
				]
		});
	

}