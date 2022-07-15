import { effect } from '@vue/reactivity'
import { ShapeFlags } from '@vue/shared'
import { createAppAPI } from './apiCreateApp'
import { createComponentInstance, setupComponent } from './component'

export function createRenderer(renderOptions) {
  const patch = (n1, n2, container) => {
    const { shapeFlag } = n2

    if (shapeFlag & ShapeFlags.ELEMENT) {
      processElement(n1, n2, container)
    } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
      processComponent(n1, n2, container)
    }
  }

  const {
    insert,
    patchProp,
    remove,
    createElement,
    createText,
    setText,
    setElementText
  } = renderOptions

  const mountChildren = (children, container) => {
    for (let i = 0; i < children.length; i++) {
      patch(null, children[i], container)
    }
  }

  const mountElement = (n2, container) => {
    const { props, type, children, shapeFlag } = n2
    const el = (n2.el = createElement(type))
    if (props) {
      for (const key in props) {
        patchProp(el, key, null, props[key])
      }
    }

    if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      setElementText(el, children)
    } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      mountChildren(children, el)
    }

    insert(el, container)
  }

  const processElement = (n1, n2, container) => {
    if (!n1) {
      // 元素的初始化
      mountElement(n2, container)
    } else {
      // 元素的 diff
    }
  }

  const mountComponent = (n2, container) => {
    const instance = createComponentInstance(n2)

    setupComponent(instance)

    setupRenderEffect(instance, container)
  }

  const setupRenderEffect = (instance, container) => {
    instance.update = effect(
      () => {
        if (!instance.isMounted) {
          // 初渲染

          const subTree = (instance.subTree = instance.render.call(
            instance.proxy,
            instance.proxy
          ))

          patch(null, subTree, container)

          instance.isMounted = true
        } else {
          // 更新
          let prevSubTree = instance.subTree
          let nextSubTree = instance.render.call(instance.proxy, instance.proxy)

          // patch(prevSubTree, nextSubTree, container)
        }
      },
      {
        scheduler(effect) {
          console.log('effect >>> ', effect)
        }
      }
    )
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
