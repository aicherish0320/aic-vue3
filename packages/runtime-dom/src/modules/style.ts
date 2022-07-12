export function patchStyle(el, prevVal, nextVal) {
  const style = el.style
  if (!nextVal) {
    el.removeAttribute(style)
  } else {
    if (prevVal) {
      for (const key in prevVal) {
        if (!nextVal[key]) {
          style[key] = ''
        }
      }
    }
    for (const key in nextVal) {
      style[key] = nextVal[key]
    }
  }
}
