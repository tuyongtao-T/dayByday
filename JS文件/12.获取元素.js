
/*只能单独获取一个元素，无法进行链式*/
function getElem(str) {
	var firstStr = str.charAt(0),
		otherStr = str.slice(1);
	switch(firstStr) {
		case '#':
			var obj = document.getElementById(otherStr);
			return obj;
			break;
		case '.':
			var obj = document.getElementsByClassName(otherStr);
			return obj;
			break;
		default:
			var obj = document.getElementsByTagName(str);
			return obj;
	}
}