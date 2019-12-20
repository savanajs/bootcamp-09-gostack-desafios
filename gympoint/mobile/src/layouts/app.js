import React from 'react';
import {
  Image, TouchableOpacity, View, Text,
} from 'react-native';

import logo from '../assets/logo-secondary.png';

export default function App({ children }) {
  return (
    <View>
        { children }
    </View>
  );
}

App.navigationOptions = ({ navigation }) => ({
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
  headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Dashboard');
          }}
         />
  ),
});
