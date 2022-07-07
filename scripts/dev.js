const fs = require('fs')
const execa = require('execa')

const target = 'reactivity'

async function build(target) {
  return execa('rollup', ['-cw', '--environment', 'TARGET:' + target], {
    stdio: 'inherit'
  })
}
build(target)
