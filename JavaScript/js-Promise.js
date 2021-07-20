/* 
    常见 Promise 面试题
*/
/* 
    // promiseh基本规则：
    1.首先promise构造函数会立即执行，而promise.then()内部的代码在当次事件循环的结尾立即执行（微任务）
    2.promise的状态一旦由等待pending变为成功fulfilled或者失败rejected，那么当前promise被标记为完成，后面则不会再次改变该状态
    3.resolve函数和reject函数都将当前promise状态改为完成，并将异步结果，或者错误结果当做参数返回
    4.Promise.resolve(value)
    5.Promise.all() / Promise.race()
        简单理解，这两个函数是将接受到的promise列表结果返回，
        区别是，all是等待所有的promise都触发成功了，才会返回，
        而race有一个成功了就会返回结果，其中任何一个promise执行失败了都会直接返回失败的结果。
    6.promise对象的构造函数只会调用一次，then方法和catch方法都能多次调用，但一旦有了确定的结果，再次调用就会直接返回结果。
*/

/* 
    // 简单介绍下Promise:
    Promise是异步编程的一种解决方案，比传统的解决方案（回调函数和事件）更合理和更强大。
    它由社区最早提出和实现，ES6将其写进了语言标准，统一了用法，原生提供了Promise对象。
    有了Promise对象，就可以将异步编程操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。
    此外，Promise对象提供了统一的接口，使得控制异步操作更加容易，

*/

/* 
    // Promise解决了什么问题？
    回调地狱问题
        -- 什么是回调地狱？ 就是指把函数作为参数尺寸层层嵌套请求，这样层层嵌套，称之为回调地狱，代码阅读性非常差

    有其他方法解决吗？
        1.setTimeout：缺点不精确，只是确保在一定时间后加入到任务队列，并不保证立马执行。只有执行引擎栈中的代码执行完毕，主线程才会去读取任务队列
        2.事件监听：任务的执行不取决于代码的顺序，而取决于某个事件是否发生
        3.Generator函数虽然将异步操作表示得很简洁，但是流程管理却不方便（即何时执行第一阶段、何时执行第二阶段）。即如何实现自动化的流程管理
        4.async/await
*/

/* 
    // Promise有什么缺点
    1.无法取消Promise，一旦新建它就会立即执行，无法中途取消
    2.如果不设置回调函数，Promise内部抛出的错误，不会反应到外部
    3.当处于pending状态时，无法得知目前进展到哪一个阶段，是刚刚开始还是即将完成

    正是因为这些原因，ES7引入了async/await来处理异步
*/

/* 
    // promise和async/await区别
    1.promise是ES6, async/await是ES7
    2.async/await相对于promise来讲，写法更加优雅
    3.reject状态：
        1)promise错误可以通过catch来捕捉，建议尾部捕获错误
        2)async/await既可以用.then又可以用try-catch捕捉
*/