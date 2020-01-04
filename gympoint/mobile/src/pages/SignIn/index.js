import React from 'react';
import { Image, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { signInRequest } from '../../store/modules/auth/actions';

import { Container, View, FormInput, FormWrap, SubmitButton } from './styles';

import logo from '../../assets/logo-primary.png';

const validationSchema = Yup.object().shape({
    idStudent: Yup.string()
        .label('ID')
        .required('O campo ID é obrigatório'),
});

export default function SignIn() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);

    function onSubmit({ idStudent }) {
        dispatch(signInRequest(idStudent));
    }

    return (
        <View>
            <Container>
                <Image source={logo} />
                <FormWrap onSubmit={onSubmit}>
                    <Formik
                        initialValues={{ idStudent: '' }}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({
                            values,
                            handleChange,
                            errors,
                            touched,
                            handleSubmit,
                            isValid,
                        }) => (
                            <React.Fragment>
                                <FormInput
                                    value={values.idStudent}
                                    keyboardType="numeric"
                                    placeholder="Informe seu ID de cadastro"
                                    onChangeText={handleChange('idStudent')}
                                />
                                {touched.idStudent && errors.idStudent && (
                                    <Text style={{ color: 'red' }}>
                                        {errors.idStudent}
                                    </Text>
                                )}
                                <SubmitButton
                                    title="Sign In"
                                    disabled={!isValid}
                                    loading={loading}
                                    onPress={handleSubmit}
                                >
                                    Entrar no sistema
                                </SubmitButton>
                            </React.Fragment>
                        )}
                    </Formik>
                </FormWrap>
            </Container>
        </View>
    );
}
