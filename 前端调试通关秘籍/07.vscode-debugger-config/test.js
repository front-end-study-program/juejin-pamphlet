console.log(process.env)

const cp = require('child_process');

cp.spawnSync('node', ['./index.js'], {
    stdio: 'inherit'
});