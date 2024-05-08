const path = require('path');

module.exports = {
    // モード値を production に設定すると最適化された状態で、
    // development に設定するとソースマップ有効でJSファイルが出力される
    //モード値の指定はpackage.jsonのscriptsで記述

    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: "./src/index.js",
    // ファイルの出力設定
    output: {
      //  出力ファイルのディレクトリ名
      path: path.join(__dirname, "dist"),
      // 出力ファイル名
      filename: "main.js"
    },
    module: {
        rules: [
          {
            test: /\.json$/,
            loader: "json-loader",
            type: "javascript/auto"
          }
        ]
    },
    //module: {
    //  rules: [
    //    {
          // 拡張子 .js の場合
    //      test: /\.js$/,
          // JavaScript をコンパイルする
    //      use: "raw-loader"
    //    }
    //  ]
    //},
    // import 文で .js ファイルを解決するため
    //resolve: {
    //  extensions: [ ".js", ".json"]
    //}
    // webpack-dev-serverを立ち上げた時のドキュメントルートを設定
    // ここではdistディレクトリのindex.htmlにアクセスするよう設定してます
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        // ポート番号の指定
        port: 9000,
    },
    // 監視除外ファイルの指定
    watchOptions: {
        ignored: /node_modules/,
        poll: true, //ホットリロードできた。仮想環境限定？
    },
  };