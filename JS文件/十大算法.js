/*1.冒泡排序*/
function bubbleSort(ary) {
	let temp;
	for(let i = 0; i < ary.length - 1; i++) {
		for(let j = 0; j < ary.length - 1 - i; j++) {
			if(ary[j] > ary[j + 1]) {
				temp = ary[j];
				ary[j] = ary[j + 1];
				ary[j + 1] = temp;
			}
		}
	}
	return ary;
}

/*2.选择排序*/
			function selectSort (ary) {
				let minIndex,
					temp;
				for (var i = 0; i < ary.length-1; i++) {
					minIndex = i;
					for (var j = i+1; j < ary.length; j++) {
						if(ary[j]<ary[minIndex]){
							minIndex = j;
						}
					}
					temp = ary[i];
					ary[i] = ary[minIndex];
					ary[minIndex] = temp;
				}
				return ary;
			}