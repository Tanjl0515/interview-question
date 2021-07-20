// 原型链继承 -- 利用原型链的特点继承
function Parent () {
	this.name = 'web前端';
	this.type = ['JS', 'HTML', 'CSS'];
}
Parent.prototype.say = function() {
	console.log(this.name);
}
function Son() {};
Son.prototype = new Parent();
let son1 = new Son();
son1.say();
/* 
    1.创建一个Parent的构造函数，里面有两个属性name, type
    2.通过Parent构造函数的属性（即原型对象）设置say方法，此时Parent有2个属性和1个方法
    3.创建一个叫Son的构造函数
    4.设置Son的属性（即原型对象）值为构造函数Parent的实例对象，即构造函数Son继承了构造函数Parent，此时Son也有2个属性和1个方法
    5.对Son构造函数进行实例化，结果赋值给变量son1，即son1为实例对象，同样拥有2个属性和1个方法
    6.输出son1的say方法，结果为 "web前端"

    优点：容易实现，父类新增原型属性和方法，子类都能访问到
    缺点：1.构造函数原型上的属性在所有该构造函数构造的实例上是共享的，即属性没有私有化，原型上属性的改变会作用到所有的实例上
          2.Son构造函数实例化对象无法进行参数的传递
          3.无法实现多继承
*/

// 构造函数继承 -- 通过构造函数call方法进行继承
function Parent () {
	this.name = 'web前端';
	this.type = ['JS', 'HTML', 'CSS'];
}
function Son() {
    Parent.call(this);
};
let son1 = new Son();
son1.type.push('VUE');
console.log(son1.type); //['JS','HTML','CSS','VUE']
let son2 = new Son();
console.log(son2.type); //['JS','HTML','CSS']
/* 
    1.创建父级构造函数Parent，有name、type两个属性
    2.创建子级构造函数Son，函数内部通过call方法调用父级构造函数Parent，实现继承
    3.分别创建构造函数Son的两个实例化对象son1、son2，对son1的type属性新增元素，son2没有新增，结果不一样，说明实现了独立

    优点：1.实现实例化对象的独立性(属性的私有化)
          2.还可以给实例化对象添加参数
         function Son(name) {
             Parent.call(this, name);
         };
         son1 = new Son('JS');
         console.log(son1);//JS
         son2 = new Son('HTML');
         console.log(son2);//HTML
    缺点：1.方法都在构造函数中定义，每次实例化对象都得创建一遍方法，基本无法实现函数复用
         2.call方法仅仅调用了父级构造函数的属性及方法，没有办法调用父级构造函数原型对象的方法
*/

// 组合继承 -- 利用原型链继承和构造函数继承的各自优势进行组合使用
function Parent () {
    this.name = name;
    this.type = ['JS','HTML','CSS'];
}
Parent.prototype.Say=function(){
    console.log(this.name);
}
function Son(name){
    Parent.call(this,name);
}
Son.prototype = new Parent();
son1 = new Son('张三');
son2 = new Son('李四');
son1.type.push('VUE');
son2.type.push('PHP');
console.log(son1.type);//['JS','HTML','CSS','VUE']
console.log(son2.type);//['JS','HTML','CSS','PHP']
son1.Say();//张三
son2.Say();//李四
/* 
    1.创建一个叫Parent的构造函数，里面有两个属性name,type
    2.通过Parent构造函数的属性（即原型对象）设置Say方法，此时，Parent有2个属性和1个方法
    3.创建子级构造函数Son，函数内部通过call方法调用父级构造函数Parent,实现继承
    4.子级构造函数Son继承了父构造函数Parent，此时Son也有2个属性和1个方法
    5.分别创建构造函数Son的两个实例化对象son1、son2，传不同参数，给type属性新增不同元素，调用原型对象Say方法

    优点：1.利用原型链继承，实现原型对象方法的继承
          2.利用构造函数继承，实现属性的继承，而且可以传参
    缺点：无论什么情况下，都会调用两次父级构造函数：一次是在创建子级原型的时候，另一次是在子级构造函数内部
*/

