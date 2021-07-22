/* 
    // Vue.js 数据双向绑定原理
    所谓双向数据绑定，无非就是数据层和视图层中的数据同步，在写入数据时，视图层实时的跟着更新。

    Vue.js 2.0 采用数据劫持(Proxy模式)结合发布者-订阅者模式(PubSub模式)的方法，通过Object.defineProperty()来劫持各个属性的setter、getter，
    在数据变动时发布消息给订阅者，触发相应的监听回调。

    // 每个组件实例都有相应的watcher程序实例，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的setter被调用时，会通知watcher重新计算，从而致使它关联的组件得以更新。

    Vue.js 3.0 放弃了Object.defineProperty()，使用ES6的Proxy（访问对象拦截器，也称代理器）

    // 步骤：
    //     1.实现一个数据监听器Observer，能够对数据对象的所有属性进行监听，如有变动可以拿到最新值并通知订阅者
    //     2.实现一个指令解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数
    //     3.实现一个Watcher，作为Observer和Compild的桥梁，能够订阅并接收到每个属性的通知，执行指令绑定的相应回调函数，从而更新视图
    //     4.MVVM入口函数，整合以上三者

    具体步骤：
        1.实现一个数据监听器Observer: 对数据对象进行递归遍历，包括子属性对象的属性，利用Object.defineProperty()对属性都加上setter和getter，这样的话，给这个对象的某个值赋值，就会触发setter，那么就能监听到数据变化
        2.实现一个指令解析器Compile: 解析Vue模板指令，将模板中的变量替换成数据，然后初始化渲染河面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新
        3.实现一个订阅者Watcher: Watcher订阅者是Observer和Compile之间通信的桥梁，主要的任务是订阅Observer中的属性值变换的消息，当收到属性值变化的消息时，出发Compile中对应的更新函数
        4.实现一个订阅器Dep: 订阅器采用发布-订阅设计模式，用来收集订阅者Watcher，对监听器Observer和订阅者Watcher进行统一管理
*/