import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text } from 'react-native';
import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { signOut } from '../../store/modules/auth/actions';
import {
    selectCheckinByStudentRequest,
    saveCheckinByStudentRequest,
} from '../../store/modules/checkin/actions';

import {
    Container,
    View,
    CustomCard,
    CustomCardHeader,
    CustomCardHeaderTextLeft,
    CustomCardHeaderTextRight,
    List,
} from '../../styles/app';

import { SubmitButton } from '../../styles/form';

import Logo from '../../components/Logo';

export default function CheckinList() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.checkin.loading);
    const idStudent = useSelector(state => state.auth.student.id);

    const checkins = useSelector(state =>
        state.checkin.checkins.map(item => ({
            ...item,
            createdAt: `há ${distanceInWords(item.createdAt, new Date(), {
                includeSeconds: true,
                locale: pt,
            })}`,
        }))
    );

    useEffect(() => {
        async function loadPlans() {
            dispatch(selectCheckinByStudentRequest({ id: idStudent }));
        }

        loadPlans();
    }, [dispatch, idStudent]);

    function handleCancel() {
        dispatch(signOut());
    }

    function makeCheckin() {
        dispatch(
            saveCheckinByStudentRequest({
                id: idStudent,
            })
        );
    }

    return (
        <View>
            {!loading ? (
                <Container>
                    <SubmitButton loading={loading} onPress={makeCheckin}>
                        Novo check-in
                    </SubmitButton>
                    <List
                        data={checkins}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item, index }) => (
                            <CustomCard>
                                <CustomCardHeader>
                                    <CustomCardHeaderTextLeft>
                                        <Text>Check-in # {index + 1}</Text>
                                    </CustomCardHeaderTextLeft>
                                    <CustomCardHeaderTextRight>
                                        <Text>{item.createdAt}</Text>
                                    </CustomCardHeaderTextRight>
                                </CustomCardHeader>
                            </CustomCard>
                        )}
                    />
                    <SubmitButton onPress={handleCancel}>Logout</SubmitButton>
                </Container>
            ) : (
                <Container>
                    <Text>Loading...</Text>
                </Container>
            )}
        </View>
    );
}

CheckinList.navigationOptions = () => ({
    headerTitle: <Logo />,
});
