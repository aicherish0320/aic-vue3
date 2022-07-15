import { isArray, isObject } from '@vue/shared'
import { createVNode } from './vNode'

export function h(type, propsOrChildren, children) {
  const l = arguments.length
  if (l === 2) {
    if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
      // 属性
      return createVNode(type, propsOrChildren)
    } else {
      return createVNode(type, null, propsOrChildren)
    }
  } else {
    if (l === 3) {
      return createVNode(type, propsOrChildren, children)
    } else if (l > 3) {
      return createVNode(type, propsOrChildren, Array.from(arguments).slice(2))
    }
  }
}
