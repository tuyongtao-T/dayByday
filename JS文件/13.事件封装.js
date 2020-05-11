/*兼容性，DOM0级 DOM2级事件*/
function addEvent(elem, type, fn) {
	if(elem.addEventListener) {
		elem.addEventListener(type, fn, false)
	} else if(elem.attacthEvent) {
		elem.attachEvent('on' + type, function() {
			fn.call(elem);
		})
	} else {
		elem['on' + type] = fn;
	}
}

/*阻止事件冒泡*/
/*
 * e.stopPropagation()  W3C标准
 * e.cancelBubble = true  IE 
 * 
 * */
function addEvent(elem, type, fn) {
	if(elem.addEventListener) {
		elem.addEventListener(type, fn, false)
	} else if(elem.attacthEvent) {
		elem.attachEvent('on' + type, function() {
			fn.call(elem);
		})
	} else {
		elem['on' + type] = fn;
	}
}

/*阻止冒泡*/
function stopBubble(e) {
	return e.stopPropagation() ? e.stopPropagation() : e.cancelBubble = true;
}
MouseEvent.prototype.stopBubble = function() {
	return this.stopPropagation() ? this.stopPropagation() : this.cancelBubble = true;
}