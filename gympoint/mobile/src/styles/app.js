import { Platform } from 'react-native';
import styled from 'styled-components/native';
import Button from '../components/Button';

export const View = styled.View`
    flex: 1;
    background-color: #f5f5f5;
    padding: 20px;
`;

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  `;

export const CustomButton = styled(Button)`
    margin-bottom: 20px;
`;

export const CustomCard = styled.View`
    background-color: #ffffff;
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 20px;
    margin-bottom: 20px;
`;

export const CustomCardHeader = styled.View`
    flex-direction: row;
`;

export const CustomCardHeaderTextLeft = styled.View`
    flex: 1;
`;

export const CustomCardHeaderTextRight = styled.View`
    flex: 1;
    align-items: flex-end;
`;

export const CustomCardContent = styled.Text`
    margin-top: 20px;
    line-height: 20;
`;

export const Space = styled.View`
    height: 20px;
`;
