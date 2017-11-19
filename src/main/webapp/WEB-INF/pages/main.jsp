<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.xhl.entity.User"%> 
<%
		User user=(User)request.getSession().getAttribute("userinfo");
		String user_name=user.getUserName();
		String login_name=user.getLoginName();
		int user_id = user.getUserId();
		
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=8"/>
<title>项目管理系统</title>
<meta http-equiv="x-ua-compatible" content="IE=7,9,10" >
<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css" />
<link rel="shortcut icon" href="img/e-icon.png" type="img/e-icon" />
<!-- 字体图标 -->
<link rel="stylesheet" href="bootstrap/font-awesome-4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="bootstrap/css/select2.css" />
<link type="text/css" href="bootstrap/css/bootstrap-table.min.css" rel="stylesheet"/>
<link href="ztree3.5.22/css/zTreeStyle/zTreeStyle.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="css/zebra_dialog.css"/>
<link rel="stylesheet" href="css/style.css"/>
<script src="js/artTemplate/template.js"></script>
<script src="js/jquery/jquery-1.9.1/jquery.min.js"></script>
<script src="js/commons/index_dispatch.js"></script>
<script src="bootstrap/js/bootstrap.min.js"></script>
<script src="bootstrap/js/select2.min.js"></script>
<script src="js/My97DatePicker/WdatePicker.js"></script>
<script src="js/commons/placeholders.js"></script>
<!-- 公共JS -->
<script src="js/commons/commons.js"></script>
<script src="js/commons/main.js"></script>
<!-- jquery的对话框插件 -->
<script type="text/javascript" src="js/zebra_dialog/zebra_dialog.js"></script>
<script src="ztree3.5.22/js/jquery.ztree.core.min.js"></script>
<script src="ztree3.5.22/js/jquery.ztree.excheck.min.js"></script>
<script src="ztree3.5.22/js/jquery.ztree.exedit.min.js"></script>
<script src="js/commons/alertAndConfirm.js"></script>
<!-- 我的JS -->
<script src="js/commons/mycommons.js"></script>	
<script type="text/javascript" src="js/sfunction.js"></script>	
<link rel="stylesheet" type="text/css" href="css/form.css"/>
<link rel="stylesheet" type="text/css" href="css/skin_00/skin.css" id="css_style">
</head>
<body id="body">
	<!--主页头部部分公共-->
	<input type="hidden" value="" id="isCreate"/>
	<input type="hidden" value="" id="currentLoginName"/>
	<input type="hidden" value="<%=login_name%>" id="currentUserId"/>
	<input type="hidden" value="" id="currentLoginNoOrg_no"/>
	<input type="hidden" value="00" id="currentLoginskin"/>
	<div class="main_header">
		<div class="headerArea">
<!-- 			<div class="logo"> -->
<!-- 			<img src="img/login.png" />  -->
<!-- 			</div> -->
			<ul class="rightTopHelp">
				<li class="ecitic-user"><i class="fa fa-user"></i><%=user_name %><b></b></li>
				<li class="ecitic-exit" id="ecitic-exit"><i class="fa fa-power-off" aria-hidden="true"></i>退出</li>
			</ul>
			<!-- 其他模块 -->
			<i class="user-astSYS"></i>
			<div class="cgb-system-content" id="cgb-system-content">

			<div class="cgb-system-t" id="cgb-system-t" style=""></div>
			<div class="cgb-system-r" id="cgb-system-r" style=""></div>
			<div class="cgb-system-b" id="cgb-system-b" style=""></div>
			<div class="cgb-system-l" id="cgb-system-l" style=""></div>
			
			<div class="cgb-system-k" id="cgb-system-k" style="width: 470px;"></div>
			<div class="cgb-system-p" id="cgb-system-p" style="height: 216px;"></div>
			<div class="cgb-system-plan" id="cgb-system-plan" style="left: 79px; width: 391px;"></div>
			<div class="cgb-system-research" id="cgb-system-research" style="height: 216px;"></div>
		</div>
		<div class="ecitic-user-content">
			<div class="user-ast"></div>
				<div class="user-Info" >
					<h2>姓名：<%=user_name %></h2>
					<h2>用户名：<%=login_name %></h2>
				</div>
				<div class="clear"></div>
		</div>
		<div class="ecitic-change-skin theme">

		</div>
	</div>
  		<ul class="list_tree_nav">
	 		<li id="firsttit" class="tree_first" onclick="pageDispatch('my_work_terrace')" tabid="my_work_terrace" id="my_work_terrace_tit">首页</li>
	 		<li>
	 			<ul class="list_tree_1nav">
	 			</ul>
	 		</li>
	 		<li id="tree_last" title="全部关闭"></li>
		</ul>
	</div>
	
	<div class="main_all">
		<div class="main_container" id="ecitic-sidebar">
			<div class="cgb-left-all open">
