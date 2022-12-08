import {
  NavigationContainer
} from '@react-navigation/native';
import {
  createNativeStackNavigator
} from '@react-navigation/native-stack';
import React from 'react';
import TabNavigator from './tab';

const Stack = createNativeStackNavigator();

const RootNavigation = ({...props}) => (
  <NavigationContainer >
    <Stack.Navigator
      screenOptions={{
        cardOverlayEnabled: true,
        gestureEnabled: false,
      }}>
      <Stack.Screen
        {...props}
        name='HomeStack'
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
export default RootNavigation;
