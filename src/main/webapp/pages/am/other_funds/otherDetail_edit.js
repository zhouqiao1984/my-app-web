
//初始化
function editOtherDetail(item,other_id){
	var $page = getCurrentPageObj();//当前页
	initVlidate($page);//渲染必填项
	if(null == item){//新增
		initButtonEvent("add");//初始化按钮事件
	}else{//修改
		initButtonEvent("edit");//初始化按钮事件
		initOtherDetailInfo(item);//初始化明细信息
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
			if("" == params.OTHER_DETAIL_DATE || "点击选择" == params.OTHER_DETAIL_DATE){
				alert("请选择日期");
				return;
			}
			if(!is_money($page)){
				alert('金额输入格式有误');
				return;
			}
			params["OTHER_ID"] = other_id;
			params["TYPE"] = type;
			var odeCall = getMillisecond();
			baseAjaxJsonp("otherfunds/editOtherDetail.asp?call=" + odeCall,params, function(data) {
				if (data && data.result=="true") {
					alert(data.msg);
					closeCurrPageTab();
				}else{
					alert(data.msg);
				}
			},odeCall,false);
			
		});
	

	};


	//初始化信息
	function initOtherDetailInfo(item){
//		$page.find("[name='D.DETAIL_DATE']").removeAttr('onFocus');
//		$page.find("[name='D.AMOUNT']").attr('readonly',true);
//		$page.find("[name='D.PAY_TYPE']").attr('disabled','disabled');
		for(var k in item){
			$page.find("[name='O."+ k +"']").val(item[k]);
			if(k == 'OTHER_PAY_TYPE'){
				setSelected($page.find("[name='O.OTHER_PAY_TYPE']"),item[k]);
			}
		}
	}



}





