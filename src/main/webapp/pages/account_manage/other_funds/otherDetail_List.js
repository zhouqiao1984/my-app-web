

function otherManage(item){
	var $page = getCurrentPageObj();//当前页
	$page.find("#on1").text(item.OTHER_NAME);
	var otherDetailTable = $page.find("[tb='otherDetailTable']");
	var odCall = getMillisecond();
	var other_id = item.OTHER_ID;
	initOtherDetailTable();//初始化列表
	
	//查询按钮
	 $page.find("[name='queryOtherD']").click(function(){
		 var other_start_time = $page.find("[name='OTHER_START_TIME']").val();
		 var other_end_time = $page.find("[name='OTHER_END_TIME']").val();
		 var other_pay_type = $page.find("[name='OTHER_PAY_TYPE']").val();
		 if('点击选择' == other_start_time){
			 other_start_time = '';
		 }
		 if('点击选择' == other_end_time){
			 other_end_time = '';
		 }
		 if('选择类型' == other_pay_type){
			 other_pay_type = '';
		 }
		 otherDetailTable.bootstrapTable('refresh',{
				url:'otherfunds/queryOtherDetail.asp?call='+ odCall +"&OTHER_ID="+other_id
				+"&OTHER_START_TIME="+other_start_time+"&OTHER_END_TIME="+other_end_time+"&OTHER_PAY_TYPE="+other_pay_type});
	 });
	 
	 
	//重置按钮
	$page.find("[name='resetOtherD']").click(function(){
		$page.find("table input").not("table input[type='button']").val("");
	});
		
	//新增款项明细
	 $page.find("button[name='addOtherDetail']").click(function(){
		 closeAndOpenInnerPageTab("addOtherDetail","新增款项明细","pages/account_manage/other_funds/otherDetail_edit.html", function(){
			 editOtherDetail(null,other_id);
			});
	 });
	 
	//修改
	 $page.find("[name='editOtherDetail']").click(function(){
			var seles = otherDetailTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一条数据进行修改!");
					return;
			}
			if(seles[0].OTHER_DETAIL_ID == '00'){
				alert("修改合计?你真淘气！");
				return;
			}
		 closeAndOpenInnerPageTab("editDetail","修改","pages/account_manage/other_funds/otherDetail_edit.html", function(){
			 editOtherDetail(seles[0],other_id);
			});
	 });
 
	//删除
	 $page.find("[name='delOtherDetail']").click(function(){
			var seles = otherDetailTable.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一条数据进行删除!");
					return;
			}
			if(seles[0].OTHER_DETAIL_ID == '00'){
				alert("别闹！");
				return;
			}
			nconfirm("确定删除编号为["+seles[0].OTHER_DETAIL_NUM+"]的记录?",function(){
				var deoCall = getMillisecond();
				var params = {};
				params.OTHER_DETAIL_ID = seles[0].OTHER_DETAIL_ID;
				params.TYPE = 'del';
				baseAjaxJsonp('otherfunds/editOtherDetail.asp?call=' + deoCall, params, function(data) {
					if(data && data.result=="true"){
						alert(data.msg);
						refreshOtherTable();
					}else{
						alert(data.msg);
					}
				},deoCall,false);
			});
		
	 });
	 
	 function refreshOtherTable(){
		 otherDetailTable.bootstrapTable('refresh',{
				url:'otherfunds/queryOtherDetail.asp?call='+odCall+'&OTHER_ID=' + other_id});
		 
	 }
	//初始化款项明细表	
	 function initOtherDetailTable() {
			var queryParams = function(params) {
				var temp = {
					limit : params.limit, // 页面大小
					offset : params.offset// 页码
				};
				return temp;
			};
		 otherDetailTable.bootstrapTable({
						url : 'otherfunds/queryOtherDetail.asp?call='+ odCall + '&OTHER_ID=' + other_id,
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
						jsonpCallback: odCall,
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
							field : "OTHER_DETAIL_DATE",
							title : "日期",
							width : "15%",
							align : "center"
						}, {
							field : "REAL_AMOUNT",
							title : "金额",
							width : "15%",
							align : "center"
						}, {
							field : "OTHER_PAY_TYPE",
							title : "收入/支出",
							width : "15%",
							align : "center",
							formatter:function(value,row,index){
								var state = '';
								if(value == '00'){state = '收入'}
								else if(value == '01'){state = '支出'}
								else{state = '-'}
								return state;
							}
						},{
							field : "REMARK",
							title : "备注",
							width : "25%",
							align : "center"
						}, {
							field : "OTHER_DETAIL_NUM",
							title : "流水号",
							width : "20%",
							align : "center"
						}
						]
					});
		}
}











