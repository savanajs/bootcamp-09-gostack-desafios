import React from 'react';
import {
  Text, TouchableOpacity,
} from 'react-native';

import {
  Container, View, CustomButton, Space, CustomCard, CustomCardHeader, CustomCardHeaderTextLeft, CustomCardHeaderTextRight, CustomCardContent,
} from '../../styles/app';

import Logo from '../../components/Logo';

export default function Answer({ navigation }) {
  return (
    <View>
      <Container>
        <TouchableOpacity>
          <CustomButton>Novo pedido de auxilio</CustomButton>
        </TouchableOpacity>
        <CustomCard>
          <CustomCardHeader>
            <CustomCardHeaderTextLeft>
              <Text>Pergunta</Text>
            </CustomCardHeaderTextLeft>
            <CustomCardHeaderTextRight>
              <Text>Hoje às 14h</Text>
            </CustomCardHeaderTextRight>
          </CustomCardHeader>
          <CustomCardContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae sequi sed, vel recusandae accusantium rem ipsam dolore natus, totam excepturi voluptatum amet! Amet non cum modi sapiente laboriosam? Nihil, enim.
          </CustomCardContent>
          <Space />
          <CustomCardHeader>
            <CustomCardHeaderTextLeft>
              <Text>Resposta</Text>
            </CustomCardHeaderTextLeft>
            <CustomCardHeaderTextRight>
              <Text>Hoje às 14h</Text>
            </CustomCardHeaderTextRight>
          </CustomCardHeader>
          <CustomCardContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae sequi sed, vel recusandae accusantium rem ipsam dolore natus, totam excepturi voluptatum amet! Amet non cum modi sapiente laboriosam? Nihil, enim.
          </CustomCardContent>
        </CustomCard>
      </Container>
    </View>
  );
}

Answer.navigationOptions = () => ({
  headerTitle: (
    <Logo />
  ),
});
