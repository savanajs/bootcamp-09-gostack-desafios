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
            tabBarIcon: (
              <Icon
                name="add-circle-outline"
                size={20}
                color="rgba(0,0,0,1)"
              />
            ),
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
            tabBarLabel: 'Agendar',
            tabBarIcon: (
              <Icon
                name="add-circle-outline"
                size={20}
                color="rgba(0,0,0,1)"
              />
            ),
          },
        },
      },
    ),
  },
  {
    initialRouteName: signedIn ? 'App' : 'Sign',
  }),
);
