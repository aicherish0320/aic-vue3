import { isObject } from '@vue/shared'
import {
  mutableHandlers,
  shallowReactiveHandlers,
  readonlyHandlers,
  shallowReadonlyHandlers
} from './baseHandlers'

const reactiveMap = new WeakMap()
const shallowReactiveMap = new WeakMap()
const readonlyMap = new WeakMap()
const shallowReadonlyMap = new WeakMap()

export function reactive(target: Object) {
  return createReactiveObject(target, mutableHandlers, reactiveMap)
}
export function shallowReactive(target: Object) {
  return createReactiveObject(
    target,
    shallowReactiveHandlers,
    shallowReactiveMap
  )
}
export function readonly(target: Object) {
  return createReactiveObject(target, readonlyHandlers, readonlyMap)
}
export function shallowReadonly(target: Object) {
  return createReactiveObject(
    target,
    shallowReadonlyHandlers,
    shallowReadonlyMap
  )
}

export function createReactiveObject(target, baseHandlers, proxyMap) {
  if (!isObject(target)) {
    return target
  }

  const existProxy = proxyMap.get(target)
  if (existProxy) {
    return existProxy
  }

  const proxy = new Proxy(target, baseHandlers)

  proxyMap.set(target, proxy)

  return proxy
}
