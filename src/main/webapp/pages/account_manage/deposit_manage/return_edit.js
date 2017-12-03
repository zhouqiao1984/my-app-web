
//初始化
function editReturn(item,detail_id){
	var $page = getCurrentPageObj();//当前页
	initVlidate($page);//渲染必填项
	if(null == item){//新增
		initButtonEvent("add");//初始化按钮事件
	}else{//修改
		initButtonEvent("edit");//初始化按钮事件
		initReturnInfo(item);//初始化明细信息
	}
	
	//按钮事件
	function initButtonEvent(type){
		
		//保存按钮
		$page.find("[btn='saveInfo']").click(function(){
			if(!vlidate($page,"",true)){
				alert("有必填项未填");
				return;
			}
			var params = getPageParam("R");
			if("" == params.RETURN_DATE || "点击选择" == params.RETURN_DATE){
				alert("请选择日期");
				return;
			}
			if(!is_money($page)){
				alert('金额输入格式有误');
				return;
			}
			params["DETAIL_ID"] = detail_id;
			params["TYPE"] = type;
			baseAjax("deposit/editReturn.asp",params, function(data) {
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
	function initReturnInfo(item){

		for(var k in item){
			$page.find("[name='R."+ k +"']").val(item[k]);
		}
	}



}





