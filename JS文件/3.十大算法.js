/* 一.冒泡排序
 * 思想：
 * 1.两两比较，交换位置直到最后
 * 2.第一次循环找出最大的，第二次找出第二大的；
 * 3.外层循环用来找最大，第二大...
 * 4.内层循环用来两两比较交换位置
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
				temp = ary[j];
				ary[j] = ary[j + 1];
				ary[j + 1] = temp;
			}
		}
	}
	return ary;
}

/* 二.选择排序
 * 思想：
 * 1.设定一个最小索引，minIndex
 * 2.默认第一个数为最小的数,设置他的索引为0
 * 3.将后面的数以第一个数为基准，比较大小，两两比较时把小的数的索引记录到minIndex，
 * 4.内层循环完成，找到最小数索引，把他放在第一位，也就是和第一个数交换索引
 * 5.外层循环一次找到第二小的数的索引，然后交换位置。
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
 * 1.默认分为两个部分，已排序和未排序
 * 2.默认开始时，第一个数为已排序，且只有他自己一个数
 * 3.从未排序的部分拿出一个来，外层循环，一次往已排序部分插一个
 * 4.对插进来的数进行冒泡排序，利用两两比较思想，插到合适位置
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
				temp = ary[j];
				ary[j] = ary[j - 1];
				ary[j - 1] = temp;
			} else {
				break;
			}
		}
	}
	return ary;
}
