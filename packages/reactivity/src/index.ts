// 如果采用相对路径来进行打包，那么当前模块在打包的时候会将这个包打到自己的模块中
// import { VueShared } from '../../shared/src/index'
// console.log(VueShared)

import { VueShared } from '@vue/shared'

console.log(' >>> ', VueShared)

export const VueReactivity = 'VueReactivity 😄'
