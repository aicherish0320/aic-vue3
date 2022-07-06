const path = require('path')
const ts = require('rollup-plugin-typescript2')
const resolvePlugin = require('@rollup/plugin-node-resolve').default

const packagesDir = path.resolve(__dirname, 'packages')

const name = process.env.TARGET
const packageDir = path.resolve(packagesDir, name)

const pkg = require(path.resolve(packageDir, 'package.json'))

const options = pkg.buildOptions

const outputConfig = {
  cjs: {
    file: path.resolve(path.resolve(packageDir, `dist/${name}.cjs.js`)),
    format: 'cjs'
  },
  global: {
    file: path.resolve(path.resolve(packageDir, `dist/${name}.global.js`)),
    format: 'iife'
  },
  'esm-bundler': {
    file: path.resolve(path.resolve(packageDir, `dist/${name}.esm-bundler.js`)),
    format: 'esm'
  }
}

function createConfig(output) {
  output.sourcemap = true
  const config = {
    input: path.resolve(packageDir, 'src/index.ts'),
    output,
    plugins: [
      ts({
        tsconfig: path.resolve(__dirname, 'tsconfig.json')
      }),
      resolvePlugin()
    ]
  }

  if (output.format === 'iife') {
    output.name = options.name
  }

  return config
}

export default options.formats.map((f) => createConfig(outputConfig[f]))
