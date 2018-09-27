const path = require("path");

module.exports = {
    entry: "./index.js",
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
