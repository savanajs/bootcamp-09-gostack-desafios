import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Button from '../../components/Button';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';

export const View = styled.View`
    background-color: #fff;
`;

export const Background = styled.View`
    flex: 1;
    background-color: #f5f5f5;
    justify-content: flex-end;
`;

export const Container = styled.KeyboardAvoidingView.attrs({
    enabled: Platform.OS === 'ios',
    behavior: 'padding',
})`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
`;

export const ContainerSecondary = styled.KeyboardAvoidingView.attrs({
    enabled: Platform.OS === 'ios',
    behavior: 'padding',
})`
    flex: 1;
    padding: 0 30px;
`;

export const Form = styled.View`
    align-self: stretch;
    margin-top: 50px;
`;

export const FormSecondary = styled.View`
    margin-top: 20px;
`;

export const FormInput = styled(Input)`
    margin-bottom: 10px;
`;

export const FormTextarea = styled(Textarea)`
    margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
    margin-top: 5px;
`;
