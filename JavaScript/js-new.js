// js的new操作符到底做了什么？

/* 
    // 做了什么？
    1.创建了一个空的js对象
    2.将空对象的原型prototype指向构造函数的原型
    3.将空对象作为构造函数的上下文（改变this指向）
    4.对构造函数有返回值的判断
*/

// 怎么实现
/**
 * [create description] create 函数要接受不定量的参数，第一个参数是构造函数（也就是new操作符的目标函数），其余参数被构造函数使用。
 *
 * @param   {[type]}  Con   [Con description]
 * @param   {[type]}  args  [args description]
 *
 * @return  {[type]}        [return description]
 */
function create(Con, ...args) {  
    // 1.创建一个空的对象
    let obj = {}; // let obj = Object.create({});
    // 2.将空对象的原型prototype指向构造函数是原型
    Object.setPrototypeOf(obj, Con.prototype); // obj.__proto__ =  Con.prototype
    // 3.改变构造函数的上下文（this），并将剩余的参数传入
    let result = Con.apply(obj, args);
    // 4.在构造函数有返回值的情况经行判断
    return result instanceof Object ? result : obj;
}

/* 
    结论；
        在new的时候，会对构造函数的返回值做一些判断：
            1.如果返回值是基础数据类型，则忽略返回值
            2.如果返回值是引用数据类型，则使用return的返回，也就是new操作符无效
*/