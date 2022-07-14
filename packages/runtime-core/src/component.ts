import { hasOwn, isFunction, isObject, ShapeFlags } from '@vue/shared'

export function createComponentInstance(vNode) {
  const instance = {
    vNode,
    data: {},
    attrs: {}, // 去掉用户使用的 props 之后的结果
    props: {}, // 用户写的 props
    slots: {},
    render: null,
    setupState: {},
    subTree: null, // 组件渲染的虚拟节点的结果
    isMounted: false,
    bc: null,
    m: null,
    ctx: {},
    proxy: {}
  }

  instance.ctx = { _: instance }

  return instance
}

const isStateFulComponent = (vNode) => {
  return vNode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT
}

function createContext(instance) {
  return {
    attrs: instance.attrs,
    slots: instance.slots,
    emit: () => {},
    expose: () => {}
  }
}

function finishComponentSetup(instance) {
  const Component = instance.vNode.type
  if (!instance.render) {
    if (!Component.render && Component.template) {
    }
    instance.render = Component.render
  }
}

function handleSetupResult(instance, setupResult) {
  if (isFunction(setupResult)) {
    instance.render = setupResult
  } else if (isObject(setupResult)) {
    instance.setupState = setupResult
  }
  finishComponentSetup(instance)
}

function setupStateFulComponent(instance) {
  const Component = instance.vNode.type
  instance.proxy = new Proxy(instance.ctx, {
    get({ _: instance }, key) {
      const { setupState, props, data } = instance
      if (hasOwn(setupState, key)) {
        return setupState[key]
      } else if (hasOwn(data, key)) {
        return data[key]
      } else if (hasOwn(props, key)) {
        return props[key]
      }
    },
    set({ _: instance }, key, value) {
      const { setupState, props, data } = instance
      if (hasOwn(setupState, key)) {
        setupState[key] = value
      } else if (hasOwn(data, key)) {
        data[key] = value
      } else if (hasOwn(props, key)) {
        props[key] = value
      }
      return true
    }
  })
  const { setup } = Component
  if (setup) {
    const ctx = createContext(instance)
    const setupResult = setup(instance.props, ctx)
    handleSetupResult(instance, setupResult)
  } else {
    finishComponentSetup(instance)
  }
}

export function setupComponent(instance) {
  const { props, children } = instance.vNode
  // initProps()
  // initSlot()
  const isStateFul = isStateFulComponent(instance.vNode)
  const setupResult = isStateFul ? setupStateFulComponent(instance) : undefined
}
