import React from 'react';
import { Text } from 'react-native';

import { Formik } from 'formik';
import * as Yup from 'yup';

import {
  SubmitButton, Background, FormTextarea, ContainerSecondary, FormSecondary,
} from './styles';

import Logo from '../../components/Logo';

const validationSchema = Yup.object().shape({
  question: Yup.string()
    .label('question')
    .required('O campo é obrigatório'),
});

export default function QuestionForm() {
  const loading = false;

  function onSubmit({ question }) {
    alert(question);
  }

  return (
    <Background>
      <ContainerSecondary>
        <FormSecondary onSubmit={onSubmit}>
          <Formik
            initialValues={{ question: '' }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({
              values, handleChange, errors, touched, handleSubmit, isValid,
            }) => (
              <React.Fragment>
                <FormTextarea
                  value={values.question}
                  numberOfLines={10}
                  multiline
                  placeholder="Inclua seu pedido de auxilio"
                  onChangeText={handleChange('question')}
                />
                {touched.question && errors.question
                && <Text style={{ color: 'red' }}>{errors.question}</Text>
                }
                <SubmitButton
                  loading={loading}
                  disabled={!isValid}
                  onPress={handleSubmit}
                >
                    Enviar pedido
                </SubmitButton>
              </React.Fragment>
            )}
          </Formik>
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
