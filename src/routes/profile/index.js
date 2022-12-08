import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Back from '../../components/Back';
import CardScreen from '../../screens/card';
import ProfilePage from '../../screens/profile';
import Gallery from '../../screens/profile/gallery';
import {ScreenNames} from './../screen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


const Navigation = createNativeStackNavigator();

function ProfileTab({ navigation, route }) {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === ScreenNames.Gallery){
        navigation.setOptions({tabBarVisible: false});
    }else {
        navigation.setOptions({tabBarVisible: true});
    }
}, [navigation, route]);
    return (
        <Navigation.Navigator>
            <Navigation.Screen
                name={ScreenNames.ProfileScreen}
                component={ProfilePage}
                options={({ navigation }) => ({
                  gestureEnabled: false,
                  headerShown: false,
                })}
            />
            <Navigation.Screen
                name={ScreenNames.Gallery}
                component={Gallery}
                options={({ route }) => ({
                  tabBarVisible:false,
                  gestureEnabled: false,
                  headerShown: false,
                  headerShown: false,
                  title: '',
                  headerTransparent: true,
                })}
            />
        </Navigation.Navigator>
    )
}

  export default ProfileTab;
  