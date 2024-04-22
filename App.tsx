import React from 'react';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStackParams} from './src/navigation/HomeStack/types';
import HomeNavigator from './src/navigation/HomeStack';

export enum RootRouteNames {
  HomeStack = 'HomeStack',
}

export type RootStackParams = {
  [RootRouteNames.HomeStack]:
    | NavigatorScreenParams<HomeStackParams>
    | undefined;
};

const RootStack = createNativeStackNavigator<RootStackParams>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen
          name={RootRouteNames.HomeStack}
          component={HomeNavigator}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
