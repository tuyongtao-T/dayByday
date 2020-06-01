; // 避免前面有谁没有加; 对当前代码块造成影响
(function(window, undefined) {
	//定义函数
	var $ = tyt = function(selector) {
		return new $.prototype.init(selector);
	}
	// 重新定义函数原型方法
	$.prototype = {
		// 定义原型上的构造函数为原函数T
		constructor: $,
		// 定义原型上的init()方法
		init: function(selector) {
			/*
			 * 参数处理规则
			  1.传入'' null undefined NaN 0 false,返回空的init实例对象
			  2.传入字符串：
			  	代码片段： 会将创建好的DOM元素存储到init实例对象中返回 <a></a>
			  	选择器：  会将找到的所有元素存储到init实例对象中返回
			  3.数组
			  	会将数组中存储的元素依次存储到init实例对象中返回
			  4.除上述类型外的其他
			    	会将传入的数据存储在init实例对象中返回
			 */
			
			// 对传入的参数进行处理，去除字符串两端空格
			selector = $.trim(selector);
			// 传入'' null undefined NaN 0 false,返回空的T对象
			if(!selector) {
				return this;
			}
			// 传入字符串：
			else if($.isString(selector)) {
				// 2.1 判断是否是代码片段
				if($.isHTML(selector)) {
					//1.根据代码片段创建所有元素
					let temp = document.createElement("div");
					temp.innerHTML = selector;
					[].push.apply(this, temp.children);
				} else {
					let res = document.querySelectorAll(selector);
					[].push.apply(this, res);
				}
			}
			// 3.传入函数
			else if($.isFunction(selector)) {
				$.ready(selector);
			}
			// 4. 数组(真数组和伪数组)
			else if($.isArray(selector)) {
				//无论是真数组还是伪数组，都先转为真数组，在转为伪数组
				let arr = [].slice.call(selector);
				[].push.apply(this, arr);
			}
			// 5. 除上述类型以外
			else {
				this[0] = selector;
				this.length = 1;
			}
			return this;
		},
		/*
		 * T原型上的属性和方法
		 * 1.T获取版本号
		 * 2.selector: 实例默认的选择器取值
		 * 3.length: 实例默认的长度
		 * 
		 * 4.push: 给实例添加新元素
		 * 5.sort: 对实例中的元素进行排序
		 * 6.splice: 按照指定下标删除元素
		 * 7.toArray: 将实例转化为数组返回
		 * 
		 * 8.get: 获取指定下标的第一个元素，获取的是原生DOM
		 * 9.eq: 获取指定下标的第一个元素，获取的是T类型的实例对象
		 * 10.first: 获取实例中第一个元素，是T类型实例对象
		 * 11.last: 获取实例中最后一个元素，是T类型实例对象
		 * 
		 * 12.each: 遍历实例，把遍历到的数据传给回调使用
		 * 13.map: 遍历实例，把遍历到的数据传给回调使用,然后把回调的返回值收集起来组成一个新数组返回
		 */
		version: '1.1.0',
		selector: '',
		length: 0,
		//[].push找到数组的push方法
		//冒号前面的push将来有T对象调用
		//相当于[].push.apply(this)
//		push: [].push,
//		sort: [].sort,
//		splice: function() {
//			this.toArray().splice(arguments);
//			//return this;
//		},
		toArray: function () {
			let res = null;
			try {
				res = Array.prototype.slice.call(this, 0);
			} catch(ex) {
				res = new Array();
				for(let i = 0; i < this.length; i++) {
					res.push(this[i]);
				}
			}
			return res;
		},
		//这里存在的意义是供eq()调用
		get: function(num) {
			if(arguments.length === 0) {
				return this.toArray();
			} else if(num >= 0) {
				return this[num];
			} else {
				return this[this.length + num];
			}
		},
		eq: function(num) {
			if(arguments.length === 0) {
				return new $();
			} else {
				return $(this.get(num));
			}
		},
		first: function() {
			return this.eq(0);
		},
		last: function() {
			return this.eq(-1);
		},
		each: function(fn) { // fn => 回调函数
			return $.each(this, fn);
		}
	}

	// 给函数$添加一个静态extend()方法，然猴让原型上的extend()方法指针指向这个静态指针地址
	$.extend = $.prototype.extend = function(obj) {
		for(let key in obj) {
			this[key] = obj[key];
		}
	}

	// 编写具体的属性方法
	$.extend({
		isString: function(str) {
			return typeof str === 'string';
		},
		isHTML: function(str) {
			return str.charAt(0) == '<' && str.charAt(str.length - 1) == '>' && str.length >= 3;
		},
		trim: function(str) {
			if(!$.isString(str)) {
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
			if($.isObject(sele) && !$.isWindow() && 'length' in sele) {
				return true;
			}
			return false;
		},
		isFunction: function(sele) {
			return typeof sele === 'function';
		},
		ready: function(fn) {
			//判断DOM是否加载完毕
			if(document.readyState == 'complete') {
				fn();
			} else if(document.addEventListener) {
				document.addEventListener('DOMContentLoaded', function() {
					fn();
				})
			} else {
				document.attachEvent('onreadystatechange', function() {
					fn();
				})
			}
		},
		//对一个数组或者对象进行遍历，并执行fn()这个函数
		each: function(obj, fn) { // fn => 回调函数
			//1.判断是否是数组
			if($.isArray(obj)) {
				for(let i = 0; i < obj.length; i++) {
					let res = fn.call(obj[i], i, obj[i]); // 这里更改this指向为value
					if(res === true) {
						continue;
					} else if(res === false) {
						break;
					}
				}
			} else if($.isObject(obj)) {
				for(let key in obj) {
					let res = fn.call(obj[key], key, obj[key]);
					if(res === true) {
						continue;
					} else if(res === false) {
						break;
					}
				}
			}
			return obj;
		},
		// 对一个数组或者对象进行遍历，并执行fn()这个函数，返回执行这个函数后的新数组
		map: function(obj, fn) {
			let res = [];
			if($.isArray(obj)) {
				for(let i = 0; i < obj.length; i++) {
					let temp = fn(obj[i], i);
					if(temp) {
						res.push(temp);
					}
				}
			} else if($.isObject(obj)) {
				for(let key in obj) {
					let temp = fn(obj[key], key);
					if(temp) {
						res.push(temp);
					}
				}
			}
			return res;
		}

	});

	//DOM操作相关方法
	$.prototype.extend({
		children: function() {
			let res = [];
			$(this).each(function(k, v) {
				let children = v.childNodes;
				$(children).each(function(key, value) {
					if(value.nodeType === 1) {
						res.push(value);
					}
				});
			})
			return $(res);
		},
		empty: function() {
			//1.遍历找到的所有元素
			this.each(function(key, value) {
				value.innerHTML = '';
			})
			return this;
		},
		//从DOM中删除所有匹配的元素
		// 没有参数，则删除当前所有，右参数，则删除当前对象中具有参数特性的数据
		remove: function(sele) {
			if(arguments.length === 0) {
				//1.遍历找到的所有元素
				this.each(function(key, value) {
					//2.根据遍历到的元素找到父元素，通过父元素删除指定元素
					let parent = value.parentNode;
					parent.removeChild(value);
				})
			} else {
				let Tthis = this;
				//1.根据传入的选择器，找到对应的元素
				$(sele).each(function(key, value) {
					//2.遍历找到的元素，获取对应的类型
					let type = value.tagName;
					//3.遍历指定的元素
					Tthis.each(function(k, v) {
						//4.获取指定元素的类型
						let t = v.tagName;
						//5.判断找到元素的类型和指定元素的类型
						if(t === type) {
							let parent = value.parentNode;
							parent.removeChild(value);
						}
					})
				})
			}
			return this;
		},
		html: function(content) {
			if(arguments.length === 0) {
				return this[0].innerHTML;
			} else {
				this.each(function(key, value) {
					value.innerHTML = content;
				})
			}
			return this;
		},
		text: function(content) {
			if(arguments.length === 0) {
				let res = '';
				this.each(function(key, value) {
					res += value.innerText;
				})
				return res;
			} else {
				this.each(function(key, value) {
					value.innerText = content;
				})
			}
			return this;
		},
		// 将指定元素添加到目标元素内的最后面
		appendTo: function(sele) {
			//统一的将传入的数据转为init()实例对象
			let Ttarget = $(sele),
				Tthis = this,
				res = [];
			//1.遍历取出所有指定元素
			$.each(Ttarget, function(key, value) {
				//2.遍历取出所有元素
				Tthis.each(function(k, v) {
					//3.判断当前时候是第0个指定的元素
					if(key === 0) {
						//直接添加
						value.appendChild(v);
						res.push(v);
					} else {
						//先拷贝再添加
						let temp = v.cloneNode(true);
						value.appendChild(temp);
						res.push(temp);
					}
				})
			});
			//返回所有添加的元素
			return $(res);
		},
		// 将指定元素添加到目标元素内的最前面
		prependTo: function(sele) {
			//统一的将传入的数据转为T对象
			let Ttarget = $(sele),
				Tthis = this,
				res = [];
			//1.遍历取出所有指定元素
			$.each(Ttarget, function(key, value) {
				//2.遍历取出所有元素
				Tthis.each(function(k, v) {
					//3.判断当前时候是第0个指定的元素
					if(key === 0) {
						//直接添加
						value.insertBefore(v, value.firstChild);
						res.push(v);
					} else {
						//先拷贝再添加
						let temp = v.cloneNode(true);
						value.insertBefore(temp, value.firstChild);
						res.push(temp);
					}
				})
			});
			//返回所有添加的元素
			return $(res);
		},
		//元素添加指定内容到最后面
		append: function(sele) {
			if($.isString(sele)) {
				$.each(this, function(key, value) {
					this.innerHTML += sele;
				})
				//this[0].innerHTML += sele;
			} else {
				$(sele).appendTo(this);
			}
			return this;
		},
		//元素添加指定内容到最前面
		prepend: function(sele) {
			if($.isString(sele)) {
				$.each(this, function(key, value) {
					this.innerHTML = sele + this.innerHTML;
				})
			} else {
				$(sele).prependTo(this);
			}
			return this;
		},
		//元素添加指定内容到前面
		insertBefore: function(sele) {
			//调用者.inserBefore(插入的元素，参考元素)
			let Ttarget = $(sele),
				Tthis = this,
				res = [];
			//1.遍历取出所有指定元素
			$.each(Ttarget, function(key, value) {
				let parent = value.parentNode;
				//2.遍历取出所有元素
				Tthis.each(function(k, v) {
					//3.判断当前时候是第0个指定的元素
					if(key === 0) {
						//直接添加
						parent.insertBefore(v, value);
						res.push(v);
					} else {
						//先拷贝再添加
						let temp = v.cloneNode(true);
						parent.insertBefore(temp, value);
						res.push(temp);
					}
				})
			});
			//返回所有添加的元素
			return $(res);
		},
		insertAfter: function(sele) {
			//调用者.inserBefore(插入的元素，参考元素)
			let Ttarget = $(sele),
				Tthis = this,
				res = [];
			//1.遍历取出所有指定元素
			$.each(Ttarget, function(key, value) {
				let parent = value.parentNode;
				//2.遍历取出所有元素
				Tthis.each(function(k, v) {
					//3.判断当前时候是第0个指定的元素
					if(key === 0) {
						//直接添加
						parent.insertBefore(v, value.nextSibling);
						res.push(v);
					} else {
						//先拷贝再添加
						let temp = v.cloneNode(true);
						parent.insertBefore(temp, value.nextSibling);
						res.push(temp);
					}
				})
			});
			//返回所有添加的元素
			return $(res);
		},
		before: function(sele) {
			if($.isString(sele)) {
				$.each(this, function(key, value) {
					this.innerHTML = sele + this.innerHTML;
				})
			} else {
				$(sele).insertBefore(this);
			}
			return this;
		},
		after: function(sele) {
			if($.isString(sele)) {
				$.each(this, function(key, value) {
					this.innerHTML += sele;
				})
			} else {
				$(sele).insertAfter(this);
			}
			return this;
		},
		replaceAll: function(sele) {
			$(this).insertBefore($(sele));
			$(sele).remove();
			return this;
		},
		replaceWith: function(sele) {
			$(sele).insertBefore(this);
			$(this).remove();
			return this;
		},
		siblings: function() {
			let childs = $(this[0].parentNode).children(),
				children = $(childs).toArray(),
				index = Array.prototype.indexOf.call(children, this[0]); //获取当前元素的索引
			children.splice(index, 1);
			return $(children);
		}
	});

	$.prototype.init.prototype = $.prototype;
	window.$ = $;
})(window);