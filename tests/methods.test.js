import { test } from 'uvu';
import * as assert from 'uvu/assert';
import path from 'node:path';

import { SizePlugin } from '../src/index.js';

import { compressedResultAssertionHelper } from './utils.js';

test('Should support `.filterFiles`', async () => {
    const plugin = new SizePlugin({});

    const filtered = await plugin.filterFiles(['index.mjs', 'index.js', 'index.html', 'style.css', 'image.png']);

    assert.equal(filtered, ['index.mjs', 'index.js', 'index.html', 'style.css']);
});

test('Should support `.readFromDisk`', async () => {
    const plugin = new SizePlugin({});

    const result = await plugin.readFromDisk(path.resolve(process.cwd(), 'tests', 'data'));

    compressedResultAssertionHelper(result);
});

test('Should support `.getDiff`', async () => {
    const plugin = new SizePlugin({});

    const diff = plugin.getDiff(
        {
            'index.mjs': 513,
            'index.js': 47,
            'index.html': 80,
        },
        {
            'index.mjs': 500,
            'index.js': 50,
            'index.html': 80,
        },
    );

    assert.equal(diff, [
        {
            filename: 'index.mjs',
            size: 500,
            delta: -13,
        },
        {
            filename: 'index.js',
            size: 50,
            delta: 3,
        },
        {
            filename: 'index.html',
            size: 80,
            delta: 0,
        },
    ]);
});

test('should support `.printSize`', async () => {
    const plugin = new SizePlugin({});


    const sizeText = plugin.printSizes([
        {
            filename: 'index.mjs',
            size: 500,
            delta: -13,
        },
        {
            filename: 'index.js',
            size: 50,
            delta: 3,
        },
        {
            filename: 'index.html',
            size: 80,
            delta: 0,
        },
    ]);

    const lines = sizeText.split('\n');

    assert.equal(lines[0], '  index.mjs ⏤ 500 B (-13 B)');
    assert.equal(lines[1], '   index.js ⏤ 50 B (+3 B)');
    assert.equal(lines[2], ' index.html ⏤ 80 B');
});

test.run();
