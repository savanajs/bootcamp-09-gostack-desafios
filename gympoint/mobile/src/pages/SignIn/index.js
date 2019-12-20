import React from 'react';
import { Image } from 'react-native';

import {
  Container, View, Form, FormInput, SubmitButton,
} from '../../styles/form';

import logo from '../../assets/logo-primary.png';

export default function SignIn() {
  return (
    <View>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            keyboardType="numeric"
            placeholder="Informe seu ID de cadastro"
          />
          <SubmitButton>
                    Entrar no sistema
          </SubmitButton>
        </Form>
      </Container>
    </View>
  );
}
