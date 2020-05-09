
/*兼容性，DOM0级 DOM2级事件*/
function addEvent (elem,type,fn) {
	if (elem.addEventListener) {
		elem.addEventListener(type,fn,false)
	}else if(elem.attacthEvent){
		elem.attachEvent('on'+type,function(){
			fn.call(elem);
		})
	}else{
		elem['on'+type] = fn;
	}
}
