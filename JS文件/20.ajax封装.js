function myAjax (obj) {
	var xhr,
		timer,
		dataStr = datatoStr(obj.data);
		
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else{
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	
	if (obj.type.toLowerCase() === 'get') {
		xhr.open('GET',obj.url + '?' + dataStr,true);
		xhr.send();
	} else{
		xhr.open('POST',obj.url,true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(dataStr);
	}
	
	xhr.onreadystatechange = function() {
		if(xhr.readyState === 4) {
			if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
				obj.fnS(xhr)
			} else {
				console.log("错误码" + xhr.status);
			}
		}
	}
	
	if (obj.timeout) {
		setInterval(function(){
			xhr.abort();
			clearInterval(timer);
		},obj.timeout);
	}
	
}

function datatoStr(data){
	var arr = [];
	data.t = new Date().getTime();
	for(key in data){
		arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
	}
	return arr.join('&');
}
