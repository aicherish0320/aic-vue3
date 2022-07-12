export function patchAttr(el, key, nextVal) {
  if (!nextVal) {
    el.removeAttribute(key)
  } else {
    el.setAttribute(key, nextVal)
  }
}
