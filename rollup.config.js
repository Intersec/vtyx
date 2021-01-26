export default {
    input: 'lib/index.js',
    output: [{
        file: 'dist/vtyx.common.js',
        exports: "named",
        format: 'cjs',
    }, {
        file: 'dist/vtyx.esm.js',
        format: 'esm',
    }],
    external: [
        'vue',
        'vue-class-component',
        'vue-property-decorator',
    ]
}
