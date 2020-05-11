/*这里获取滚动条的距离其实就是获取整个html文档的大小尺寸
 * 
 */
function getScrollSize () {
	if (document.body.scrollWidth) {
		return {
			width: document.body.scrollWidth,
			height: document.body.scrollHeight
		}
	} else{
		return {
			width: document.documentElement.scrollWidth,
			height: document.documentElement.scrollHeight
		}
	}
}