const path = require('path');

module.exports = {
  entry: './server/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000
  },
  output: {
    filename: 'bundle.server.js',
    path: path.resolve(__dirname, 'dist'),
  }
};
