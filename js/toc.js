$(function(){
//返回顶部
$('.home').click(function(){
	$("html,body").animate({scrollTop: 0}, 1000);
	return false;
})
 
//遍历锚点
var mds = $(".maodian")
var arrMd = [];
for(var i = 0, len = mds.length;i<len;i++){
arrMd.push($(mds[i]));
}
 
function update(){
var scrollH = $(window).scrollTop();
for(var i = 0;i<len;i++){
var mdHeight = arrMd[i].offset().top;
if(mdHeight < scrollH){var j = i+1;navon(j);}
}
}
 
//高亮导航菜单
function navon(id){
	$('.main_nav h2,.main_nav h3').removeClass('on');
	$('#p'+id).addClass('on');
}
 
//绑定滚动事件
$(window).bind('scroll',update);
})