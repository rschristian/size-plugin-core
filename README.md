# @rschristian/size-plugin

Minimal fork of [kuldeepkeshwar/size-plugin-core](https://github.com/kuldeepkeshwar/size-plugin-core), trimmed down unnecessary functions and updated to more modern-ish JS. This is built for [preactjs/compresses-size-action](https://github.com/preactjs/compresses-size-action) in particular but can be used elsewhere too.

## Usage

```js
import { SizePlugin } from '@rschristian/size-plugin';

const plugin = new SizePlugin({
  compression: 'gzip',
  pattern: '**/*.{js,css}',
  exclude: 'vendor/**',
  stripHash: (filename) => filename.replace(/-[a-f0-9]{8}\./, '.'),
});
```

## Options

All options are optional and have default values. You can specify any combination of options, or none at all.

- `compression: 'gzip' | 'brotli' | 'none'`
  - compression method to use
  - default: `'gzip'`

- `pattern: string`
  - minimatch pattern of files to track
  - default: `'**/*.{js,mjs,cjs,jsx,css,html}'`

- `exclude: string`
  - minimatch pattern of files NOT to track
  - default: `null`

- `stripHash: (filename: string) => string`
  - custom function to remove/normalize hashed filenames for comparison
  - default: `null`

## License

[Apache-2.0](https://github.com/rschristian/size-plugin/blob/master/LICENSE)
