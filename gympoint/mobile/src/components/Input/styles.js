import styled from 'styled-components/native';
import { Form, TextValidator } from 'react-native-validator-form';

export const Container = styled.View`
    padding: 0 15px;
    height: 46px;
    background: #fff;
    border-radius: 4px;
    flex-direction: row;
    align-items: center;
    border: 1px solid #ccc;
`;

export const TInput = styled.TextInput`
    flex: 1;
    font-size: 15px;
    margin-left: 10px;
    color: #444;
`;
