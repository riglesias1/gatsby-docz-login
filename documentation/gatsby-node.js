exports.onCreateWebpackConfig = ({ plugins, actions }) => {
  const { setWebpackConfig } = actions;
  const path = require('path');

  setWebpackConfig({
    plugins: [
      plugins.define({
        'process.env.EXAMPLE_ENV': JSON.stringify("EXAMPLE")
      }),
    ],
    resolve: {
      modules: [path.resolve(__dirname, '../src'), 'node_modules'],
      alias: {
        '@': path.resolve(__dirname, '../src/components/'),
        '*': path.resolve(__dirname, '../src/multimedia/'),
      },
    },
  });
};
