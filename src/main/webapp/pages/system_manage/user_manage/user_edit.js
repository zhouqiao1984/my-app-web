
//初始化
function editUser(item){
	var $page = getCurrentPageObj();//当前页
	if(null == item){//新增
		initButtonEvent("add");//初始化按钮事件
	}else{//修改
		initButtonEvent("edit");//初始化按钮事件
		initUserInfo(item);//初始化用户信息
		$page.find("[name='U.NPASSWORD']").removeAttr('validate');
		$page.find("[name='U.NPASSWORD']").removeAttr('valititle');
		$page.find("[name='U.LOGINNAME']").attr('readonly',true);
		$page.find("#setpw").text("设置新密码:");
	}
	initVlidate($page);//渲染必填项
	//按钮事件
	function initButtonEvent(type){
		
		//保存按钮
		$page.find("[btn='saveInfo']").click(function(){
			if(!vlidate($page,"",true)){
				alert("有必填项未填");
				return;
			}
			var params = getPageParam("U");
			if(params.NPASSWORD != '' && params.NPASSWORD != undefined){
				if(!is_password(params.NPASSWORD)){
					alert('密码输入格式有误');
					return;
				}
			}
			params["TYPE"] = type;
			baseAjax("user/editUser.asp",params, function(data) {
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
	function initUserInfo(item){
		for(var k in item){
			$page.find("[name='U."+ k +"']").val(item[k]);
			if(k == 'ROLE'){
				setSelected(getCurrentPageObj().find("[name='U.ROLE']"),item[k]);
			}
		}
	}



}





