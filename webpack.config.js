module.exports = {
  entry: [
    'babel-polyfill',
    './js/app.jsx',
  ],
  output: {
    path: './public/js',
    filename: 'gameboy-emulator.js',
    publicPath: '/',
  },
  devServer: {
    inline: true,
    contentBase: './js',
  },
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: 'style!css!less',
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-1'],
        },
      },
    ],
  },
  eslint: {
    configFile: '.eslintrc',
  },
};
