import React from 'react';
import { MenuProvider } from 'react-native-popup-menu';
import { View } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import Home from './screens/Home';
import TopList from './screens/TopList';
import Navigator from './config/routes';

EStyleSheet.build({});

export default () => (
  <MenuProvider>
    <Navigator />
  </MenuProvider>
);
