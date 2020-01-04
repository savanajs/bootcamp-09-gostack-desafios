import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text } from 'react-native';

import { Formik } from 'formik';
import * as Yup from 'yup';

import {
    SubmitButton,
    Background,
    FormTextarea,
    ContainerSecondary,
    FormSecondary,
} from './styles';

import { saveHelpByStudentRequest } from '../../store/modules/help/actions';

import Logo from '../../components/Logo';

const validationSchema = Yup.object().shape({
    question: Yup.string()
        .label('question')
        .required('O campo é obrigatório'),
});

export default function QuestionForm({ navigation }) {
    const dispatch = useDispatch();
    const idStudent = useSelector(state => state.auth.student.id);
    // const loading = useSelector(state => state.help.loading);
    const [loadingAction, setLoadingAction] = useState(false);

    async function onSubmit({ question }) {
        setLoadingAction(true);

        await dispatch(
            saveHelpByStudentRequest({
                id: idStudent,
                question,
                navigation,
            })
        );

        setLoadingAction(false);
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
                            values,
                            handleChange,
                            errors,
                            touched,
                            handleSubmit,
                            isValid,
                        }) => (
                            <React.Fragment>
                                <FormTextarea
                                    value={values.question}
                                    numberOfLines={10}
                                    multiline
                                    placeholder="Inclua seu pedido de auxilio"
                                    onChangeText={handleChange('question')}
                                />
                                {touched.question && errors.question && (
                                    <Text style={{ color: 'red' }}>
                                        {errors.question}
                                    </Text>
                                )}
                                <SubmitButton
                                    loading={loadingAction}
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
    headerTitle: <Logo />,
});
