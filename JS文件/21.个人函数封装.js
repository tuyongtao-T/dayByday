// 1. 利用childNodes获取子元素children => childElement
;
(function() {
	Node.prototype.getChildElements = function() {
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

// 2. 