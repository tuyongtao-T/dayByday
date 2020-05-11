/* 功能：查看滚动条距离，指的是距离文档顶部的距离
 * 常规使用：window.pageXOffset/window.pageYOffset
 * IE9/IE8及以下： 
 * document.body.scrollLeft/scrollTop
 * document.documentElement.scrollLeft/scrollTop
 * 不常见的是： window.scrollX/window.scrollY
 * */
function getScrollOffset () {
	if (window.pageXOffset) {
		return {
			left: window.pageXOffset,
			top: window.pageYOffset
		}
	} else{
		return {
			left: document.body.scrollLeft + document.documentElement.scrollLeft,
			top: document.body.scrollTop + document.documentElement.scrollTop
		}
	}
}