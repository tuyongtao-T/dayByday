let CheckObject = function() {};
/*
 * 这是在原型上添加方法,这里会出现一个问题，就是原型对象上没有构造函数，这个算是重写了对象
 * 这里有问题需要解决，下次看到这部分内容来添加上
 * */
Chain.prototype = { 
	checkName: function() {
		console.log('检查名字完成');
		return this;//关键在于这里的return this，返回的还是这个引用对象
	},
	checkTel: function() {
		console.log('检查电话完成');
		return this;
	},
	checkEmail: function() {
		console.log('检查邮件完成');
		return this;
	}
}
let chain = new CheckObject();
chain.checkName().checkTel();