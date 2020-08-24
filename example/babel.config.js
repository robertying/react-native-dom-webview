const path = require('path');
const pak = require('../package.json');

module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            // For development, we want to alias the library to the source
            [pak.name]: path.join(__dirname, '..', pak.source),
          },
        },
      ],
      [
        // for library users, the following should be "react-native-dom-webview/babel"
        path.join(__dirname, '..', pak.source, '../../babel'),
        {
          packagerPort: 19001,
        },
      ],
      'preval',
    ],
  };
};
