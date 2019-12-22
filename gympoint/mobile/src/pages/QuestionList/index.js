import React from 'react';
import {
  Text, TouchableOpacity,
} from 'react-native';

import {
  Container, View, CustomButton, CustomCard, CustomCardHeader, CustomCardHeaderTextLeft, CustomCardHeaderTextRight, CustomCardContent, List,
} from '../../styles/app';

import Logo from '../../components/Logo';

export default function QuestionList({ navigation }) {
  return (
    <View>
      <Container>
        <TouchableOpacity>
          <CustomButton>Novo pedido de auxilio</CustomButton>
        </TouchableOpacity>
        <List
          data={[{}, {}]}
          renderItem={() => (
            <CustomCard>
              <CustomCardHeader>
                <CustomCardHeaderTextLeft>
                  <Text>Sem resposta</Text>
                </CustomCardHeaderTextLeft>
                <CustomCardHeaderTextRight>
                  <Text>Hoje às 14h</Text>
                </CustomCardHeaderTextRight>
              </CustomCardHeader>
              <CustomCardContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae sequi sed, vel recusandae accusantium rem ipsam dolore natus, totam excepturi voluptatum amet! Amet non cum modi sapiente laboriosam? Nihil, enim.
              </CustomCardContent>
            </CustomCard>
          )}
        />
      </Container>
    </View>
  );
}

QuestionList.navigationOptions = () => ({
  headerTitle: (
    <Logo />
  ),
});
