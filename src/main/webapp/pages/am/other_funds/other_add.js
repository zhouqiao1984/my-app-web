
//初始化
function editOther(item){
	var $page = getCurrentPageObj();//当前页
	initVlidate($page);//渲染必填项
	if(null == item){//新增
		initButtonEvent("add");//初始化按钮事件
	}else{//修改
		initButtonEvent("edit");//初始化按钮事件
		initOtherInfo(item);//初始化款项信息
	}
	
	//按钮事件
	function initButtonEvent(type){
		
		//保存按钮
		$page.find("[btn='saveInfo']").click(function(){
			if(!vlidate($page,"",true)){
				alert("有必填项未填");
				return;
			}
			var params = getPageParam("O");
			params["TYPE"] = type;
			var saCall1 = getMillisecond();
			baseAjaxJsonp("otherfunds/editOther.asp?call=" + saCall1,params, function(data) {
				if (data && data.result=="true") {
					alert(data.msg);
					closeCurrPageTab();
				}else{
					alert(data.msg);
				}
			},saCall1,false);
			
		});
	

	};


	//初始化信息
	function initOtherInfo(item){
		for(var k in item){
		
			$page.find("[name='O."+ k +"']").val(item[k]);
		}
	}



}





