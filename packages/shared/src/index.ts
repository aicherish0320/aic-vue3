export const isObject = (val) => typeof val === 'object' && val !== null
export const isArray = (val) => Array.isArray(val)
export const isNumber = (val) => typeof val === 'number'
export const isFunction = (val) => typeof val === 'function'
export const isString = (val) => typeof val === 'string'
export const extend = Object.assign

export const hasOwn = (target, key) =>
  Object.prototype.hasOwnProperty.call(target, key)

export const hasChanged = (oldVal, val) => oldVal !== val

export const isInteger = (key) => parseInt(key) + '' === key

export const enum ShapeFlags {
  ELEMENT = 1, // 1 元素
  FUNCTIONAL_COMPONENT = 1 << 1, // 2 函数式组件
  STATEFUL_COMPONENT = 1 << 2, // 4 带状态的组件
  TEXT_CHILDREN = 1 << 3, // 8 内容是文本的孩子
  ARRAY_CHILDREN = 1 << 4, // 内容是数组的孩子
  SLOTS_CHILDREN = 1 << 5,
  TELEPORT = 1 << 6,
  SUSPENSE = 1 << 7,
  COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8,
  COMPONENT_KEPT_ALIVE = 1 << 9,
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT
}
