import React from 'react';
import { Text } from 'react-native';

import {
    Container,
    View,
    Space,
    CustomCard,
    CustomCardHeader,
    CustomCardHeaderTextLeft,
    CustomCardHeaderTextRight,
    CustomCardContent,
    Strong,
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
                            <Strong>Pergunta</Strong>
                        </CustomCardHeaderTextLeft>
                        <CustomCardHeaderTextRight>
                            <Text>{question.createdAt}</Text>
                        </CustomCardHeaderTextRight>
                    </CustomCardHeader>
                    <CustomCardContent>{question.question}</CustomCardContent>
                    {question.answer ? (
                        <>
                            <Space />
                            <CustomCardHeader>
                                <CustomCardHeaderTextLeft>
                                    <Strong>Resposta</Strong>
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
                        <>
                            <Space />
                            <CustomCardContent>
                                Ainda não tem resposta para essa pergunta
                            </CustomCardContent>
                        </>
                    )}
                </CustomCard>
            </Container>
        </View>
    );
}

Answer.navigationOptions = () => ({
    headerTitle: <Logo />,
});
