import { createAppAPI } from './apiCreateApp'

export function createRenderer(renderOptions) {
  const patch = (n1, n2, container) => {}

  const render = (vNode, container) => {
    console.log('vNode >>> ', vNode, container)
    patch(null, vNode, container)
  }

  return {
    createApp: createAppAPI(render)
  }
}
