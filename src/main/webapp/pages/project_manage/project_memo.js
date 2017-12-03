	


function memoProject(item){
	var project_id = item.PROJECT_ID;
	$page = getCurrentPageObj();
	var $memo_table = $page.find("[tb='memoTable']");
	var formObj  =  $page.find("#memoForm");
	initMemoTable();//初始化项目备忘录表
	initButton();
	
	//重置按钮
	$page.find("[name='resetM']").click(function(){
		$page.find("table input").not("[type='button']").val("");
		$page.find("select").val(" ").select2();
	
	});
	
	//查询按钮
	 $page.find("[name='queryM']").click(function(){debugger;
		 var param = formObj.serialize();
		 $memo_table.bootstrapTable('refresh',{
		 		url:"project/queryMemo.asp?PROJECT_ID="+project_id+'&'+param});
	 });
	
	//初始化项目记事表
	function initMemoTable() {
		var queryParams = function(params) {
			var temp = {
				limit : params.limit, // 页面大小
				offset : params.offset,
				call : 'projectmemo'
			// 页码
			};
			return temp;
		};
		$memo_table.bootstrapTable({
					url : 'project/queryMemo.asp?PROJECT_ID='+project_id,
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
						field : "MEMO_DATE",
						title : "日期",
						width : "20%",
						align : "center"
					}, {
						field : "MEMO_TITLE",
						title : "标题",
						width : "40%",
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
							if(value == '02'){state = '欠发票';}
							return state;
						}
					}, {
						field : "MEMO_NUM",
						title : "编号",
						width : "20%",
						align : "center"
					}
					]
				});
	}
	
	
	function initButton(){
			
		//查看记事
		$page.find("[btn='viewMemo']").unbind('click');
		$page.find("[btn='viewMemo']").click(function(){
			var seles = $memo_table.bootstrapTable("getSelections");
			if(seles.length!=1){
					alert("请选择一条记录查看!");
					return;
			}
			$page.find("#memo_modal").modal('show');
			$page.find("#memo_tr3").show();
			$page.find("#memo_tr4").show();
			for(var k in seles[0]){
				$page.find("#"+ k).val(seles[0][k]);
				if(k == 'MEMO_STATE'){
					setSelected($page.find("#MEMO_STATE"),seles[0][k]);
				}
			}
			$page.find("[btn='memo_save']").hide();
			$page.find("[name^='M.']").attr("readonly",true);
			$page.find("#MEMO_STATE").attr("disabled",true);
		});
		
		
			//新增记事
			$page.find("[btn='addMemo']").unbind('click');
			$page.find("[btn='addMemo']").click(function(){
				setSelected($page.find("#MEMO_STATE"),"00");
				$page.find("#memo_modal").modal('show');
				$page.find("[btn='memo_save']").show();
				$page.find("#memo_tr3").hide();
				$page.find("#memo_tr4").hide();
				$page.find("#memo_type").val("add");
				$page.find("[name^='M.']").not("[name='M.MEMO_DATE']").attr("readonly",false);
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
				$page.find("[btn='memo_save']").show();
				$page.find("#memo_tr3").show();
				$page.find("#memo_tr4").show();
				$page.find("[name^='M.']").not("[name='M.MEMO_DATE']").attr("readonly",false);
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
					params["SID"] = LN_ID;
					saveMemo(params);
				}
				if(memoType == 'edit'){
					var params = getPageParam("M");
					params["TYPE"] =  memoType;
					params["SID"] = LN_ID;
					params["MEMO_ID"] = $page.find("#MEMO_ID").val();
					saveMemo(params);
				}
				
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
	function refreshMemo(){
		$memo_table.bootstrapTable('refresh',{
					url:'project/queryMemo.asp?PROJECT_ID='+project_id});
	}
	

}

