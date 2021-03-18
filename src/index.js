import React from 'react';
import { StatusBar } from 'react-native';

import '~/config/ReactotronConfing';

import Routes from '~/routes';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#15a" />
      <Routes />
    </>
  );
}