<!-- 				<div class="cgb-menu-title"> -->
<!-- 					<span></span> -->
<!-- 				</div> -->
				<div class="nui-tree-all">
				<ul class="nui-tree">
					<li>
						<ul level="1" class="gundong" id="gundongNavWrap">
								
						</ul>
					</li>
				</ul>
				</div>
			</div>
		</div>	

		
		
		<a href="javascript:;" target="_self" class="suo" id="sidebar-btn"></a>
		<!--主页右侧分公共-->
		<div class="main_iframe" id="main_iframe">
			<div class="zzc"></div>
			<div class="yourLocation">
				<i class="fa fa-home"></i>
				<span>您所在的位置：首页</span>
				<div class="main-add" title="添加常规操作"></div>
	        </div>
	        <div id="contentHtml">
				<div page="menu_my_work_terrace" style="display:block;height: 550px;">
 					 <iframe width="100%" height="150%" src="" scrolling="no" id="workbenchIframe"  name="workbenchIframe" class="citic-iframe" frameborder="no"></iframe>   
				</div>
	        </div>
		</div>
		
	</div>
	
	
</body>
</html>
<script type="text/javascript">
    var LN_ID = $("#currentUserId").val();//全局变更SID
    var skinFlag = $("#currentLoginskin").val();//用户皮肤值;
    var lastPage="";//记录上次打开的页签
    var stopInterval=true;//停止计时器的标志

	//用户信息
	(function(){
		/* openIndexC("index","首页","indexC.html",function(){}); */
		var ishow=false;
		$(".ecitic-user").click(function(){
			$(".ecitic-change-skin").hide();
			$("#cgb-system-content").animate({opacity:'hide',height:"0px",display:'none'},800);
			ishow=true;
			$(".ecitic-user-content").slideToggle("fast");
			
			$(".zzc").show();
		});
		
		/* 选择皮肤事件 */
		$(".ecitic-skin").click(function(){
			$(".ecitic-user-content").hide();
			$("#cgb-system-content").animate({opacity:'hide',height:"0px",display:'none'},800);
			ishow=true;
			$(".ecitic-change-skin").slideToggle("fast");
			$(".zzc").show();
		});
		
		$(".ecitic-user-content").on("click",function(){
			ishow=true;
		});
		$(document).on("click","body:eq(0)",function(){
			if(!ishow){
				$(".ecitic-user-content").hide();
				$(".ecitic-change-skin").hide();
			}
			ishow=false;
		});
	})();
	//侧边栏收合
	$("#sidebar-btn").click(function(){
		var MainIframe=document.getElementById("main_iframe");
		$("#ecitic-sidebar").toggle();
		$(".suo").toggleClass("marginLeft0");
		if($(".suo").is(".marginLeft0")){
			MainIframe.style.marginLeft="16px";
		}else{
			MainIframe.style.marginLeft="215px";
		}
	});
	
	//手风琴效果
	function dropdownAccordion() {
		var Accordion = function(clickItemElStr,el, multiple){
			this.el = el || {};
			this.multiple = multiple || false;
			var links = this.el.find(clickItemElStr);
			links.off("click").on('click',{
				el: this.el,
				multiple: this.multiple
			},this.dropdown);
		};
		Accordion.prototype.dropdown = function(e){
			e.stopPropagation();  //防止事件冒泡
			var $el = e.data.el;
			$this = $(this);
			$next = $this.nextAll();
			var $sibling=$this.parent().parent().siblings(".nuinone");
			var $sibling3=$this.parent().parent().parent().parent().siblings(".nuinone");
			$parentUl = $this.parent().parent(); //父类ul展开的时候，点击子类显示子类菜单时候，父类菜单不合起来。
			$parentUl3 = $this.parent().parent().parent().parent();
			$next.slideToggle();
			$this.parent().toggleClass('open');
			if (!e.data.multiple){
		 	   $el.find('ul').not($next).not($parentUl).not($parentUl3).not($sibling).not($sibling3) //排除当前，排除父类 排除同级
		  	  .slideUp().parent().removeClass('open');
			};
			var tree_label=$(".nui-tree-item-label");
			for(var i=0;i<tree_label.length;i++){
				var treeObj=$(tree_label[i]);
				var treeul=treeObj.siblings("ul");	
			
			}
		};
		var accordion = new Accordion('.nui-tree-item-labelNav',$('#gundongNavWrap'), false); 
		var accordion2 =  new Accordion('.duojiMenu',$(".nuinone"), false);
	};
	dropdownAccordion();
	

