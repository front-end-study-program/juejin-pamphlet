const fs = require('fs')

const pkg = fs.readFileSync('./package.json', 'utf-8')

console.log(pkg)