import React from 'react';
import {
  Text,
} from 'react-native';

import {
  Container, View, Space, CustomCard, CustomCardHeader, CustomCardHeaderTextLeft, CustomCardHeaderTextRight, CustomCardContent,
} from '../../styles/app';

import Logo from '../../components/Logo';

export default function Answer({ navigation }) {
  const question = navigation.getParam('question');

  return (
    <View>
      <Container>
        <CustomCard>
          <CustomCardHeader>
            <CustomCardHeaderTextLeft>
              <Text>Pergunta</Text>
            </CustomCardHeaderTextLeft>
            <CustomCardHeaderTextRight>
              <Text>{question.createdAt}</Text>
            </CustomCardHeaderTextRight>
          </CustomCardHeader>
          <CustomCardContent>
            {question.question}
          </CustomCardContent>
          {(question.answer) ? (
            <>
              <Space />
              <CustomCardHeader>
                <CustomCardHeaderTextLeft>
                  <Text>Resposta</Text>
                </CustomCardHeaderTextLeft>
                <CustomCardHeaderTextRight>
                  <Text>{question.answer_at}</Text>
                </CustomCardHeaderTextRight>
              </CustomCardHeader>
              <CustomCardContent>
                {question.answer}
              </CustomCardContent>
            </>
          ) : (
            <Text />
          )}
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
