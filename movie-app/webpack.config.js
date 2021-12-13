const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = (env) => {
  const { mode = 'development', submode='build' } = env;

  const isProd = mode === 'production';
  const isDev = mode === 'development';
  const isBuildDev = submode === 'build';

  const fileName = ext => isDev ? `main.${ext}` : `main-[hash:8].${ext}`;

  const getStyleLoaders = () => [
    isProd || isBuildDev
      ? MiniCssExtractPlugin.loader
      : 'style-loader',
    'css-loader'
  ];
  
  const getPlugins = () => {
    const plugins = [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        minify: false,
        template: './index.ejs',
        filename: 'index.html'
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src/assets/favicon.ico'),
            to: path.resolve(__dirname, 'dist'),
          },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: fileName('css')
      })
    ];
    return plugins;
  };

  return {
    context: path.resolve(__dirname, 'src'),
    entry: ['./index.js'],
    output: {
      filename: fileName('js'),
      path: path.resolve(__dirname, 'dist'),
      assetModuleFilename: 'images/[name]-[hash:8][ext]',
      publicPath: '/'
    },
    mode: isProd ? 'production' : isDev && 'development',
    optimization: {
      minimize: isProd
    },
    target: 'web',
    devServer: {
      hot: isDev,
      liveReload: isDev,
      static: true,
      watchFiles: [
        './src/templates',
        './src/index.ejs'
      ]
    },
    module: {
      rules: [
        // Loading javascript
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        // Loading html
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                esModule: false,
                sources: true
              }
            }
          ]
        },
        // Loading hbs
        {
          test: /\.hbs$/,
          use: [
            {
              loader: 'handlebars-loader',
              options: {
                inlineRequires: '/(pictures|assets)/'
              }
            }
          ]
        },
        // Loading images
        {
          test: /\.(jpg|png|svg|gif|ico)$/,
          type: 'asset/resource'
        },
        // Loading fonts
        {
          test: /\.(ttf|otf|eot|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                esModule: false,
                outputPath: 'fonts',
                name: '[name].[ext]'
              }
            }
          ]
        },
        // Loading scss/sass
        {
          test: /\.(s[ca]ss)$/,
          use: [
            ...getStyleLoaders(),
            'sass-loader'
          ]
        },
        // Loading css
        {
          test: /\.css$/,
          use: getStyleLoaders()
        },
        {
          test: /\.(md)$/,
          type: 'asset/source'
        },
        {
          test: /\.(ejs)/,
          loader: 'ejs-compiled-loader'
        }
      ]
    },

    plugins: getPlugins()
  }
};