const webpack = require("webpack")

module.exports = function override(config, env) {
    let loaders = config.resolve = {
        fallback: {
            stream: require.resolve("stream-browserify"),
            buffer: require.resolve("buffer"),      
        },
        extensions: [...config.resolve.extensions, ".ts", ".js"]
    }
    config.plugins = [
        ...config.plugins,
        new webpack.ProvidePlugin({
            process: "process/browser",
            Buffer: ["buffer", "Buffer"],
        }),
    ]
    loaders.fallback = {
        "fs": false,
        "tls": false,
        "net": false,
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "zlib": require.resolve("browserify-zlib"),
        "path": require.resolve("path-browserify"),
        "stream": require.resolve("stream-browserify"),
        "util": require.resolve("util/"),
        "crypto": require.resolve("crypto-browserify")
    }
    return config
}