// 一、原型、原型链相等关系理解
/* 
    每一个实例对象都有一个__proto__属性（隐式原型），在js内部用来查找原型链；
    每一个构造函数都要prototype属性（显示原型），用来显示修改对象的原型，实例.__proto__ = 构造函数.prototype = 原型。
    原型链的特点就是：通过实例.__proto__查找原型上的属性，从子类一直向上查找对象原型的属性，继而形成一个查找链，即原型链。
*/

/* 
    1.js分为函数对象和普通对象，每个对象都有__proto__属性，但是只有函数对象才有prototype属性
    2.Object、Function都是js内置的函数，类似的还有Array、RegExp、Date、Boolean、Number、String
    3.属性__proto__是一个对象，它有两个属性，constructor和__proto__
    4.原型对象prototype有一个默认的constructor属性，用于记录实例是由哪个构造函数创建
*/

// 构造函数
function Person(name, age) {  
    this.name = name;
    this.age = age;
}
// 给Person原型上添加属性
Person.prototype.motherland = 'china';
// 创建实例
let person1 = new Person('小明', 18);
// 原型对象（即Person.prototype）的constructor指向构造函数本身
Person.prototype.constructor == Person;
// 实例（即person1）的__proto__和原型对象指向同一个地方
person1.__proto__ == Person.prototype;


// 从上方 function Foo() 开始分析这一张经典之图
function Foo()
let f1 = new Foo();
let f2 = new Foo();

f1.__proto__ = Foo.prototype; // 准则2
f2.__proto__ = Foo.prototype; // 准则2
Foo.prototype.__proto__ = Object.protitype; // 准则2 (Foo.prototype本质也是普通对象，可适用准则2)
Object.prototype.__proto__ = null; // 原型链到此停止
Foo.prototype.constructor = Foo; // 准则1
Foo.__proto__ = Function.prototype; // 准则2
Function.prototype.__proto__  = Object.protitype; //  准则2 (Function.prototype本质也是普通对象，可适用准则2)
Object.prototype.__proto__ = null; // 原型链到此停止
// **此处注意Foo 和 Function的区别， Foo是 Function的实例**

// 从中间 Function Object()开始分析这一张经典之图
Function Object()
let o1 = new  Object();
let o2 = new  Object();

o1.__proto__ = Object.prototype; // 准则2
o2.__proto__ = Object.prototype; // 准则2
Object.prototype.__proto__ = null; // 原型链到此停止
Object.prototype.constructor = Object; // 准则1
Object.__proto__ = Function.prototype // 准则2 (Object本质也是函数)；
// 此处有点绕，Object本质是函数，Function本质是对象
Function.prototype.__proto__ =  Object.prototype; // 准则2 (Function.prototype本质也是普通对象，可适用准则2)
Object.prototype.__proto__ = null; // 原型链到此停止

// 从下方 Function Function()开始分析这一张经典之图
Function Function()
Function.__proto__ = Function.prototype // 准则2
Function.prototype.constructor = Function; // 准则1
