function ajax (URL,fnSuccess,fnFail) {
	var xhr;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else{
		xhr = new ActiveXObject("Microsoft.XMTHTTP");
	}
	xhr.open('GET',URL+"?t="+new Data().getTime(),true);
	xhr.send();
	xhr.onreadystatechange = function(){
		if (xhr.readyState === 4) {
			if (xhr.status >= 200 && xhr.status <300 || xhr.status === 304) {
				fnSuccess(xhr.responseText);
			} else{
				fnFail();
			}
		}
	}
}
