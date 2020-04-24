window.tyt = {
 	/*深拷贝*/
 	deepCopy: (object) => {
 		if(object && typeof(object) === "object") {
 			let newObject = Array.isArray(object) ? [] : {};
 			for(key in object) {
 				if(object.hasOwnProperty(key)) {
 					if(object[key] && typeof(object[key]) === "object") {
 						newObject[key] = arguments.callee(object[key]);
 					} else {
 						newObject[key] = object[key];
 					}
 				}
 			}
 			return newObject;
 		} else {
 			alert("您输入的不是一个对象或数组");
 		}
 	}
 }