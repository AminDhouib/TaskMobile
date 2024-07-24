import {registerRootComponent} from 'expo';
import * as React from 'react';
import {StatusBar} from 'expo-status-bar';
import {Routes} from '@routes/index';

export default function App() {
  return (
    <>
      <Routes />
      <StatusBar style="light" />
    </>
  );
}
registerRootComponent(App);
