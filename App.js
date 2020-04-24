import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {Provider} from 'react-redux'
import dados from './src/store/store'
import Routes from './src/routes'
export default function App() {
  return (
      <Provider store={dados}>
      <Routes/>
      </Provider>
  );
}

