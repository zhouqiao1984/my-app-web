
//初始化
function editRecord(item,relate_type,relate_id){
	var $page = getCurrentPageObj();//当前页
	if(null == item){//新增
		initButtonEvent("add");//初始化按钮事件
	}else{//修改
		initButtonEvent("edit");//初始化按钮事件
		initRecordInfo(item);//初始化用户信息

	}
	//initVlidate($page);
	//按钮事件
	function initButtonEvent(type){
		
		//保存按钮
		$page.find("[btn='saveInfo']").click(function(){
//			if(!vlidate($page,"",true)){
//				alert("有必填项未填");
//				return;
//			}
			var params = getPageParam("R");
			params["TYPE"] = type;
			params["LNID"] = LN_ID;
			params["RELATE_TYPE"] = relate_type;
			if(relate_id != null && relate_id != undefined){
				params["RELATE_ID"] = relate_id;
			}
			baseAjax("record/editRecord.asp",params, function(data) {
				if (data != undefined&&data!=null&&data.result=="true") {
					alert(data.msg);
					closeCurrPageTab();
				}else{
					alert(data.msg);
				}
			});
			
		});
	

	};


	//初始化信息
	function initRecordInfo(item){
		for(var k in item){
			$page.find("[name='R."+ k +"']").val(item[k]);
			if(k == 'RECORD_STATE'){
				setSelected(getCurrentPageObj().find("[name='R.RECORD_STATE']"),item[k]);
			}
		}
	}



}





