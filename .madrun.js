import {run} from 'madrun';

const env = {
    MINIFY: 1,
};

export default {
    'test': () => `tape 'test/*.js'`,
    'watch:test': async () => `nodemon -w lib -w test -x ${await run('test')}`,
    'lint': () => `putout .`,
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'coverage': async () => `c8 ${await run('test')}`,
    'report': () => 'c8 report --reporter=lcov',
    'wisdom': () => run('build:*'),
    'build': () => run('build:*'),
    'build:putout': () => 'rollup -c',
    'build:putout:esm': async () => [env, await run('build:putout', build({
        name: 'putout',
        format: 'es',
        input: 'lib/putout.js',
        output: 'bundle/putout.min.js',
    }))],
    'build:putout:esm:dev': async () => await run('build:putout', build({
        name: 'putout',
        format: 'es',
        input: 'lib/putout.js',
        output: 'bundle/putout.min.js',
    })),
    'build:putout:iife': async () => [env, await run('build:putout', build({
        name: 'putout',
        format: 'umd',
        input: 'lib/putout-iife.js',
        output: 'bundle/putout.iife.js',
        exports: 'default',
    }))],
    'build:putout:cjs': async () => [env, await run('build:putout', build({
        name: 'putout',
        format: 'cjs',
        input: 'lib/putout-iife.js',
        output: 'bundle/putout.min.cjs',
        exports: 'default',
    }))],
    'build:putout:cjs:dev': async () => await run('build:putout', build({
        name: 'putout',
        format: 'cjs',
        input: 'lib/putout-iife.js',
        output: 'bundle/putout.cjs',
        exports: 'default',
    })),
};

function build({name, format, input, output, exports = 'auto'}) {
    return `--name ${name} --format ${format} --input ${input} --o ${output} --exports ${exports}`;
}
