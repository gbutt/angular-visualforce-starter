var path = require('path');

module.exports = {
    // Entry accepts a path or an object of entries. We'll be using the
    // latter form given it's convenient with more complex configurations.
    entry: {},
    output: {
        filename: '[name].js'
    },
    module: {
        loaders: []
    },
    resolve: {
        root: path.resolve(global.appRoot, './src')
    },
    plugins: []
};


// var path = require("path");
// var webpack = require("webpack");
// module.exports = {
//     cache: true,
//     entry: {
//         angular: ["angular", "@angular/router/angular1/angular_1_router.js"],
//         main: "./src/app/main.js",
//         // bootstrap: ["!bootstrap-webpack!./app/bootstrap/bootstrap.config.js", "./app/bootstrap"],
//         // react: "./app/react"
//     },
//     output: {
//         path: path.join(__dirname, "dist"),
//         publicPath: "dist/",
//         filename: "[name].js",
//         chunkFilename: "[chunkhash].js"
//     },
//     // module: {
//     // 	loaders: [
//     // 		// required to write "require('./style.css')"
//     // 		{ test: /\.css$/,    loader: "style-loader!css-loader" },

//     // 		// required for bootstrap icons
//     // 		{ test: /\.woff$/,   loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff" },
//     // 		{ test: /\.ttf$/,    loader: "file-loader?prefix=font/" },
//     // 		{ test: /\.eot$/,    loader: "file-loader?prefix=font/" },
//     // 		{ test: /\.svg$/,    loader: "file-loader?prefix=font/" },

//     // 		// required for react jsx
//     // 		{ test: /\.js$/,    loader: "jsx-loader" },
//     // 		{ test: /\.jsx$/,   loader: "jsx-loader?insertPragma=React.DOM" },
//     // 	]
//     // },
//     resolve: {
//         root: "./src",
//         modulesDirectories: ["node_modules"]
//             // alias: {
//             // 	// Bind version of jquery
//             // 	jquery: "jquery-2.0.3",

//         // 	// Bind version of jquery-ui
//         // 	"jquery-ui": "jquery-ui-1.10.3",

//         // 	// jquery-ui doesn't contain a index file
//         // 	// bind module to the complete module
//         // 	"jquery-ui-1.10.3$": "jquery-ui-1.10.3/ui/jquery-ui.js",
//         // }
//     },
//     plugins: [
//         // new webpack.ProvidePlugin({
//         // 	// Automtically detect jQuery and $ as free var in modules
//         // 	// and inject the jquery library
//         // 	// This is required by many jquery plugins
//         // 	jQuery: "jquery",
//         // 	$: "jquery"
//         // })
//     ]
// };