// all navigation root will find it here

import { createStackNavigator } from 'react-navigation';
import Home from '../screens/Home';
import TopList from '../screens/TopList';

const HomeStack = createStackNavigator(
  {
    TopList: {
      screen: TopList,
    },
    Home: {
      screen: Home,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

export default HomeStack;
