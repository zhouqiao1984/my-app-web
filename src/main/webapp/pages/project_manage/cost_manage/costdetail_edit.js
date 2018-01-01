
//初始化
function editCD(item,cost_id){
	var $page = getCurrentPageObj();//当前页
	initVlidate($page);//渲染必填项
	if(null == item){//新增
		initButtonEvent("add");//初始化按钮事件
	}else{//修改
		initButtonEvent("edit");//初始化按钮事件
		initCDInfo(item);//初始化明细信息
	}
	
	//按钮事件
	function initButtonEvent(type){
		
		//保存按钮
		$page.find("[btn='saveInfo']").click(function(){
			if(!vlidate($page,"",true)){
				alert("有必填项未填");
				return;
			}
			var params = getPageParam("C");
			if(!is_money($page)){
				alert('金额输入格式有误');
				return;
			}
			params["COST_ID"] = cost_id;
			params["TYPE"] = type;
			
			baseAjax("project/editCd.asp",params, function(data) {
				if (data && data.result=="true") {
					alert(data.msg);
					closeCurrPageTab();
				}else{
					alert(data.msg);
				}
			});
			
		});
	

	};


	//初始化信息
	function initCDInfo(item){
//		var contentType = item.CONTENT_TYPE;
//		if(contentType == '01'){
//			item.AMOUNT = (""+item.AMOUNT).substring(1);
//		}
		for(var k in item){
			$page.find("[name='C."+ k +"']").val(item[k]);
			if(k == 'CD_TYPE'){
				setSelected($page.find("[name='C.CD_TYPE']"),item[k]);
			}
		}
	}



}





