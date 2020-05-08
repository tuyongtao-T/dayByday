;
(function() {
	Node.prototype.getStyles = function() {
		var obj = {};
		for(var i = 0; i < arguments.length; i++) {
			if(window.getComputedStyle) {
				if(arguments[i]) {
					obj[arguments[i]] = window.getComputedStyle(this, null)[arguments[i]];
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