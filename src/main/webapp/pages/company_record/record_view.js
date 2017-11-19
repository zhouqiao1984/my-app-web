
//初始化
function viewRecord(item){
	var $page = getCurrentPageObj();//当前页
	for(var k in item){
		if(k == 'RECORD_STATE'){
			setSelected(getCurrentPageObj().find("#RECORD_STATE"),item[k]);
			continue;
		}
		$page.find("#"+k).text(item[k]);
	}

}





