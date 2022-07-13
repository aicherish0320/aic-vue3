// h 也会调用这个方法

import { isArray, isObject, isString, ShapeFlags } from '@vue/shared'

// h('div', {}, 'a', 'b')  h(App)
export function createVNode(type, props, children = null) {
  const shapeFlag = isString(type)
    ? ShapeFlags.ELEMENT
    : isObject(type)
    ? ShapeFlags.STATEFUL_COMPONENT
    : 0
  const vNode = {
    __v_isVNode: true,
    type,
    props,
    children,
    el: null,
    key: props && props.key,
    shapeFlag
  }
  normalizeChildren(vNode, children)

  return vNode
}

function normalizeChildren(vNode, children) {
  if (!children) {
  } else if (isArray(children)) {
    vNode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN
  } else {
    vNode.shapeFlag |= ShapeFlags.TEXT_CHILDREN
  }
}
