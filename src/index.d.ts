export interface PluginOptions {
    /** compression method to use, default: 'gzip' */
    compression?: 'gzip' | 'brotli' | 'none';
    /** minimatch pattern of files to track */
    pattern?: string;
    /** minimatch pattern of files NOT to track */
    exclude?: string;
    /** custom function to remove/normalize hashed filenames for comparison */
    stripHash?: (filename: string) => string;
}



export class SizePluginCore {
    /**
     * @param {object} options
     * @param {string} [options.compression] compression method to use, default: 'gzip'
     * @param {string} [options.pattern] minimatch pattern of files to track
     * @param {string} [options.exclude] minimatch pattern of files NOT to track
     * @param {(filename: string) => string} [options.stripHash] custom function to remove/normalize hashed filenames for comparison
     */
    constructor(options: PluginOptions);

    filterFiles(files: string[]): string[];

    readFromDisk(cwd: string): Promise<Record<string, number>>;

    getSizes(assets: Record<string, string>): Promise<Record<string, number>>;

    getDiff(
        oldSizes: Record<string, number>,
        newSizes: Record<string, number>,
    ): { filename: string; size: number; delta: number }[];

    printSizes(files: { filename: string; size: number; delta: number }[]): string;
}
