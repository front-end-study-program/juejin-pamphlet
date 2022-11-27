const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

const source = `
    (async function() {
        console.log('hello world');
    })();
`;

const ast = parser.parse(source);

traverse(ast, {
    StringLiteral(path) {
        path.node.value = path.node.value.replace('world', 'babel')
    }
});

const { code, map} = generate(ast, {
    sourceMaps: true
});

console.log(code);
console.log(JSON.stringify(map));