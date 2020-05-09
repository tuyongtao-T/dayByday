;
(function() {
	Node.prototype.setElemStyles = function(obj) {
		for(var key in obj) {
			this.style[key] = obj[key];
		}
	}
})();