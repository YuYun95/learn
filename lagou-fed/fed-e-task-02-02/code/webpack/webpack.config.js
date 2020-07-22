const path = require('path')

module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /.png$/,
        use: 'file-loader'
      },
      {
        test: /\.html$/i,
        use: {
          loader: 'html-loader',
          options: {
            // attrs: ['img:src', 'a:href']
          }
        }
      },
    ]
  }
}