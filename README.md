# Vue2 和 Vue3 区别

- Vue3 最主要的特点是 小 和 快
- 移除了 Vue2 中不常用的内容（过滤器），组件 Vue3 可以按需打包，借助了 rollup 可以支持函数的 treeShaking
- 快：proxy，
  - defineProperty，递归和重写
  - proxy，不需要重写属性，而且不用一上来就默认递归
- 整体 vue3 架构发生了变化
- Vue3 对编译时的内容，进行了重写 template -> render 函数 静态编辑还有属性标记 patchFlag 动态标记、静态提升、函数缓存、Vue3 使用了最长子序列重写了 diff 算法。vue3 template 中 blockTree 的概念
