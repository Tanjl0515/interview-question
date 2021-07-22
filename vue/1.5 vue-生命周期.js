/* 
    // 谈谈你对Vue生命周期的理解

    生命周期是什么？
        Vue实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模板、挂载Dom -> 渲染 、更新 -> 渲染、卸载等一系列过程，我们称这是Vue的生命周期

    各个生命周期的作用：
        beforeCreate：组件实例被创建之初，组件的属性生效之前
        create：组件实例已经完全创建，属性也绑定，但真实DOM还没有生成，$el还不可用
        beforeMount：在挂载开始之前被调用，相关的render函数首次被调用
        mount：el被新创建的vm.$el替换，并挂载到实例上去之后调用该钩子
        beforeUpdate：组件更新数据之前调用，发生在虚拟DOM打补丁之前
        update：组件数据更新之后
        // activited：keep-alive专属，组件被激活是调用
        // deactivated：keep-alive专属，组件被销毁时调用
        beforeDestory：组件销毁前调用，这时候实例仍然完全可用
        destoryed：组件销毁后调用，调用后，Vue实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁
*/