

/*数组形式*/
function elemChild(node){
	var arr = [],
		children = node.childNodes;
	for (var i = 0; i < children.length; i++) {
		var chlidItem = children[i];
		if (childItem.nodeType === 1) {
			arr.push(childItem);
		}
	}
	return arr;
}

/*类数组形式*/
function elemChild (node) {
	var obj = {
		'length': 0,
		'push': Array.prototype.push,
		'splice': Array.prototype.splice
	},
	children = node.childNodes;
	for (var i = 0; i < children.length; i++) {
		if(children[i].nodeType === 1){
//			obj[obj.length] = children[i];
//			obj.length++;
			obj.push(children[i]);
		}
	}
	return obj;
	
}