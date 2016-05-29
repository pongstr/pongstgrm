'use strict';

const path      = require('path')
const basePath  = process.cwd()

module.exports = {
  context: `${basePath}/src/scripts`,
  entry: {
    'pongstgrm': './pongstgrm.js'
  },
  output: {
    path: `${basePath}/dist`,
    filename: '[name].js',
    chunkFilename: '[id].js',
    libraryTarget: 'var'
  },
  module: {
    preLoaders: [
      {test: /\.html$/, loader: 'raw!html-minify'}
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /^(node_modules|bower_components)$/,
        include: [
          path.resolve(basePath, 'src/scripts'),
          path.resolve(basePath, 'test')
        ],
        loader: 'babel',
        cacheDirectory: false,
        query: {
          presets: ['es2015'],
          compact: false
        }
      }
    ]
  },
  resolve: {
    modulesDirectories: [path.join(basePath, './node_modules')],
    root: [path.resolve(basePath, 'src/scripts')]
  },
  externals: {
    'bundle!jquery': 'jQuery'
  }
}
