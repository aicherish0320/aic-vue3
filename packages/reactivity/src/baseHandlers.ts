import { extend } from '@vue/shared'
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
    const ret = Reflect.set(target, key, value, receiver)
    console.log('set >>> ', key, value)
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
