import React from 'react';
import {
  View, Text, TouchableOpacity,
} from 'react-native';

import { Container } from './styles';

import Logo from '../../components/Logo';

export default function CheckinList({ navigation }) {
  return (
    <View>
        <Container>
            <Text>CheckinList</Text>
        </Container>
    </View>
  );
}

CheckinList.navigationOptions = () => ({
  headerTitle: (
    <Logo />
  ),
});
