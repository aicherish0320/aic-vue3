import { patchAttr } from './modules/attr'
import { patchClass } from './modules/class'
import { patchEvent } from './modules/event'
import { patchStyle } from './modules/style'

export const patchProp = (el, key, prevVal, nextVal) => {
  switch (key) {
    case 'class': // el.className
      patchClass(el, nextVal)
      break
    case 'style': // el.style.color
      patchStyle(el, prevVal, nextVal)
      break
    default:
      if (/^on[a-z]/.test(key)) {
        // el.addEventListener
        patchEvent(el, nextVal)
      } else {
        // el.setAttribute()
        patchAttr(el, key, nextVal)
      }
  }
}
