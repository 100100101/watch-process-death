const tsNode = require('ts-node')
tsNode.register({
    project: './tsconfig.json',
    require: ['tsconfig-paths/register'],
    preferTsExts: true,
    ignore: [/(?!.*node_modules\/(.*?)index\.ts$).*node_modules/],
})
const tsIndex = require('./src/index.ts')
module.exports = tsIndex.default
