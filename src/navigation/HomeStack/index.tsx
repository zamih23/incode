import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FC} from 'react';
import {HomeRouteNames} from './types';
import {Home} from '../../screens/Home';
import Hero from '../../screens/Hero';

const HomeStack = createNativeStackNavigator();

const HomeNavigator: FC = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name={HomeRouteNames.Home} component={Home} />
      <HomeStack.Screen name={HomeRouteNames.Hero} component={Hero} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
