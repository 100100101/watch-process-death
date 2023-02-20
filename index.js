const tsNode = require('ts-node')
tsNode.register({
    project: './tsconfig.json',
    require: ['tsconfig-paths/register'],
    preferTsExts: true,
    // compilerOptions: {
    //     module: 'CommonJS',
    // },
    // default ignore
    // ignore: [/node_modules/],
    // ignore: [
    //     /(?!.*node_modules\/(?:not-ignore-module-1|not-ignore-module-2)).*node_modules/,
    // ],
    // allow including *.ts from node_modules, but other is not allowed
    ignore: [/(?!.*node_modules\/(.*?)index\.ts$).*node_modules/],
    // ignore: [
    //     /(?!.*\/(?:use-node-inspector|not-ignore-module-2)\/).*node_modules/,
    // ],
})
const vueConfigTs = require('./vue.config.ts')
module.exports = vueConfigTs.default
