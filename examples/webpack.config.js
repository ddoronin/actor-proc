const path = require('path');
const webpack = require('webpack');

class ActorProcPlugin {
    constructor(key){
        this.key = key;
    }

    apply(compiler) {
        compiler.plugin("emit", function(compilation, callback) {
            const assets = Object.keys(compilation.assets);
            console.log(assets);
            callback();
        });
    }
}

module.exports = {
    entry: {
        'actor-system': path.resolve(__dirname, './ticketMarket/actor-system.ts'),
        'app': path.resolve(__dirname, './ticketMarket/app.ts')
    },

    output: {
        path: path.resolve(__dirname, 'public'),

        filename: '[name].js',

        publicPath: '/'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".js", ".json"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                context: '/'
            }
        }),
        new ActorProcPlugin('ASSETS'),

        new webpack.DefinePlugin({
            'GLOBAL': JSON.stringify('test'),
        })
    ]
};
