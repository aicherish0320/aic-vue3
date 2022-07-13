export function patchEvent(el, key, nextVal) {
  const invokers = el._vei || (el._vei = {})
  const exists = invokers[key]

  if (exists && nextVal) {
    exists.value = nextVal
  } else {
    const eventName = key.slice(2).toLowerCase()

    if (nextVal) {
      const fn = (invokers[key] = createInvoker(nextVal))
      el.addEventListener(eventName, fn)
    } else {
      el.removeEventListener(eventName, exists)
    }
  }
}

function createInvoker(fn) {
  const invoker = (e) => invoker.value(e)
  invoker.value = fn
  return invoker
}
