/* 
    // 你使用过Vuex吗？

    Vue是一个专为vue.js应用程序开发的状态管理模式。每一个Vuex应用的核心就是store。
    (1) Vuex的状态存储是响应式的。当Vuex组件从store中读取状态的时候，如store中的状态发生变化，那么相应的组件也会相应的得到高效的更新
    (2) 改变store中的状态的唯一途径就是显示地提交(commit)mutation。这样使得我们可以方便的跟踪每一个状态的变化

    主要包含以下几个模块：
        Store: 定义了应用状态的数据结构，可以在这里设置默认的初始状态
        Getter: 允许组件从store中获取数据，mapGetters辅助函数仅仅是将store中的getter映射到局部计算属性
        Mutation: 是唯一更改store中状态的方法，且必须是同步函数
        Action: 用于提交mutation，而不是直接变更状态，可以包含任意异步操作
        Module: 允许将单一的Store拆分为多个store且同时保存在单一的状态数中
*/