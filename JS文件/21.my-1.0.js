//IE 8及以下 没有Node这个东西
/* 拥有函数
 * 1. el.childElements()
 * 2. el.siblings()
 * 3. el.insertAfter(a,b)
 * 4. T()
 * 5. ToArray(nodeList)
 * 6. el.css()
 * 7. el.attr()
 * 8. ajax(obj)
 * 9. el.addEvent(),el.removeEvent(),e.stopBubble()
 * 10. el.docOffset() 
 * 11. getViewport()
 * 
 * 
 * 
 * 
 */

// 1. 利用childNodes获取子元素children => childElement
(function() {
	Node.prototype.childElements = function() {
		var children = this.childNodes,
			len = children.length,
			elList = {
				length: 0,
				push: Array.prototype.push,
				splice: Array.prototype.splice
			};
		for(var i = 0; i < len; i++) {
			if(children[i].nodeType === 1) {
				//				elList[elList.length] = children[i];
				//				elList.length++;
				elList.push(children[i]);
			}
		}
		return elList;
	}
})();

// 2. 封装一个自己的选择器
// 支持类选择器，ID选择器，和标签选择器
function T(name) {
	var str = name.trim(), //IE8 一下没有trim()方法
		firstStr = str.charAt(0),
		otherStr = str.slice(1);
	switch(firstStr) {
		case '#':
			var obj = document.getElementById(otherStr);
			return obj;
			break;
		case '.':
			var obj = document.getElementsByClassName(otherStr);
			return obj;
			break;
		default:
			var obj = document.getElementsByTagName(str);
			return obj;
	}
}

// 3. 类似arguments,nodeList 这种类数组对象，可以转换为数组
function toArray(nodes) {
	var arr = null;
	try {
		arr = Array.prototype.slice.call(nodes, 0);
	} catch(ex) {
		arr = new Array();
		var len = nodes.length;
		for(var i = 0; i < len; i++) {
			arr.push(nodes[i]);
		}
	}
	return arr;
}

// 4. 获取其他兄弟元素集合
(function() {
	Node.prototype.siblings = function() {
		var nodeList = this.parentNode.getChildElements(),
			index = Array.prototype.indexOf.call(nodeList, this), //获取当前元素的索引
			len = nodeList.length;
		nodeList.splice(index, 1); //在元素集合中删除当前元素
		return nodeList;
	}
})();

//  5. 创建insertAfter() 方法,this 指向父元素，由父元素调用
(function() {
	Node.prototype.insertAfter = function(newEl, prevEl) {
		if(prevEl.nextSibling) {
			this.insertBefore(newEl, prevEl.nextSibling);
		} else {
			this.appendChild(newEl);
		}
	}
})();

// 6. 设置和获取元素样式值
(function() {
	Node.prototype.css = function(obj) {
		if(obj instanceof Object) {
			// 设置元素样式
			// 设置folat 时
			for(var key in obj) {
				this.style[key] = obj[key];
			}
			return this;
		} else {
			//  获取元素样式
			var len = arguments.length,
				// 创建一个类数组
				arrObj = {
					length: 0,
					push: Array.prototype.push,
					splice: Array.prototype.splice
				};
			if(len === 1) {
				// 只有一个参数时，直接返回样式值		
				if(window.getComputedStyle) {
					return window.getComputedStyle(this, null)[arguments[0]];
				} else {
					return this.currentStyle[arguments[0]];
				}
			} else {
				// 多个参数时，返回一个可访问的类数组
				for(var i = 0; i < len; i++) {
					//获取元素样式具体实现
					if(window.getComputedStyle) {
						if(arguments[i]) {
							arrObj.push(window.getComputedStyle(this, null)[arguments[i]]); //这里的null是填伪元素，获取伪元素的样式（after）
						} else {
							arrObj = window.getComputedStyle(this, null);
						}
					} else {
						if(arguments[i]) {
							arrObj.push(this.currentStyle[arguments[i]]);
						} else {
							arrObj = this.currentStyle;
						}
					}
				}
				return arrObj;
			}

		}
	}
})();

// 7. 获取，设置元素属性
(function() {
	Node.prototype.attr = function(obj) {
		if(obj instanceof Object) {
			// 设置元素属性值
			for(key in obj) {
				this.setAttribute(key, obj[key]);
			}
			return this;
		} else {
			//  获取元素属性值
			var len = arguments.length,
				// 创建一个类数组
				arrObj = {
					length: 0,
					push: Array.prototype.push,
					splice: Array.prototype.splice
				};
			if(len === 1) {
				// 只有一个参数时，直接返回样式值	
				//				return this.attributes.getNamedItem(obj).nodeValue;
				return this.attributes[obj].nodeValue;
			} else {
				// 多个参数时，返回一个可访问的类数组
				for(var i = 0; i < len; i++) {
					//获取元素样式具体实现
					arrObj.push(this.attributes[arguments[i]].nodeValue);
				}
				return arrObj;
			}
		}
	}
})();

// 8. ajax异步请求
function ajax(obj) {
	var xhr,
		timer,
		dataStr = datatoStr(obj.data);

	if(window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else {
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}

	if(obj.type.toLowerCase() === 'get') {
		xhr.open('GET', obj.url + '?' + dataStr, true);
		xhr.send();
	} else {
		xhr.open('POST', obj.url, true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(dataStr);
	}

	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
				obj.fnS(xhr)
			} else {
				console.log("错误码" + xhr.status);
			}
		}
	}

	if(obj.timeout) {
		setInterval(function() {
			xhr.abort();
			clearInterval(timer);
		}, obj.timeout);
	}

}
function datatoStr(data) {
	var arr = [];
	data.t = new Date().getTime();
	for(key in data) {
		arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
	}
	return arr.join('&');
}

// 9. 添加事件和移除事件，阻止冒泡
(function(){
	Node.prototype.addEvent = function(type,fn){
		if (this.addEventListener) {
			this.addEventListener(type,fn,false);
			return this;
		} else if(this.attachEvent){
			this.attachEvent('on' + type,function(){
				fn.call(this);
			});
			return this;
		}else {
			this['on' + type] = fn;
			return this;
		}
	}
	Node.prototype.removeEvent = function(type,fn){
		if (this.addEventListener) {
			this.removeEventListener(type,fn,false);
			return this;
		} else if(this.attachEvent){
			this.detachEvent('on' + type,function(){
				fn.call(this);
			});
			return this;
		}else {
			this['on' + type] = null;
			return this;
		}
	}
	Event.prototype.stopBubble = function() {
		return this.stopPropagation() ? this.stopPropagation() : this.cancelBubble = true;
	}
})();

// 10.获取元素在整个页面中的偏移量
(function(){
	Node.prototype.getdocOffset = function(){
		var parent = this.offsetParent,
			offsetLeft = this.offsetLeft,
			offsetTop = this.offsetTop;
		while(parent){
			offsetLeft += parent.offsetLeft;
			offsetTop += parent.offsetTop;
			parent = parent.offsetParent;
		}
		return {
			left: offsetLeft,
			top: offsetTop
		}
	}
})();

// 11. 客户区大小
function getViewport () {
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

// 12. 获取滚动条距离，距离文档顶部的距离; 获取滚动条尺寸
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

// 13.


