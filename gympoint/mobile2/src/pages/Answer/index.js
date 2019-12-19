import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container } from './styles';

export default function Answer() {
  return (
    <View>
        <Container>
            <Text>Answer</Text>
        </Container>
    </View>
  );
}

Answer.navigationOptions = ({ navigation }) => ({
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
