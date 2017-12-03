
//初始化
function editInvoicePay(item,opt){
	var $page = getCurrentPageObj();//当前页
	var project_id = item.PROJECT_ID;
	var input_id = item.INPUT_ID;
	initVlidate($page);//渲染必填项
	if(opt == 'add'){//新增
		initButtonEvent("add");//初始化按钮事件
	}else{//修改
		initButtonEvent("edit");//初始化按钮事件
		initProjectIPayInfo(item);//初始化明细信息
	}
	
	//按钮事件
	function initButtonEvent(type){
		
		//保存按钮
		$page.find("[btn='saveInfo']").click(function(){
			if(!vlidate($page,"",true)){
				alert("有必填项未填");
				return;
			}
			var params = getPageParam("P");
			if("" == params.IP_DATE || "点击选择" == params.IP_DATE){
				alert("请选择日期");
				return;
			}
			if(!is_money($page)){
				alert('金额输入格式有误');
				return;
			}
			if(type == 'add'){//新增判断金额是否大于余额
				if(params["IP_AMOUNT"]>item.INVOICE_BALANCE){
					alert('付款金额不能大于剩余未付款金额');
					return;
				}
			}
			params["PROJECT_ID"] = project_id;
			params["INPUT_ID"] = input_id;
			params["TYPE"] = type;
			var ipcCall = getMillisecond();
			baseAjaxJsonp("invoice/editInvoicePay.asp?call=" + ipcCall,params, function(data) {
				if (data && data.result=="true") {
					alert(data.msg);
					closeCurrPageTab();
				}else{
					alert(data.msg);
				}
			},ipcCall,false);
			
		});
	

	};


	//初始化信息
	function initProjectIPayInfo(item){
//		$page.find("[name='D.DETAIL_DATE']").removeAttr('onFocus');
//		$page.find("[name='D.AMOUNT']").attr('readonly',true);
//		$page.find("[name='D.PAY_TYPE']").attr('disabled','disabled');
		for(var k in item){
			$page.find("[name='P."+ k +"']").val(item[k]);
		}
	}



}





