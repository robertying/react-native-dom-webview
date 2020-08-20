import { transformAsync } from '@babel/core';
const plugin = require('../babel');

const input = `
import React from "react";
import { View, Text } from "react-native";

const a = "123";

const app = DOM("./web/App");
const editor = DOM("./Editor");

const fileList = preval.require("./lib/files", 3);

export default function MyScreen() {
    return (
        <View>
            <Text>abc</Text>
        </View>
    )
}
`;

it('replaces `DOM` with `preval.require`', async () => {
  const result = await transformAsync(input, {
    babelrc: false,
    filename: 'MyScreen.tsx',
    plugins: [
      [
        plugin,
        {
          packagerPort: 8081,
        },
      ],
    ],
  });
  expect(result?.code).toMatchSnapshot();
});
