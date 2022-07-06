const fs = require('fs')
const execa = require('execa')

const targets = fs.readdirSync('packages').filter((item) => {
  return fs.statSync(`packages/${item}`).isDirectory()
})

runAll(targets).then(() => {
  console.log('打包完成啦，😄')
})

function runAll(targets) {
  const results = []
  for (const target of targets) {
    results.push(build(target))
  }
  return Promise.all(results)
}

async function build(target) {
  return execa('rollup', ['-c', '--environment', 'TARGET:' + target], {
    stdio: 'inherit'
  })
}
