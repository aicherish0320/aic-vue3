import { hasChanged, isArray, isObject } from '@vue/shared'
import { track, trigger } from './effect'
import { reactive } from './reactive'

export function ref(value) {
  return createRef(value)
}
export function shallowRef(value) {
  return createRef(value, true)
}

const convert = (val) => (isObject(val) ? reactive(val) : val)

class RefImpl {
  private _value
  constructor(private rawValue, private isShallow) {
    this._value = isShallow ? rawValue : convert(rawValue)
  }

  get value() {
    track(this, 'get', 'value')
    return this._value
  }
  set value(newValue) {
    if (hasChanged(newValue, this.rawValue)) {
      this.rawValue = newValue
      this._value = this.isShallow ? newValue : convert(newValue)
      trigger(this, 'value', newValue, 'set')
    }
  }
}

function createRef(value, isShallow = false) {
  return new RefImpl(value, isShallow)
}

class ObjectRefImpl {
  constructor(private target, private key) {}
  get value() {
    return this.target[this.key]
  }
  set value(newValue) {
    this.target[this.key] = newValue
  }
}

export function toRef(target, key) {
  return new ObjectRefImpl(target, key)
}

export function toRefs(object) {
  const ret = isArray(object) ? new Array(object.length) : {}
  for (const key in object) {
    ret[key] = toRef(object, key)
  }
  return ret
}
