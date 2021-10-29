module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    },
    {
      test: /\.(ts|tsx)?$/,
      loader: "ts-loader",
      exclude: /node_modules/
    },
  ]
},
resolve: {
  extensions: ['.ts', '.js', '.json', ".tsx"]
}
