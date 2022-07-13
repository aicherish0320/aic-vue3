import { createVNode } from './vNode'

export function createAppAPI(render) {
  return (rootComponent, rootProps) => {
    const app = {
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      use() {},
      mixin() {},
      component() {},
      mount(container) {
        // h 方法
        const vNode = createVNode(rootComponent, rootProps)
        render(vNode, container)

        app._container = container
      }
    }
    return app
  }
}
