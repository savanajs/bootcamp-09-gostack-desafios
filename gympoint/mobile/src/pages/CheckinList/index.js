import React from 'react';
import {
  Text, TouchableOpacity,
} from 'react-native';

import {
  Container, View, CustomButton, CustomCard, CustomCardHeader, CustomCardHeaderTextLeft, CustomCardHeaderTextRight, CustomCardContent,
} from '../../styles/app';

import Logo from '../../components/Logo';

export default function CheckinList({ navigation }) {
  return (
    <View>
      <Container>
        <TouchableOpacity>
          <CustomButton>Novo check-in</CustomButton>
        </TouchableOpacity>
        <CustomCard>
          <CustomCardHeader>
            <CustomCardHeaderTextLeft>
              <Text>Check-in #1</Text>
            </CustomCardHeaderTextLeft>
            <CustomCardHeaderTextRight>
              <Text>Hoje às 14h</Text>
            </CustomCardHeaderTextRight>
          </CustomCardHeader>
        </CustomCard>
      </Container>
    </View>
  );
}

CheckinList.navigationOptions = () => ({
  headerTitle: (
    <Logo />
  ),
});
