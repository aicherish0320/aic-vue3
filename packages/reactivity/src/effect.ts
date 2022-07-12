import { isArray, isInteger } from '@vue/shared'

export function effect(fn, options: any = {}) {
  const effect = createReactiveEffect(fn, options)

  if (!options.lazy) {
    effect()
  }
  return effect
}

let uid = 0
let activeEffect
function createReactiveEffect(fn, options) {
  // 可以把 effect 理解为 watcher
  const effect = function () {
    activeEffect = effect
    fn()
    activeEffect = null
  }

  effect.id = uid++
  effect._isEffect = true
  effect.raw = fn
  effect.deps = []
  effect.options = options

  return effect
}

const targetMap = new WeakMap()
export function track(target, type, key) {
  if (!activeEffect) {
    return
  }

  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect)
  }
}
export function trigger(target, key, value, type) {
  const depsMap = targetMap.get(target)
  if (!depsMap) {
    return
  }

  const effectsQueue = new Set()
  const add = (effectsToAdd) => {
    if (effectsToAdd) {
      effectsToAdd.forEach((effect) => effectsQueue.add(effect))
    }
  }

  // 这种情况是 effect 中取了 arr[2] 在修改中，arr.length = 1
  if (isArray(target) && key === 'length') {
    depsMap.forEach((dep, depKey) => {
      if (depKey === 'length' || value < depKey) {
        // dep.forEach((effect) => effect())
        add(dep)
      }
    })
  } else {
    // 新增逻辑
    if (type === 'add') {
      if (isArray(target) && isInteger(key)) {
        // const effects = depsMap.get('length')
        // effects.forEach((effect) => effect())
        add(depsMap.get('length'))
      }
    } else {
      // const effects = depsMap.get(key) || []
      // effects.forEach((effect) => effect())
      add(depsMap.get(key))
    }
  }

  effectsQueue.forEach((effect: any) => effect())
}
