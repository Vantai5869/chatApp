import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Back from '../../components/Back';
import CardScreen from '../../screens/card';
import ProfilePage from '../../screens/profile';
import Gallery from '../../screens/profile/gallery';
import {ScreenNames} from './../screen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import MessengerScreen from '../../screens/messenger';
import Story from '../../screens/messenger/story';
import ChatScreen from '../../screens/chat/chat';
import Showimage from '../../screens/ShowImage/ShowImage';

const Navigation = createNativeStackNavigator();

function MessagerTab({navigation, route}) {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (
      routeName === ScreenNames.Story ||
      routeName === ScreenNames.Showimage ||
      routeName === ScreenNames.ChatScreen
    ) {
      navigation.setOptions({tabBarVisible: false});
    } else {
      navigation.setOptions({tabBarVisible: true});
    }
  }, [navigation, route]);
  return (
    <Navigation.Navigator>
      <Navigation.Screen
        name={ScreenNames.MessengerScreen}
        component={MessengerScreen}
        options={({navigation}) => ({
          gestureEnabled: false,
          headerShown: false,
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
        name={ScreenNames.Story}
        component={Story}
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
        name={ScreenNames.Showimage}
        component={Showimage}
        options={({route}) => ({
          tabBarVisible: false,
          gestureEnabled: false,
          headerShown: false,
          headerShown: false,
          title: '',
          headerTransparent: true,
        })}
      />
    </Navigation.Navigator>
  );
}

export default MessagerTab;
