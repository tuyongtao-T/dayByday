;
(function() {
	Node.prototype.getElemStyles = function() {
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