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
