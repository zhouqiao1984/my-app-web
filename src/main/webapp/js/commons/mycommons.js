/*
 * $page 页面对象
 * 
 * str 验证单个字符串
 * 
 * */

function is_money($page,str){
 	var reg=/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
 	if(null != $page && undefined != $page){
	 	var moneys = $page.find("[varify='is_money']");
		if(moneys.length > 0){
			for(var i=0;i<moneys.length;i++){
				var money = $.trim($(moneys[i]).val());
				if(money != ''&& !reg.test(money)){
					return false;
				}
				if(money.indexOf('.') == -1 && money.length>10){//如果没有小数点且大于10位数
						return false;
				}
				if(money.indexOf('.') != -1 && money.length>12){//如果有小数点且大于12位数
					return false;
				}
//				var n=(money.split('.')).length-1;
//				if(n>1){
//					return false;
//				}
			}
			
		}
 	}
 	
 	if(undefined != str ){
 		var strr = $.trim(str);
 		if(!reg.test(strr)){
 			return false;
 		}
 		if(strr.length>12){
			return false;
		}
 	}
 	return true;
}