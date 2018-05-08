const tsImportPluginFactory = require('ts-import-plugin')

module.exports = {
  components: 'components/**/index.tsx',
  propsParser: require('react-docgen-typescript').parse,
  webpackConfig: {
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'awesome-typescript-loader',
              options: {
                getCustomTransformers: () => ({
                  before: [tsImportPluginFactory({
                    libraryName: 'antd',
                    libraryDirectory: 'es',
                    style: true
                  })]
                }),
                useBabel: true
              }
            }
          ]
        },
        // Other loaders that are needed for your components
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader?modules'
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true
              }
            }
          ]
        }
      ]
    }
  }
}
