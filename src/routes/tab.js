import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Back from '../components/Back';
import Filter from '../components/Filter';
import CardScreen from '../screens/card';
import FavoriteScreen from '../screens/favorite';
import MessengerScreen from '../screens/messenger';
import {colors} from '../theme/colors';
import {
  IconFavorite,
  IconHome,
  IconMessenger,
  IconPerson,
} from './../theme/icons';
import HomeTab from './home';
import MatchesTab from './matches';
import MessagerTab from './messager';
import ProfileTab from './profile';
import {NavigatorName, ScreenNames} from './screen';
const Tab = createBottomTabNavigator();
const TabNavigator = React.memo(props => {
  function MyTabBar({state, descriptors, navigation, route}) {
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
      return null;
    }
    return (
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          const renderIconMenu = () => {
            if (route.name === NavigatorName.Home) {
              return (
                <IconHome
                  width={19}
                  height={19}
                  fill={isFocused ? colors.c_E94057 : colors.c_ADAFBB}
                />
              );
            } else if (route.name === NavigatorName.Profile) {
              return (
                <IconPerson
                  width={19}
                  height={19}
                  fill={isFocused ? colors.c_E94057 : colors.c_ADAFBB}
                />
              );
            } else if (route.name === NavigatorName.MatchesTab) {
              return (
                <IconFavorite
                  width={19}
                  height={19}
                  fill={isFocused ? colors.c_E94057 : colors.c_ADAFBB}
                  stroke={isFocused ? colors.c_E94057 : colors.c_ADAFBB}
                />
              );
            } else if (route.name === ScreenNames.MessengerScreen) {
              return (
                <IconMessenger
                  width={19}
                  height={19}
                  fill={isFocused ? colors.c_E94057 : colors.c_ADAFBB}
                  stroke={isFocused ? colors.c_E94057 : colors.c_ADAFBB}
                />
              );
            }
          };

          return (
            <TouchableOpacity
              key={String(index)}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.buttonNav}>
              <View
                style={[
                  styles.viewButton,
                  isFocused && styles.viewButtonBorder,
                ]}>
                <View>{renderIconMenu()}</View>
                {/* <Text style={isFocused ? styles.textNavSelected : styles.textNav}>
                {label}
              </Text> */}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  return (
    <Tab.Navigator
      initialRouteName={'homeTab'}
      tabBar={rest => <MyTabBar {...rest} />}>
      <Tab.Screen
        name={NavigatorName.Home}
        component={HomeTab}
        options={({route}) => ({
          gestureEnabled: false,
          headerShown: false,
          title: '',
          headerTransparent: true,
          // headerLeft: () => <Back type={'black'} props={route} />,
          // headerRight: () => <Filter type={'black'} props={route} />,
        })}
      />

      <Tab.Screen
        name={NavigatorName.MatchesTab}
        component={MatchesTab}
        options={({route}) => ({
          tabBarVisible: true,
          title: 'Favorite',
          headerShown: false,
        })}
      />

      <Tab.Screen
        name={ScreenNames.MessengerScreen}
        component={MessagerTab}
        options={({route}) => ({
          tabBarVisible: true,
          title: 'Messenger',
          headerShown: false,
        })}
      />

      <Tab.Screen
        name={NavigatorName.Profile}
        component={ProfileTab}
        options={({route}) => ({
          tabBarVisible: true,
          title: 'Profile',
          headerShown: false,
        })}
      />
    </Tab.Navigator>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopColor: colors.c_11be52,
    // borderTopWidth: 1,
  },
  buttonNav: {
    flex: 1,
    backgroundColor: 'white',
    height: 50,
    paddingTop: Platform.OS === 'ios' ? 10 : 5,
  },
  viewButton: {
    height: 40,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F3F3',
  },
  iconNav: {
    tintColor: '#888888',
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  iconNavSelected: {
    tintColor: '#11be52',
    width: 15,
    height: 15,
    resizeMode: 'contain',
  },
  textNav: {
    marginLeft: 5,
    fontWeight: '400',
    textAlign: 'center',
    fontSize: 12,
    color: '#888888',
  },
  textNavSelected: {
    marginLeft: 10,
    fontWeight: '400',
    textAlign: 'center',
    fontSize: 12,
    color: '#11be52',
  },
  viewButtonBorder: {},
});

export default TabNavigator;
