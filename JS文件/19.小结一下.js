/*
 * 添加事件监听
 */
function addEvent(el, type, fn) {
	if(el.addEventListener) {
		return el.addEventListener(type, fn, false)
	} else if(el.attachEvent) {
		return el.attachEvent('on' + type, function() {
			fn.call(el);
		})
	} else {
		el['on' + type] = fn;
	}
}

/*
 * 解除事件监听
 */
function removeEvent(el, type, fn) {
	if(el.addEventListener) {
		return el.removeEventListener(type, fn, false)
	} else if(el.attachEvent) {
		return el.detachEvent('on' + type, fn);
	} else {
		el['on' + type] = null;
	}
}

/*
 * 阻止冒泡行为
 */
function stopBubble(e) {
	var e = e || window.event;
	if(e.stopPropagation) {
		e.stopPropagation();
	} else {
		e.cancelBubble() = true;
		//		e.returnValue = false;
	}
}

/*
 * 阻止默认行为
 */
function preventDefaultEvent(e) {
	var e = e || window.event;
	if(e.preventDefault) {
		e.preventDefault();
	} else {
		e.returnValue = false;
	}
}

/*
 * 获取滚动条到文档顶部的距离
 */
function getScrollOffset() {
	if(window.pageXOffset) {
		return {
			left: window.pageXOffset,
			top: window.pageYOffset
		}
	} else {
		return {
			left: document.body.scrollLeft + document.documentElement.scrollLeft,
			top: document.body.scrollTop + document.documentElement.scrollTop
		}
	}
}

/*
 * 获取点击点相对于body的距离
 */
function pageXY(e) { // => 这里e是事件对象，MouseEvent
	var scrollLeft = getScrollOffset().left,
		scrollTop = getScrollOffset().top,
		clientLeft = document.documentElement.clientLeft || 0, //ie9一下前面是undefined ,就取0
		clientTop = document.documentElement.clientTop || 0;
	return {
		X: e.clientX + scrollLeft - clientLeft, // clientX/clientY 是点击点与所在父级元素的偏移
		Y: e.clientY + scrollTop - clientTop
	}
}

/* offsetLeft/offsetTop 是用来获取元素相对于父级定位元素的偏移量
 * 这里直接获取元素相对于body的偏移量
 */
function getElemDocPosition(el) { // => 这里el是元素对象
	var parent = el.offsetParent,
		offsetLeft = el.offsetLeft,
		offsetTop = el.offsetTop;
	while(parent) {
		offsetLeft += parent.offsetLeft;
		offsetTop += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return {
		left: offsetLeft,
		top: offsetTop
	}
}

/*
 * 获取元素样式,这是可以获取多个属性值的写法，需要实例化的元素对象来调用
 * element.getCss('width','height') => {width: '100px', height: '100px' }
 */
;
(function() {
	Node.prototype.getCss = function() {
		var obj = {};
		for(var i = 0; i < arguments.length; i++) {
			if(window.getComputedStyle) {
				if(arguments[i]) {
					obj[arguments[i]] = window.getComputedStyle(this, null)[arguments[i]]; //这里的null是填伪元素，获取伪元素的样式（after）
				} else {
					obj.arguments[i] = window.getComputedStyle(this, null);
				}
			} else {
				if(arguments[i]) {
					obj[arguments[i]] = elem.currentStyle[arguments[i]];
				} else {
					obj[arguments[i]] = elem.currentStyle;
				}
			}
		}
		return obj;
	}
})();

/*
 * 这个是获取元素单个属性值的写法,这个可以获取到元素的外部样式表中的属性值
 * 如果没有指定属性类型，则返回所有属性
 */
 function getStyle(el,type){
 	if (window.getComputedStyle) {
 		if (type) {
 			return window.getComputedStyle(el,null)[type];
 		} else{
 			return window.getComputedStyle(el,null);
 		}
 	} else{
 		if (type) {
 			return el.currentStyle[type];
 		} else{
 			return el.currentStyle;
 		}
 	}
 	
 	
 }
/* 鼠标行为  =》 坐标系
 * clientX/Y  鼠标相对于当前可视区的距离，不包含滚动条滑动的距离
 * pageX/y    鼠标相对于当前文档的的距离，包含滚动条滑动的距离（IE9以下不支持）
 * screenX/Y  鼠标相对于屏幕的距离
 * offsetX/Y  鼠标位置相对于块级元素的距离（包含边框，safari不包含边框）
 * 
 */
