import React from 'react';
import {
  Image,
} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import QuestionList from './pages/QuestionList';
import QuestionForm from './pages/QuestionForm';
import CheckinList from './pages/CheckinList';
import Answer from './pages/Answer';

import logo from './assets/logo-primary.png';

export default (signedIn = true) => createAppContainer(
  createSwitchNavigator({
    Sign: createSwitchNavigator({
      SignIn,
    }),
    App: createBottomTabNavigator(
      {
        Checkin: {
          screen: createStackNavigator(
            {
              CheckinList,
            },
          ),
          navigationOptions: {
            headerTitle: (
              <Image
                resizeMode="cover"
                style={{
                  width: 135,
                  height: 24,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
                source={logo}
              />
            ),
            tabBarVisible: true,
            tabBarLabel: 'Check-ins',
            tabBarIcon: ({ focused }) => (
              <Icon
                focused={focused}
                name="location-on"
                size={20}
                color={focused ? '#ee4e62' : 'rgba(0,0,0,.3)'}
              />
            ),
            tabBarOptions: {
              activeTintColor: '#ee4e62',
            },
          },
        },
        Help: {
          screen: createStackNavigator(
            {
              QuestionList,
              QuestionForm,
              Answer,
            },
            {
              defaultNavigationOptions: {
                headerTransparent: false,
                headerTintColor: '#000',
                headerLeftContainerStyle: {
                  marginLeft: 20,
                },
              },
            },
          ),
          navigationOptions: {
            tabBarVisible: true,
            tabBarLabel: 'Pedir ajuda',
            tabBarIcon: ({ focused }) => (
              <Icon
                focused={focused}
                name="live-help"
                size={20}
                color={focused ? '#ee4e62' : 'rgba(0,0,0,.3)'}
              />
            ),
            tabBarOptions: {
              activeTintColor: '#ee4e62',
            },
          },
        },
      },
    ),
  },
  {
    initialRouteName: signedIn ? 'App' : 'Sign',
  }),
);
