/* 由于排序算法中经常用到交换位置的方法
 * 这里封装一个函数用来交换位置
 * */
function exch (ary,prev,next) {  //这里后两个按参数的位置没有要求
	let temp = ary[prev];
	ary[prev] = ary[next];
	ary[next] = temp;
}

/* 一.冒泡排序
 * 思想：
 * 1. 两两比较，交换位置直到最后
 * 2. 第一次循环找出最大的，第二次找出第二大的；
 * 3. 外层循环用来找最大，第二大...
 * 4. 内层循环用来两两比较交换位置
 * 
 * 时间复杂度：最好的情况是O(n),此时内层循环不做位置交换（顺序数组的情况）,
 * 	      最坏的情况是O(n^2)，（逆序数组的情况，内层循环每次都要做位置交换）；
 * 空间复杂度：占用的内存，O(1)
 * */
function bubbleSort(ary) {
	let temp;
	for(let i = 0; i < ary.length; i++) { //这里做外层循环，第一次找最大，第二次找第二大...
		for(let j = 0; j < ary.length - i - 1; j++) {
			if(ary[j] > ary[j + 1]) { //这里是两两交换位置的循环
//				temp = ary[j]; 
//				ary[j] = ary[j + 1];
//				ary[j + 1] = temp;
				exch(ary,j,j+1);
			}
		}
	}
	return ary;
}

/* 二.选择排序
 * 思想：
 * 1. 设定一个最小索引，minIndex
 * 2. 默认第一个数为最小的数,设置他的索引为0
 * 3. 将后面的数以第一个数为基准，比较大小，两两比较时把小的数的索引记录到minIndex，
 * 4. 内层循环完成，找到最小数索引，把他放在第一位，也就是和第一个数交换索引
 * 5. 外层循环一次找到第二小的数的索引，然后交换位置。
 * 
 * 时间复杂度：最好的情况是O(n^2);最坏的情况是O(n^2)
 * 空间复杂度：占用的内存，O(1)
 * */
function selectSort(ary) {
	let temp,
		minIndex;
	for(let i = 0; i < ary.length; i++) {
		minIndex = i;
		for(let j = i + 1; j < ary.length; j++) {
			if(ary[j] < ary[minIndex]) {
				minIndex = j;
			}
		}
		temp = ary[minIndex];
		ary[minIndex] = ary[i];
		ary[i] = temp;
	}
	return ary;
}

/* 三.插入排序
 * 1. 默认分为两个部分，已排序和未排序
 * 2. 默认开始时，第一个数为已排序，且只有他自己一个数
 * 3. 从未排序的部分拿出一个来，外层循环，一次往已排序部分插一个
 * 4. 对插进来的数进行冒泡排序，利用两两比较思想，插到合适位置
 * 
 * 时间复杂度：最好的情况是O(n),此时内层循环不做位置交换（顺序数组的情况）,
 * 		         最坏的情况是O(n^2)，（逆序数组的情况，内层循环每次都要做位置交换）；
 * 空间复杂度：占用的内存，O(1)
 * */
function inserSort(ary) {
	let temp;
	for(let i = 1; i < ary.length; i++) {
		for(let j = i; j > 0; j--) {
			if(ary[j] < ary[j - 1]) {
//				temp = ary[j];
//				ary[j] = ary[j - 1];
//				ary[j - 1] = temp;
				exch(ary,j,j-1);
			} else {
				break;
			}
		}
	}
	return ary;
}

/* 四.希尔排序
 * 1. 确定一个初始读：h，对数组进行分组，然后h递减 ，结束的标志位h=1
 * 2. 在每一个h下对分组的数组进行插入排序
 * 
 * 时间复杂度： O(n(logn)^2)
 * 空间复杂度：占用的内存，O(1)
 * */
function shellSort (ary) {
	let h = 1;
	while(h < ary.length/2){ // 这一步是找到初试度 h
		h = 2*h + 1;   // 这里寻找初始读有规则的
	}
	while (h >= 1){  // 开始在每一个度下进行插入排序
		for (let i = h; i < ary.length; i++) {  // 找到待插入的数
			for (let j = i; j >= h; j -= h) {   //这里是插入排序的思想，只不过间隔是度 h
				if (ary[j] < ary[j-h]) {
//							temp = ary[j];
//							ary[j] = ary[j - h];
//							ary[j - h] = temp;
					exch(ary,j,j-h);
				}else{
					break;
				}
			}
		}
		/*这是度的一个递减规则*/
		h = Math.floor(h/2);  // => 这里注意要用向下取整
	}
	return ary;
}