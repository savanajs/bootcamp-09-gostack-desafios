import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Button from '../../components/Button';
import Input from '../../components/Input';

export const View = styled.View`
    flex: 1;
    background-color: #fff;
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

export const FormWrap = styled.View`
    align-self: stretch;
    margin-top: 50px;
`;

export const FormInput = styled(Input)`
    margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
    margin-top: 5px;
`;
