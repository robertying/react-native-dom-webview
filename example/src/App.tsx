import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import DomWebview from 'react-native-dom-webview';

declare const DOM: any;
// magical comment to force revalidating babel cache: dsafsdfadsa
const webApp = DOM('./web/App');

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>React Native DOM WebView Example</Text>
      <DomWebview style={styles.webview} app={webApp} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
  },
  webview: {
    flex: 1,
  },
});
