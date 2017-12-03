
//初始化
function editProject(item){
	var $page = getCurrentPageObj();//当前页
	initVlidate($page);//渲染必填项
	if(null == item){//新增
		$page.find("#pronum").hide();
		initButtonEvent("add");//初始化按钮事件
	}else{//修改
		initButtonEvent("edit");//初始化按钮事件
		initProjectInfo(item);//初始化项目信息
	}
	
	//按钮事件
	function initButtonEvent(type){
		
		//保存按钮
		$page.find("[btn='saveInfo']").click(function(){
			if(!vlidate($page,"",true)){
				alert("有必填项未填");
				return;
			}
			if(!is_money($page)){
				alert('金额输入格式有误');
				return;
			}
			var params = getPageParam("P");
			params["TYPE"] = type;
			baseAjax("project/editProject.asp",params, function(data) {
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
	function initProjectInfo(item){
		for(var k in item){
		
			$page.find("[name='P."+ k +"']").val(item[k]);
			if(k == 'PROJECT_TYPE'&& item[k] != undefined){
				setSelected($page.find("[name='P."+ k +"']"),item[k]);
			}
		}
	}



}





