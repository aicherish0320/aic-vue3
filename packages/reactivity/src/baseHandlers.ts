import { extend, hasChanged, hasOwn, isArray, isInteger } from '@vue/shared'
import { track, trigger } from './effect'
import { reactive, readonly } from './reactive'

const get = createGetter()
const readonlyGet = createGetter(true)
const shallowGet = createGetter(false, true)
const shallowReadonlyGet = createGetter(true, true)

const set = createSetter()
const readonlySet = {
  set(target, key) {
    console.log(`cannot set on ${key}，readonly!!!`)
  }
}

function createGetter(isReadonly = false, isShallow = false) {
  return function get(target, key, receiver) {
    const ret = Reflect.get(target, key, receiver)
    if (!isReadonly) {
      track(target, 'get', key)
    }
    // 不需要递归
    if (isShallow) {
      return ret
    }

    // 懒代理，当取值的时候才进行代理
    return isReadonly ? readonly(ret) : reactive(ret)
  }
}
function createSetter() {
  return function set(target, key, value, receiver) {
    const oldValue = target[key]

    // 如果是新增也要触发更新
    let hadKey =
      isArray(target) && isInteger(key)
        ? key < target.length
        : hasOwn(target, key)

    const ret = Reflect.set(target, key, value, receiver)

    if (!hadKey) {
      trigger(target, key, value, 'add')
    } else if (hasChanged(oldValue, value)) {
      trigger(target, key, value, 'set')
    }

    return ret
  }
}

export const mutableHandlers = {
  get,
  set
}
export const shallowReactiveHandlers = {
  get: shallowGet,
  set
}
export const readonlyHandlers = extend(
  {
    get: readonlyGet
  },
  readonlySet
)
export const shallowReadonlyHandlers = extend(
  {
    get: shallowReadonlyGet
  },
  readonlySet
)
