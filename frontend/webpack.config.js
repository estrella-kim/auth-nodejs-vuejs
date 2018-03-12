const path = require('path');

module.exports  = {
    entry : {
        index : './src/containers/index',
        todo : './src/containers/todo'
    },
    output : {
        filename :'[name].bundle.js',
        path : path.resolve(__dirname, './public')
    },
    module : {
        rules : [
            {
                test : /\.js$/,
                exclude : /node_modules/,
                loader : "babel-loader" //use option으로 정렬
            },
            {
                test : /\.js$/,
                exclude : /node_modules/,
                loader : "eslint-loader",
                options : {
                    //eslint rules
                }
            },
            {
                test : /\.css$/,
                use : ["style-loader", "css-loader"]
            }
        ]
    },
    devServer : {
        contentBase : path.join(__dirname, "public"),
        port : 8080
    }
}