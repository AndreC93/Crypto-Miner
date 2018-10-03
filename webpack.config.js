const path = require("path");

module.exports = {
    entry: "./lib/index.js",
    output: {
        path: path.join(__dirname, "lib"),
        filename: "bundle.js",
    },
    resolve: {
        extensions: [".js", "*"],
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
            },
        ],
    },
};
