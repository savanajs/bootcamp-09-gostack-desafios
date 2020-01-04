import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Text, TouchableOpacity } from 'react-native';

import { selectHelpsByStudentRequest } from '../../store/modules/help/actions';

import {
    Container,
    View,
    TextSuccess,
    CustomButton,
    CustomCard,
    CustomCardHeader,
    CustomCardHeaderTextLeft,
    CustomCardHeaderTextRight,
    CustomCardContent,
    List,
} from '../../styles/app';

import Logo from '../../components/Logo';

export default function QuestionList({ navigation }) {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.help.loading);
    const helps = useSelector(state =>
        state.help.helps.map(item => ({
            ...item,
            createdAt: `há ${distanceInWords(item.createdAt, new Date(), {
                includeSeconds: true,
                locale: pt,
            })}`,
            answer_at: `há ${distanceInWords(item.answer_at, new Date(), {
                includeSeconds: true,
                locale: pt,
            })}`,
        }))
    );
    const idStudent = useSelector(state => state.auth.student.id);

    useEffect(() => {
        async function loadPlans() {
            dispatch(selectHelpsByStudentRequest({ id: idStudent }));
        }

        loadPlans();
    }, [dispatch, idStudent]);

    return (
        <View>
            {!loading ? (
                <Container>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('QuestionForm')}
                    >
                        <CustomButton>Novo pedido de auxilio</CustomButton>
                    </TouchableOpacity>
                    <List
                        data={helps}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('Answer', {
                                        question: item,
                                    })
                                }
                            >
                                <CustomCard>
                                    <CustomCardHeader>
                                        <CustomCardHeaderTextLeft>
                                            {!item.answer ? (
                                                <Text>
                                                    <Icon
                                                        name="check-circle"
                                                        size={11}
                                                        color="rgba(0,0,0,.6)"
                                                    />{' '}
                                                    Sem respostas
                                                </Text>
                                            ) : (
                                                <TextSuccess>
                                                    <Icon
                                                        name="check-circle"
                                                        size={11}
                                                    />{' '}
                                                    Resposta
                                                </TextSuccess>
                                            )}
                                        </CustomCardHeaderTextLeft>
                                        <CustomCardHeaderTextRight>
                                            <Text>{item.createdAt}</Text>
                                        </CustomCardHeaderTextRight>
                                    </CustomCardHeader>
                                    <CustomCardContent>
                                        {item.question}
                                    </CustomCardContent>
                                </CustomCard>
                            </TouchableOpacity>
                        )}
                    />
                </Container>
            ) : (
                <Container>
                    <Text>Loading...</Text>
                </Container>
            )}
        </View>
    );
}

QuestionList.navigationOptions = () => ({
    headerTitle: <Logo />,
});
