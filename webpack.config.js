module.exports = {
    entry: {
        waitForEvent: './src/index.js'
    },
    output: {
        filename: '[name].js',
        library: '[name]',
        libraryExport: 'default',
        libraryTarget: 'umd'
    }
}