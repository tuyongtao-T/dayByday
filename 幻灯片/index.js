//window.onload = function() {
//	var items = document.getElementsByClassName('thumb-item'),
//		sliders = document.getElementsByClassName('slider-item'),
//		len = items.length;
//	/*
//	 * 利用事件冒泡机制，给img的父级元素li添加点击事件，
//	 * 
//	 * */
//	for(var i = 0; i < len; i++) {
//		items[i].onclick = function() {
//			this.className += ' active'; // 改变样式时 通常不直接操作样式值，而是增加或删减类
//			var index = curIndex(items, this); // 获取到当前元素在兄弟元素中的位置
//			sliders[index].className += ' focus';
//			for(var i = 0; i < len; i++) {
//				if(i !== index) {
//					items[i].className = 'thumb-item';
//					sliders[i].className = 'slider-item';
//				}
//			}
//		}
//
//	}
//	/*利用事件委托，冒泡机制
//	 * 
//	 * 
//	 * */
//	//	thumb.onclick = function(e){
//	//		var e = e || window.enent,
//	//			tar = e.target || e.srcElement;
//	//	}
//	/*封装找到当前索引的方法
//	 * 传入两个参数：第一个为元素对象集合，第二个为当前元素对象
//	 * */
//	function curIndex(objs, curObj) {
//		return Array.prototype.indexOf.call(objs, curObj);
//	}
//
//}



/*封装一个Slider构造函数*/
;(function(){
	/*传入参数为一个对象，具有显示列表和缩略图的类名属性*/
	var Slider = function(obj){
		this.sliders = document.getElementsByClassName(obj.sliderName)
		this.thumbs =  document.getElementsByClassName(obj.thumbName);
		this.len = this.sliders.length;
//		console.log(this.sliders,this.thumbs);
		this.click();
		
	}
	
	Slider.prototype = {
		click: function(){
			var len = this.len,
				sliders = this.sliders,
				thumbs = this.thumbs;
				
//			console.log(sliders,thumbs);
			for (var i = 0; i < len; i++) {
				(function(j){
					thumbs[j].onclick = function(){
						for (var k = 0; k < len; k++) {
							thumbs[k].className = 'thumb-item';
							sliders[k].className = 'slider-item';
						}
						this.className += ' active';
						sliders[j].className += ' focus';
					}
				})(i);
			}
		}
		
	}
	
	window.Slider = Slider;
	
	
	
})();