</script>
<!-- 初始化主菜单 -->
<script id="initLeftMenuLevel1" type="text/html">
	<li menu_no={{MENU_NO}}  class="gundongNav">
		<div class="nui-tree-item-label nui-tree-item-labelNav pl{{15*MENU_LEVEL}}" onclick=pageDispatch('{{MENU_NO}}')>
			<span class="nui-tree-item-img"><img src="{{MENU_ICON}}" /></span>
			<span class="tit" id="{{MENU_NO}}">{{MENU_NAME}}</span>
			<img src="img/21.png" class="arrowNav">
		</div>
	</li>
</script>
<!-- 初始化主菜单 -->
<script id="initLeftMenuLevel2" type="text/html">
	<li menu_no={{MENU_NO}}  class="gundongNav">
		<div class="nui-tree-item-label nui-tree-item-labelNav pl{{15*MENU_LEVEL}}" onclick=pageDispatch('{{MENU_NO}}')>
			<span class="nui-tree-item-img"><img src="{{MENU_ICON}}" /></span>
			<span class="tit" id="{{MENU_NO}}">{{MENU_NAME}}</span>
			<img src="img/21.png" class="arrowNav">
		</div>
	</li>
</script>
<script type="text/javascript">
/* 其他模块 */
 //主菜单
	var reSysCon=document.getElementById("cgb-system-content");
	function ResearchSystem(){
		var reSysList_W=$(".cgb-system-list").outerWidth();
		var reSysList_Hh=$(".cgb-system-list").outerHeight();
		var reSysList_Hli=$(".cgb-system-list li").outerHeight();
		var reSystem=$(".cgb-system").outerWidth()+1;
		var reSysT = document.getElementById("cgb-system-t");
		var reSysR = document.getElementById("cgb-system-r");
		var reSysB = document.getElementById("cgb-system-b");
		var reSysL = document.getElementById("cgb-system-l");
		
		var reSysT = document.getElementById("cgb-system-k");
		var reSysR = document.getElementById("cgb-system-p");
		var reSysB = document.getElementById("cgb-system-plan");
		var reSysL = document.getElementById("cgb-system-research");
		
		var reSysList_Len=Math.ceil($(".cgb-system-list li").length/4);//判断li有多少行
		var reSysList_H40=reSysList_Hli*reSysList_Len+reSysList_Hh;
		var reSysList_H404=reSysList_H40;
		//var reSysList_H404=reSysList_H40+4;
		//边框大小
		reSysT.style.width=reSysList_W+"px";
		reSysR.style.height=reSysList_H404+"px";
		reSysB.style.left=reSystem+"px";
		reSysB.style.width=reSysList_W-reSystem+"px";
		reSysL.style.height=reSysList_H404+"px";
		var ismy=true;
		$("body").click(function(){
			if(!ismy&&$("#cgb-system-content:visible").length>0){
				$(".cgb-system").click();
			}
			ismy=false;
		});
		$(".cgb-system").click(function(){
			ismy=true;
			if($(".cgb-system").is(".cgb-system-current")){
				$(".cgb-system-content").stop(true, true);
				$(".cgb-system").removeClass("cgb-system-current");
				$(".cgb-system-content").animate({top:'40px',opacity:'hide',height:"0",display:'none'},800);
				$(".cgb-system-t").hide(600);
				$(".cgb-system-r").hide(600);
				$(".cgb-system-b").hide(600);
				$(".cgb-system-l").hide(600);
				
				$(".cgb-system-k").hide(600);
				$(".cgb-system-p").hide(600);
				$(".cgb-system-plan").hide(600);
				$(".cgb-system-research").hide(600);
	//			$(".cgb-system-list").hide(600);
				$(".zzc").hide();
				$(".user-astSYS").hide();
			}else{
				
				$(".cgb-system-content").stop(true, true);
				$(".cgb-system").addClass("cgb-system-current");
				$(".cgb-system-content").width(reSysList_W).animate({top:'40px',opacity:'show',height:reSysList_H40,display:'block'},500);
				$(".user-astSYS").delay(250).show(250);
				$(".cgb-system-t").show(600);
				$(".cgb-system-r").show(600);
				$(".cgb-system-b").show(600);
				$(".cgb-system-l").show(600);
				
				$(".cgb-system-k").show(600);
				$(".cgb-system-p").show(600);
				$(".cgb-system-plan").show(600);
				$(".cgb-system-research").show(600);
				$(".zzc").show();
				
			}
		});
	};

	//常用功能分类切换
	Tag_tab($(".cgb-tab li"),$(".cgb-left-all"));
	//标签切换(注解：变量tab_li是点击的元素,变量tab_ul切换的主题内容元素)
	function Tag_tab(tab_li,tab_ul){
		tab_li.click(function(){
			var $this = $(this);
			var $t = $this.index();
			tab_li.removeClass("current");
			$this.addClass("current");
			tab_ul.removeClass("open");
			tab_ul.eq($t).addClass("open");
		});
	};


	//为首页的iframe 添加皮肤颜色
    function IframeSkinChange(skinFlag){
  	  var iframeSkin="<link rel='stylesheet' type='text/css' href='css/skin_"+skinFlag+"/skin.css' id='css_style_iframe'/>";
  	  if($(window.frames["workbenchIframe"].document).find("#css_style_iframe").length!=0){
  		  $(window.frames["workbenchIframe"].document).find("#css_style_iframe").remove();
  		  $(window.frames["workbenchIframe"].document).find("head").append(iframeSkin);
  	  }else {
  		  $(window.frames["workbenchIframe"].document).find("head").append(iframeSkin); 
  	  }
    }
	//动态设置首页iframe高度
	function changeFrameHeight(){
		 var height= $(window.frames["workbenchIframe"].document).find("body").outerHeight(true)+10;
	       $("#workbenchIframe").css("height",height);

	}
	/* 修改MY97日历框的颜色 */
	function calendarSkin(skin_type){
		var myIframe=$("#_my97DP iframe");
		var head=$(myIframe[0].contentWindow.document).find("head");
		var browser=navigator.appName;
		var b_version=navigator.appVersion; 
		var version=b_version.split(";"); 
		var trim_Version=version[1].replace(/[ ]/g,"");
		var indexTridentStar=window.navigator.userAgent.indexOf("Trident")+8;
		var indexTridentEnd=window.navigator.userAgent.substring(indexTridentStar,indexTridentStar+3);
		if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0" && indexTridentEnd==4.0) 
		{ 
			var iframeSkin="<link rel='stylesheet' type='text/css' href='css/skin_"+skinFlag+"/skin.css' id='my97_css_style_iframe'/>";
		}else{
			var iframeSkin="<link rel='stylesheet' type='text/css' href='../../css/skin_"+skinFlag+"/skin.css' id='my97_css_style_iframe'/>";
		} 
	  	if(head.find("#my97_css_style_iframe").length!=0){
	  		head.find("#my97_css_style_iframe").remove();
	  		head.append(iframeSkin);
	  	}else {
	  		head.append(iframeSkin); 
	  	}
		stopInterval=false;
	};
	/* 网站护肤 */
	 (function(){
		 var e=".theme li";
		 var b = "#css_style";
		 var a = function (g) {
	       	 var ff = jQuery(b).attr("href").split("/")[jQuery(b).attr("href").split("/").length - 2]; 
	                if (jQuery(b).size() != 0) {
	                    jQuery(b).attr("href", jQuery(b).attr("href").replace(ff, g.find("a").attr("rel")));
	                    skinFlag=g.find("a").attr("rel").split("_")[1];
	                    IframeSkinChange(skinFlag);
	                    calendarSkin(skinFlag);
	                    changeStatisticAnalysisIframeCss();
	                }
	        };
	        jQuery(e).click(function (g) {
                a(jQuery(this));
                calendarSkinAnalysisIframeCss();
                $(".ecitic-change-skin").hide();
                var skin_type=skinFlag;
                baseAjax("SUser/updateSkinType.asp",{
                	user_no : SID,
                	skin_type : skin_type,
                }, function(data) {
                			endLoading();
                			if (data.result=="true") {
                				alert("修改成功");
                			}else{
                				alert("修改失败");
                			}
                		});
                leftLevel1MenuTxImg();
                g.stopPropagation();
            });
	})();
	 window.onresize=function(){
	     changeFrameHeight();
	};
   $("#workbenchIframe").load(function(){
 	 	changeFrameHeight();//为首页的iframe 添加皮肤颜色
   		IframeSkinChange(skinFlag);
   });
    var MY97setInterval=setInterval(function(){
       var my97DPIframe=$("#_my97DP iframe");
	   if(!stopInterval){
		   clearInterval(MY97setInterval);
	   }else if(my97DPIframe.length!=0 && $(my97DPIframe[0].contentWindow.document).find("head").length!=0){
		   calendarSkin(skinFlag);
	   }
	},500);
    
