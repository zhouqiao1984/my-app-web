function openProjectPop(obj,params){
	$('#project_modal').remove();
	obj.load("pages/account_manage/deposit_manage/projectInfo_POP.html",{},function(){
		$("#project_modal").modal("show");
		initProjectPopTable(params);
	});

}

function initProjectPopTable(item){
	var queryParams = function(params) {
		var temp = {
			limit : params.limit, // 页面大小
			offset : params.offset
		// 页码
		};
		return temp;
	};
	
	//重置
	getCurrentPageObj().find("[btn='pop_projectReset']").click(function(){
		getCurrentPageObj().find("#projectQuery input").val("");
	});
	//查询
	getCurrentPageObj().find("[btn='pop_projectQuery']").click(function(){ debugger;
		 var project_num = $("[name='P.PROJECT_NUM']").val();
		 var project_name =  $("[name='P.PROJECT_NAME']").val();
		
		 getCurrentPageObj().find("[tb='projectPopTable']").bootstrapTable('refresh',{
		 		url:"project/queryProject.asp?"+'&PROJECT_NUM='+project_num+'&PROJECT_NAME='+project_name});
	});
	
	getCurrentPageObj().find("[tb='projectPopTable']").bootstrapTable("destroy").bootstrapTable({
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
                },onDblClickRow:function(row){
                	$('#project_modal').modal('hide');
                	item.PROJECT_NAME.val(row.PROJECT_NAME);
                	item.PROJECT_ID.val(row.PROJECT_ID);
                	item.PROJECT_NUM.val(row.PROJECT_NUM);
                	var projece_type = row.PROJECT_TYPE;
                	if(projece_type == '00'){
                		projece_type = '自营';
                	}else if(projece_type == '01'){
                		projece_type = '挂靠';
                	}else{
                		projece_type = '未定义';
                	} 
                	item.PROJECT_TYPE.val(projece_type);
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
					field : "PROJECT_NUM",
					title : "项目编号",
					width : "20%",
					align : "center"
				}, {
					field : "PROJECT_NAME",
					title : "项目名称",
					width : "40%",
					align : "center"
				}, {
					field : "PROJECT_TYPE",
					title : "项目类型",
					width : "15%",
					align : "center",
					formatter:function(value,row,index){
						var state = '';
						if(value == '00'){state = '自营';}
						if(value == '01'){state = '挂靠';}
						return state;
					}
				}, {
					field : "PROJECT_STATE",
					title : "项目状态",
					align : "center",
					width : "15%",
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