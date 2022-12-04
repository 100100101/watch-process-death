require('ts-node').register({
    files: true,
    require: ['tsconfig-paths/register'],
    preferTsExts: true,
})
require('index.ts')
