import React from 'react';
import { Image } from 'react-native';

import {
  Container, View, Form, FormInput, SubmitButton, Background, FormTextarea, ContainerSecondary, FormSecondary,
} from '../../styles/form';

import Logo from '../../components/Logo';

export default function QuestionForm() {
  return (
    <Background>
      <ContainerSecondary>
        <FormSecondary>
          <FormTextarea
            numberOfLines={10}
            multiline
            placeholder="Inclua seu pedido de auxilio"
          />
          <SubmitButton>
            Entrar no sistema
          </SubmitButton>
        </FormSecondary>
      </ContainerSecondary>
    </Background>
  );
}

QuestionForm.navigationOptions = () => ({
  headerTitle: (
    <Logo />
  ),
});
