const p = require('path');

module.exports = (babel) => {
  const { types: t } = babel;

  return {
    name: 'react-native-dom-webview/babel',
    visitor: {
      CallExpression(path, { file, opts }) {
        const isDOM = looksLike(path, {
          node: {
            callee: {
              type: 'Identifier',
              name: 'DOM',
            },
          },
        });

        if (!isDOM) {
          return;
        }

        const port = opts.packagerPort;
        if (!port) {
          throw new Error(
            "react-native-dom-webview/babel requires the packager's port option `packagerPort` to be set. For common React Native projects, this usually is 8081; for Expo, this usually is 19001."
          );
        }

        const [source] = path.node.arguments;

        path.replaceWith(
          t.callExpression(
            t.memberExpression(t.identifier('preval'), t.identifier('require')),
            [
              t.stringLiteral(p.resolve(__dirname, './client')),
              t.stringLiteral(port.toString()),
              t.stringLiteral(
                p.relative(
                  file.opts.root,
                  p.resolve(p.dirname(file.opts.filename), source.value)
                )
              ),
            ]
          )
        );
      },
    },
  };
};

function looksLike(a, b) {
  return (
    a &&
    b &&
    Object.keys(b).every((bKey) => {
      const bVal = b[bKey];
      const aVal = a[bKey];
      if (typeof bVal === 'function') {
        return bVal(aVal);
      }
      return isPrimitive(bVal) ? bVal === aVal : looksLike(aVal, bVal);
    })
  );
}

function isPrimitive(val) {
  return val == null || /^[sbn]/.test(typeof val);
}
