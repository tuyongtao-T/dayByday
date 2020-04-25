/*实现new操作符的功能*/
function MyNew(fun, args) {
	/*这里是两种创建新对象并绑定原型属性的方法，没有区别*/
	let obj = {}; // => 1.创建一个新对象
	obj.__proto__ = fun.prototype; // => 2.新对象继承构造函数的原型  
	//			let obj = Object.create(fun.prototype); // =>  1.2   以fun的原型属性创建一个新对象
	let result = fun.apply(obj, args); //=> 3.改变原函数的this指向，是它指向新对象；如果函数有返回对象的话，用result来接收
	return result instanceof Object ? result : obj; //=> 4.返回新对象，如果原函数返回值是一个对象，则返回这个对象；
}

function Person(name, age) {
	this.name = name;
	this.age = age;
}
Person.prototype.sayName = function() {
	console.log(this.name);
}
let person1 = new Person('屠永涛', 25);
person1.sayName();

let person = MyNew(Person, ['屠永涛', '25']);
person.sayName(); // => 屠永涛
console.log(person); // => 这里测试两种创建新对象并绑定原型属性的区别