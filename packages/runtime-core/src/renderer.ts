import { ShapeFlags } from '@vue/shared'
import { createAppAPI } from './apiCreateApp'
import { createComponentInstance, setupComponent } from './component'

export function createRenderer(renderOptions) {
  const patch = (n1, n2, container) => {
    const { shapeFlag } = n2

    if (shapeFlag & ShapeFlags.ELEMENT) {
    } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
      processComponent(n1, n2, container)
    }
  }

  const mountComponent = (n2, container) => {
    const instance = createComponentInstance(n2)

    setupComponent(instance)
  }

  const processComponent = (n1, n2, container) => {
    if (!n1) {
      // 初始化
      mountComponent(n2, container)
    } else {
      // 组件更新
    }
  }

  const render = (vNode, container) => {
    patch(null, vNode, container)
  }

  return {
    createApp: createAppAPI(render)
  }
}
