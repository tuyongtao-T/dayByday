/* offsetLeft/offsetTop 是用来获取元素相对于块级定位元素的偏移量
 * 这里直接获取元素相对于body的偏移量
 */
function getElemDocPosition (el) {
	var parent = el.offsetParent,
		offsetLeft = el.offsetLeft,
		offsetTop = el.offsetTop;
	while (parent){
		offsetLeft += parent.offsetLeft;
		offsetTop += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return {
		left: offsetLeft,
		top: offsetTop
	}
}
