import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container } from './styles';

export default function QuestionForm() {
  return (
    <View>
        <Container>
            <Text>QuestionForm</Text>
        </Container>
    </View>
  );
}

QuestionForm.navigationOptions = ({ navigation }) => ({
  title: 'Pedir ajuda',
  headerLeft: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Dashboard');
            }}
          >
            <Icon name="chevron-left" size={20} color="#FFF" />
          </TouchableOpacity>
  ),
});
