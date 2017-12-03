
//初始化
function editDeposit(item){
	var $page = getCurrentPageObj();//当前页
	
	
	//保存
	$page.find("[btn='saveInfo']").click(function(){
		var project_id =  $page.find("[name='PROJECT_ID']").val();
		var card_id =  $page.find("[name='CARD_ID']").val();
		var detail_id = item.DETAIL_ID;
		var params = {};
		params.DETAIL_ID = detail_id;
		params.PROJECT_ID = project_id;
		params.CARD_ID = card_id;
		baseAjax("deposit/editDepositInfo.asp",params, function(data) {
			if (data != undefined&&data!=null&&data.result=="true") {
				alert(data.msg);
				closeCurrPageTab();
			}else{
				alert(data.msg);
			}
		});
	});
	
	//项目POP
	$page.find("[name='PROJECT_NAME']").click(function(){
		var params = {};
		params.PROJECT_NAME = $page.find("[name='PROJECT_NAME']");
		params.PROJECT_ID = $page.find("[name='PROJECT_ID']");
		params.PROJECT_NUM = $page.find("[name='PROJECT_NUM']");
		params.PROJECT_TYPE = $page.find("[name='PROJECT_TYPE']");
		var obj = $page.find("#project_pop");
		openProjectPop(obj,params);
	
	});
	
	//账户POP
	$page.find("[name='CARD_NAME']").click(function(){
		var params = {};
		params.CARD_NAME = $page.find("[name='CARD_NAME']");
		params.CARD_ID = $page.find("[name='CARD_ID']");
		params.CARD_NUM = $page.find("[name='CARD_NUM']");
		params.CARD_BANK = $page.find("[name='CARD_BANK']");
		var obj = $page.find("#card_pop");
		openCardPop(obj,params);
	
	});
	
	
	


}





