export function patchClass(el, nextVal) {
  if (!nextVal) {
    nextVal = ''
  }
  el.className = nextVal
}
