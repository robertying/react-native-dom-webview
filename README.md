# React Native DOM WebView ⚛️ 📲

Write React (DOM) code alongside your React Native code and render it directly in React Native WebView.

## Why

React Native holds most of the power React has but sometimes is not as flexible as React; or to be precise, React DOM.

We can use React Native WebView to include things that need extra customization or flexibility.

We may already have some components written for the web using React and React DOM. In order to integrate it into React Native, we need to setup a separate project, such as using Create React App and then load the build output into WebView.

This is fine for a very complex web project. However, there are cases when we just want a mini component integrated with React Native. A rich text editor, for example. Maintaining a separate project seems an overkill.

What if we could just import our Web (DOM) components and render them in React Native WebView?

React Native DOM WebView tries to make this use case simplier.

## Installation

### 1. Install dependencies

```sh
npm install react-native-dom-webview

# or

yarn add react-native-dom-webview
```

The following peer dependencies are also required:

- `react`
- `react-dom`
- `react-native`
- `react-native-webview`

### 2. Modify babel configuration

In your React Native babel config (`.babelrc`, `babel.config.js`, etc.), add the following plugins (`.babelrc` for example):

```json
{
  "presets": [
    /* your presets */
  ],
  "plugins": [
    /* your plugins */
    [
      "react-native-dom-webview/babel",
      {
        "packagerPort": 8081
      }
    ],
    "preval"
  ]
}
```

- **`packagerPort` is where your React Native packager (aka Metro) is listening. For common React Native projects, it usually is 8081; for Expo, usually 19001.**

## Usage

### 1. Write a React DOM component

```jsx
// web/Example.js for example

import React from 'react';

export default function Example() {
  return <div>example</div>;
}
```

### 2. Render your root component with `react-dom`

```jsx
// web/App.js

import React from 'react';
import ReactDOM from 'react-dom';
import Example from './Example';

function App() {
  return <Example />;
}

ReactDOM.render(<App />, document.getElementById('root'));
```

### 3. Import the DOM index and pass `DOM` macro wrapped object to `DomWebview`

```jsx
// screens/MyScreen.js

import React from 'react';
import DomWebview from 'react-native-dom-webview';

const webApp = DOM('./web/App');

export default function MyScreen() {
  return <DomWebview style={{ flex: 1 }} app={webApp} />;
}
```

## Props

You can use any props from [`react-native-webview`](https://github.com/react-native-community/react-native-webview/blob/master/docs/Reference.md).

Additional props:

- **`app`** (optional): `DOM` macro wrapped web root component (with `ReactDOM.render`)
- **`rootId`** (optional; default: "root"): the id of the root `<div>` in WebView where the root React component will be mounted; this should be consistent with your `ReactDOM.render` call.

You can even overwrite the whole HTML rendered in WebView to add custom `<head>` or `<script>`:

```jsx
import React from 'react';
import DomWebview from 'react-native-dom-webview';

const webApp = DOM('./web/App');

export default function MyScreen() {
  return (
    <DomWebview
      style={{ flex: 1 }}
      source={{
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </head>
            <body>
              <div id="root"></div>
              <script>${webApp}</script>
            </body>
          </html>
        `,
      }}
    />
  );
}
```

## TypeScript

To dismiss TypeScript's complaint on `DOM` macro, add the following when using `DOM`:

```ts
declare const DOM: any;
const webApp = DOM('./web/App');
```

## Caveats

### `babel-plugin-preval`

`react-native-dom-webview/babel` transitively depends on `babel-plugin-preval`, so be cautious not to accidentally get your code prevaled. See [`babel-plugin-preval`](https://github.com/kentcdodds/babel-plugin-preval) for things that will be prevaled.

### Hot reload

Due to babel's cache strategy, even if you changed React DOM code, the change would not reflect in your WebView. See this issue for details: <https://github.com/kentcdodds/babel-plugin-preval/issues/19>.

For now, you can use some magical comments to force babel to invalidate cache and see the newest change from your DOM code:

```jsx
// magical comment to force revalidating babel cache: dsafsdfadsa
const webApp = DOM('./web/App');
```

Just change anything (usually the comments) in the file where `DOM` macro exists, save the file and you should be able to see the updated WebView.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
