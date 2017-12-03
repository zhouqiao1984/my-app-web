


function viewProject(item){
	
		for(var k in item){
			if(k == 'PROJECT_TYPE'){
				var value = item[k];
				if(value == '00'){value = '自营';}
				if(value == '01'){value = '挂靠';}
				if(value == '02'){value = '陪标';}
				getCurrentPageObj().find("[name='P."+ k +"']").val(value);
				continue;
			}
			getCurrentPageObj().find("[name='P."+ k +"']").val(item[k]);
		}
	
	

	
}