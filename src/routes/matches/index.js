import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Back from '../../components/Back';
import CardScreen from '../../screens/card';
import ProfilePage from '../../screens/profile';
import Gallery from '../../screens/profile/gallery';
import LoginScreen from '../../screens/auth';
import {ScreenNames} from './../screen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Register from '../../screens/Register/Register';
import ChatScreen from '../../screens/chat/chat';
import Matches from '../../screens/favorite';

const Navigation = createNativeStackNavigator();

function MatchesTab({navigation, route}) {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (
      routeName === ScreenNames.Login ||
      routeName === ScreenNames.ChatScreen ||
      routeName === ScreenNames.Register
    ) {
      navigation.setOptions({tabBarVisible: false});
    } else {
      navigation.setOptions({tabBarVisible: true});
    }
  }, [navigation, route]);
  return (
    <Navigation.Navigator>
      <Navigation.Screen
        name={ScreenNames.FavoriteScreen}
        component={Matches}
        options={({route}) => ({
          tabBarVisible: false,
          gestureEnabled: false,
          headerShown: false,
          headerShown: false,
          title: '',
          headerTransparent: true,
        })}
      />
      <Navigation.Screen
        name={ScreenNames.Login}
        component={LoginScreen}
        options={({navigation}) => ({
          gestureEnabled: false,
          headerShown: false,
        })}
      />
      <Navigation.Screen
        name={ScreenNames.Register}
        component={Register}
        options={({route}) => ({
          tabBarVisible: false,
          gestureEnabled: false,
          headerShown: false,
          headerShown: false,
          title: '',
          headerTransparent: true,
        })}
      />
      <Navigation.Screen
        name={ScreenNames.ChatScreen}
        component={ChatScreen}
        options={({route}) => ({
          tabBarVisible: false,
          gestureEnabled: false,
          headerShown: false,
          headerShown: false,
          title: '',
          headerTransparent: true,
        })}
      />
      <Navigation.Screen
        name={ScreenNames.ProfileScreen}
        component={ProfilePage}
        options={({navigation}) => ({
          gestureEnabled: false,
          headerShown: false,
        })}
      />
    </Navigation.Navigator>
  );
}

export default MatchesTab;