// 原型式继承 -- 创建一个原型，将参数作为一个对象的原型对象
function fun(obj) {
    function Son() {  };
    Son.prototype = obj;
    return new Son();
}
let parent = {
    name: '张三'
}
let son1 = fun(parent);
let son2 = fun(parent);
console.log(son1);
console.log(son2);
/* 
    1.创建一个函数fun,内部定义一个构造函数Son
    2.将Son的原型对象设置为参数，参数是一个对象，完成继承
    3.将Son实例化后返回，即返回的是一个实例化对象

    优点：不在执行和建立fun的实例
    缺点：跟原型链类似
*/

// 寄生继承 -- 在原型式继承的基础上，在函数内部丰富对象
function fun(obj) {  
    function Son() {  };
    Son.prototype = obj;
    return new Son();
}
// 继承
function inherit(obj) {  
    let clone = fun(obj);
    clone.Say = function() {
        console.log('我是新增的方法');
        return clone;
    }
}
let parent = {
    name: '张三'
}
let parent1 = inherit(parent);
let parent2 = inherit(parent);
console.log(parent2.Say == parent1.Say); // false
/* 
    1.在原型式继承的基础上，封装一个inherit函数
    2.将fun函数返回的对象进行增强，新增Say方法，最后返回
    3.调用inherit函数两次，分别赋值给变量parent1、parent2
    4.对比parent1、parent2，结果为fales，实现独立

    优缺点：跟构造函数继承类似，调用一次函数就得创建一遍方法，无法实现函数复用，效率较低
*/

// 寄生组合继承 -- 利用组合继承和寄生继承各自优势
function inherit(son,parent) {
    var clone = Object.create(parent.prototype);//创建对象
    son.prototype = clone;   //指定对象
    clone.constructor = son;   //增强对象
}
function Parent(name){
    this.name = name;
    this.type = ['JS','HTML','CSS'];
}
Parent.prototype.Say=function(){
    console.log(this.name);
}
function Son(name){
    Parent.call(this,name);
}
inherit(Son,Parent);
son1 = new Son('张三');
son2 = new Son('李四');
son1.type.push('VUE');
son2.type.push('PHP');
console.log(son1.type);//['JS','HTML','CSS','VUE']
console.log(son2.type);//['JS','HTML','CSS','PHP']
son1.Say();//张三
son2.Say();//李四
/* 
    1.封装一个函数inherit，两个参数，参数1为子级构造函数，参数2为父级构造函数
    2.利用Object.create()，将父级构造函数原型克隆为副本clone
    3.将该副本作为子级构造函数的原型
    4.给该副本添加constructor属性，因为③中修改原型导致副本失去默认的属性

    优缺点：组合继承优点、寄生继承的有点，目前JS继承中使用的都是这个继承方法
*/


// ES6 中的class继承
/* 
    ES6中引入了class关键字，class可以通过extends关键字实现继承，还可以通过static关键字定义类的静态方法,这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。

    ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this。

    需要注意的是，class关键字只是原型的语法糖，JavaScript继承仍然是基于原型实现的。
*/

class Person {
    //调用类的构造方法
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    //定义一般的方法
    showName() {
        console.log("调用父类的方法")
        console.log(this.name, this.age);
    }
}
let p1 = new  Person('kobe', 39)
console.log(p1)
//定义一个子类
class Student extends Person {
    constructor(name, age, salary) {
        super(name, age)//通过super调用父类的构造方法
        this.salary = salary
    }
    showName() {//在子类自身定义方法
        console.log("调用子类的方法")
        console.log(this.name, this.age, this.salary);
    }
}
let s1 = new Student('wade', 38, 1000000000)
console.log(s1)
s1.showName()

/* 
    优点：语法简单易懂,操作更方便
    缺点：并不是所有的浏览器都支持class关键字
*/