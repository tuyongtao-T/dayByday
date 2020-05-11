/* 浏览器的怪异模式和标准模式
 * 有<!DOCTYPE html>  => W3C的规范，支持后向兼容
 * 否则 怪异模式， 浏览器自身兼容
 * 
 *  BackCompat  CSSS1Compat
 * 浏览器的当前可视区域的尺寸
 * 常规： window.innerWidth/innerHeight
 * IE9/IE8及以下：
 * 标准模式： document.documentElement.clientWidth/clientHeight
 * 怪异模式：  document.body.clientWidth/clientHeight
 */
function getViewportSize () {
	if (window.innerWidth) {
		return {
			width: window.innerWidth,
			height: window.innerHeight
		}
	} else{
		if (document.compatMode === 'BackCompat') {
			return {
				width: document.body.clientWidth,
				height: document.body.clientHeight
			}
		} else{
			return {
				width: document.documentElement.clientWidth,
				height: document.documentElement.clientHeight
			}
		}
		
	}
}