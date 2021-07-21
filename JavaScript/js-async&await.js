/* 
    // async函数对Generator函数的改进，体现在一下四点：
    1.内置执行器
        Generator函数的执行依靠执行器，而async函数自带执行器
    2.更好的语义
        async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果
    3.更广的适用性
        co模块约定，yield命令后面只能是Thunk函数或者Promise对象
        而async函数的await命令后面，可以是Promise对象和原始类型的值
    4.返回值是Promise
        async函数的返回值是Promise对象，Generato函数的返回值是Iterator对象
        

*/