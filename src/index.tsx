import React from 'react';
import WebView, { WebViewProps } from 'react-native-webview';

export interface DomWebviewProps extends WebViewProps {
  app?: string;
  rootId?: string;
}

const DomWebview: React.FC<DomWebviewProps> = ({
  app,
  rootId,
  ...restProps
}) => {
  return (
    <WebView
      originWhitelist={['*']}
      source={{
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
            </head>
            <body>
              <div id="${rootId ?? 'root'}"></div>
              <script>${app}</script>
            </body>
          </html>
        `,
      }}
      {...restProps}
    />
  );
};

export default DomWebview;
