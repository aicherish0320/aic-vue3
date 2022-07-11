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
export function trigger(target, key, value) {
  const depsMap = targetMap.get(target)
  if (!depsMap) {
    return
  }
  const effects = depsMap.get(key) || []
  effects.forEach((effect) => effect())
}
