import * as assert from 'uvu/assert';

/**
 * Compression sizes are non-deterministic across platforms and Node versions,
 * best we can do is check for keys & that the values are numbers > 0
 *
 * @param {Record<string, number>} result
 */
export function compressedResultAssertionHelper(result) {
    assert.equal(
        Object.keys(result).sort(),
        ['index.cjs', 'index.html', 'index.js', 'index.mjs']
    );

    for (const key in result) {
        assert.type(result[key], 'number');
        assert.ok(result[key] > 0);
    }
}
