import HtmlWebpackPlugin from 'html-webpack-plugin';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: 'development',  // Set mode to 'development'
  entry: './src/index.jsx',  // Entry point for the React app
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/',  // Serve all assets from the root
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.mjs', '.js', '.jsx'],  // Resolvable extensions
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',  // Template HTML file
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: true,
    historyApiFallback: true,  // Fallback for single-page applications
  },
};

