// import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import React from 'react';
// import LoginScreen from '../../screens/auth';
// import CardScreen from '../../screens/card';
// import ProfilePage from '../../screens/profile';
// import Register from '../../screens/Register/Register';
// import { ScreenNames } from '../screen';

// const Navigation = createNativeStackNavigator();

// function HomeTab({ navigation, route }) {
//   React.useLayoutEffect(() => {
//     const routeName = getFocusedRouteNameFromRoute(route);
//     if (routeName === ScreenNames.Login){
//       console.log('sss')
//         navigation.setOptions({tabBarVisible: false});
//     }else {
//         navigation.setOptions({tabBarVisible: true});
//     }
// }, [navigation, route]);
//     return (
//         <Navigation.Navigator>
//             <Navigation.Screen
//                name={ScreenNames.Login}
//                 component={LoginScreen}
//                 options={({ navigation }) => ({
//                   gestureEnabled: false,
//                   headerShown: false,
//                 })}
//             />
//             <Navigation.Screen
//                name={ScreenNames.Register}
//                 component={Register}
//                 options={({ navigation }) => ({
//                   gestureEnabled: false,
//                   headerShown: false,
//                 })}
//             />
//             <Navigation.Screen
//                 name={ScreenNames.CardScreen}
//                 component={CardScreen}
//                 options={({ navigation }) => ({
//                   gestureEnabled: false,
//                   headerShown: false,
//                 })}
//             />
//         </Navigation.Navigator>
//     )
// }

//   export default HomeTab;

// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import React from 'react';
// import Back from '../../components/Back';
// import ProfilePage from '../../screens/profile';
// import Gallery from '../../screens/profile/gallery';
// import {ScreenNames} from './../screen';
// import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
// import LoginScreen from '../../screens/auth';
// import Register from '../../screens/Register/Register';
// import CardScreen from '../../screens/card';

// const Navigation = createNativeStackNavigator();

// function HomeTab({navigation, route}) {
//   React.useLayoutEffect(() => {
//     const routeName = getFocusedRouteNameFromRoute(route);
//     console.log('routeName');
//     console.log(routeName);
//     if (routeName === ScreenNames.Login) {
//       navigation.setOptions({tabBarVisible: false});
//     } else {
//       navigation.setOptions({tabBarVisible: true});
//     }
//   }, [navigation, route]);
//   return (
//     <Navigation.Navigator>
//       <Navigation.Screen
//         name={ScreenNames.Login}
//         component={LoginScreen}
//         options={({route}) => ({
//           gestureEnabled: false,
//           headerShown: false,
//         })}
//       />

// <Navigation.Screen
//   name={ScreenNames.Register}
//   component={Register}
//   options={({route}) => ({
//     tabBarVisible: false,
//     gestureEnabled: false,
//     headerShown: false,
//     headerShown: false,
//     title: '',
//     headerTransparent: true,
//   })}
// />

// <Navigation.Screen
//   name={ScreenNames.CardScreen}
//   component={CardScreen}
//   options={({route}) => ({
//     tabBarVisible: false,
//     gestureEnabled: false,
//     headerShown: false,
//     headerShown: false,
//     title: '',
//     headerTransparent: true,
//   })}
// />
//     </Navigation.Navigator>
//   );
// }

// export default HomeTab;

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
import Verification from '../../screens/verification';
import Call from '../../screens/Call/Call';

const Navigation = createNativeStackNavigator();

function HomeTab({navigation, route}) {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (
      routeName === ScreenNames.Login ||
      routeName === ScreenNames.Verification ||
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
        name={ScreenNames.CardScreen}
        component={CardScreen}
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
        name={ScreenNames.Verification}
        component={Verification}
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
      <Navigation.Screen
        name={ScreenNames.Call}
        component={Call}
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

export default HomeTab;
