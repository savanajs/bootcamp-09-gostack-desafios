import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container } from './styles';

import Logo from '../../components/Logo';

export default function QuestionList({ navigation }) {
  return (
    <View>
        <Container>
            <Text>QuestionList</Text>
        </Container>
    </View>
  );
}

QuestionList.navigationOptions = () => ({
  headerTitle: (
      <Logo />
  ),
});
