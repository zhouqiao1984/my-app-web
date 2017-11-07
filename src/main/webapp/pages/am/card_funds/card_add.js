
//初始化
function editCard(item){
	var $page = getCurrentPageObj();//当前页
	initVlidate($page);//渲染必填项
	if(null == item){//新增
		initButtonEvent("add");//初始化按钮事件
	}else{//修改
		initButtonEvent("edit");//初始化按钮事件
		initCardInfo(item);//初始化项目信息
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
			params["TYPE"] = type;
			var saCall = getMillisecond();
			baseAjaxJsonp("cardfunds/editCard.asp?call=" + saCall,params, function(data) {
				if (data && data.result=="true") {
					alert(data.msg);
					closeCurrPageTab();
				}else{
					alert(data.msg);
				}
			},saCall,false);
			
		});
	

	};


	//初始化信息
	function initCardInfo(item){
		for(var k in item){
		
			$page.find("[name='C."+ k +"']").val(item[k]);
		}
	}



}





