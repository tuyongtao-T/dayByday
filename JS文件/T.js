;
(function(window, undefined) {
	var T = function(selector) {
		return new T.prototype.init(selector);
	}
	T.prototype = {
		constructor: T,
		init: function(selector) {
			/*
			  1.传入'' null undefined NaN 0 false,返回空的T对象
			  2.传入字符串：
			  	代码片段： 会将创建好的DOM元素存储到T对象中返回 <a></a>
			  	选择器：  会将找到的所有元素存储到T对象中返回
			  3.数组
			  	会将数组中存储的元素依次存储到T对象中返回
			  4.除上述类型外的其他
			    会将传入的数据存储在T对象中返回
			 */
			//0.去除字符串两端空格
			selector = T.trim(selector);
			//  1.传入'' null undefined NaN 0 false,返回空的T对象
			if(!selector) {
				return this;
			}
			//2.传入字符串：
			else if(T.isString(selector)) {
				// 2.1 判断是否是代码片段
				if(T.isHTML(selector)) {
					//1.根据代码片段创建所有元素
					let temp = document.createElement("div");
					temp.innerHTML = selector;
					[].push.apply(this, temp.children);
				} else {
					// 选择器
					let res = document.querySelectorAll(selector);
					[].push.apply(this, res);
				}
			}
			// 3. 数组(真数组和伪数组)
			else if(T.isArray(selector)) {
				//无论是真数组还是伪数组，都先转为真数组，在转为伪数组
				let arr = [].slice.call(selector);
				[].push.apply(this, arr);
			}
			//4. 除上述类型以外
			else {
				this[0] = selector;
				this.length = 1;
			}
			return this;
		}
	}

	/*静态方法*/
	T.extend = T.prototype.extend = function(obj) {
		for(let key in obj){
			this[key] = obj[key];
		}
	}
	T.extend({
		isString: function(str) {
			return typeof str === 'string';
		},
		isHTML: function(str) {
			return str.charAt(0) == '<' && str.charAt(str.length - 1) == '>' && str.length >= 3;
		},
		trim: function(str) {
			if(!T.isString(str)) {
				return str;
			}
			if(str.trim) {
				return str.trim();
			} else {
				//利用正则表达式
				return str.replace(/^\s+|\s+$/g, '');
			}
		},
		isObject: function(sele) {
			return typeof sele === 'object';
		},
		isWindow: function(sele) {
			return sele === window;
		},
		isArray: function(sele) {
			if(T.isObject(sele) && !T.isWindow() && 'length' in sele) {
				return true;
			}
			return false;
		},
		isFunction: function(sele) {
			return typeof sele === 'function';
		}
	});

	T.prototype.init.prototype = T.prototype;
	window.T = T;
})(window);