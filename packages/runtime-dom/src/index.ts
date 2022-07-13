import { createRenderer } from '@vue/runtime-core'
import { extend } from '@vue/shared'
import { nodeOps } from './nodeOps'
import { patchProp } from './patchProp'

const renderOptions = extend({ patchProp }, nodeOps)

export function createApp(rootComponent, rootProps = null) {
  const app = createRenderer(renderOptions).createApp(rootComponent, rootProps)

  const { mount } = app
  app.mount = function (container) {
    container = nodeOps.querySelector(container)
    container.innerHTML = ''
    const proxy = mount(container)
    return proxy
  }

  return app
}