//修改统计分析各页面皮肤色
function changeStatisticAnalysisIframeCss(){
	  var iframeArry=document.getElementsByTagName('iframe');
	  var browser=navigator.appName;
	  var b_version=navigator.appVersion; 
	  var version=b_version.split(";"); 
	  var trim_Version=version[1].replace(/[ ]/g,"");
	  var indexTridentStar=window.navigator.userAgent.indexOf("Trident")+8;
	  var indexTridentEnd=window.navigator.userAgent.substring(indexTridentStar,indexTridentStar+3);
	  if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0" && indexTridentEnd==4.0){ 
		  var iframeSkin="<link rel='stylesheet' type='text/css' href='css/skin_"+skinFlag+"/skin.css' id='report-iframe'/>";
	  }else{
		  var iframeSkin="<link rel='stylesheet' type='text/css' href='../css/skin_"+skinFlag+"/skin.css' id='report-iframe'/>";
	  } 
	  for(var i=0;i<iframeArry.length;i++){
		  if(iframeArry[i].id=="reportIframe"){
			  var head=$(iframeArry[i].contentWindow.document).find("head");
			  var reportIframeCss=head.find("#report-iframe");
				 if(reportIframeCss.length!=0){
			  		  reportIframeCss.remove();
			  		  head.append(iframeSkin);
			  	  }else {
			  		head.append(iframeSkin); 
			  	  }
		  }
	  }
}
/* 修改统计分析各页面MY97日历框的颜色 */
function calendarSkinAnalysisIframeCss(){
	    var iframeArry=document.getElementsByTagName('iframe');
		var browser=navigator.appName;
		var b_version=navigator.appVersion; 
		var version=b_version.split(";"); 
		var trim_Version=version[1].replace(/[ ]/g,"");
		var indexTridentStar=window.navigator.userAgent.indexOf("Trident")+8;
		var indexTridentEnd=window.navigator.userAgent.substring(indexTridentStar,indexTridentStar+3);
		if(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0" && indexTridentEnd==4.0) 
		{ 
			var iframeSkin="<link rel='stylesheet' type='text/css' href='css/skin_"+skinFlag+"/skin.css' id='my97_css_style_iframe'/>";
		}else{
			var iframeSkin="<link rel='stylesheet' type='text/css' href='../../css/skin_"+skinFlag+"/skin.css' id='my97_css_style_iframe'/>";
		} 
	    for(var i=0;i<iframeArry.length;i++){
		  if(iframeArry[i].id=="reportIframe"){
			  var my97IframeReport=$(iframeArry[i].contentWindow.document).find("#_my97DP iframe");
				  var head=$(my97IframeReport[0].contentWindow.document).find("head");
				  	if(head.find("#my97_css_style_iframe").length!=0){
				  		head.find("#my97_css_style_iframe").remove();
				  		head.append(iframeSkin);
				  	}else {
				  		head.append(iframeSkin); 
				  	}
		  }
	  }
	
};
</script>

