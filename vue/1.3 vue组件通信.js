/* 
    Vue组件间通信主要是指：父子组件通信、隔代组件通信、兄弟组件通信
    // 组件之间通信方式：

        1、props / $emit -- 适用于 父子组件通信
            父组件向子组件传值使用props
            子组件向父组件传值使用$emit()事件传递
        2、ref 与 $parent / $children -- 适用于 父子组件通信
            ref: 如果在普通的DOM元素上使用，引用指向的就是DOM元素，如果是在子组件上，引用就指向组件实例
            $parent / $children: 访问父/子实例
        3、EventBus($emit / $on) -- 适用于父子、隔代、兄弟组件通信
            这种方式是通过一个空的Vue实例作为中央事件总线(事件中心)，用它来触发事件和监听事件，从而实现任何组件间的通信
        4、$attrs / $listeners -- 适用于隔代组件通信
            $attrs: 包含了父作用域中不被prop说识别(且获取)的特性绑定(class金额style除外)。当一个组件没有声明任何prop时，这里会包含所有父作用域的绑定(class和style除外)，并且可用通过v-bind="$attrs"传入内部组件。通常配合inheritAttrs选项一起使用
            $listeners: 包含了父作用域中的(不含.native修饰器的)v-on事件监听器。它可以通过v-on="$listeners"传入内部组件
        5、provide / inject 适用于隔代组件通信
            祖先组件中通过provider来提供变量，然后在子孙组件中通过inject来注入变量
        6、Vuex -- 适用于父子、隔代、兄弟组件通信
            Vuex是一个专为vue.js应用程序开发的状态管理模式。每一个Vuex应用的核心就是store(仓库)
                Vuex的状态存储是响应式的。当Vue组件从store中读取状态的时候，若store中的状态发生变化，那么相应的组件也会相应的得到高效更新
                改变store中的状态的唯一途径就是显示地提交(commit)mutation。这样使得我们可以方便地跟踪每一个状态的变化
*/