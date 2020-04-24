
/* <button>1</button>
 * <button>2</button>
 * <button>3</button>
 * <button>4</button>
 * <button>5</button>
 * */
/* 假如有5个按钮 我希望为每个按钮添加事件
 * 第一个按钮点击时输出1
 * 第二个输出2...
 * d但实际上没次输出的都是5
 * */

let btn = document.querySelectorAll('button');
	for (var i = 0; i < btn.length; i++) {
		btn[i].onclick = function() {
			console.log(i);
		}
	}
/* 原因分析：event loop(事件循环)
 * click是一个异步调用，
 * 同步：发出调用，立即得到结果
 * 异步：发出调用，其中需要其他操作，才能得到结果
 * for循环中，循环一次，产生一个事件队列event queue，
 * 当点击发生的时候，他再查询对应的事件队列，而此时i已经变成5
 * 所以最后所有的输出都是5
 * */

/*解决方案1*/
for (var i = 0; i < btn.length; i++) {
	let j = i;//在调用时间的时候就传入相对应的索引值，这样事件排队时的j值就是当前索引
	btn[i].onclick = function(){
		console.log(j+1);
	}
}
/*解决方案2*/
for (var i = 0; i < btn.length; i++) {
	btn[i].onclick = (function(i){//这里的立即执行函数必须要，这样可以形成一个块级作用域，
								 //致使每个块级作用域中传入的i都不一样。
		return function(){
			console.log(i+1); //这里利用一个闭包解决问题
		}
	})(i)
}

/*参考链接：https://blog.csdn.net/hefeng6500/article/details/80471073*/


