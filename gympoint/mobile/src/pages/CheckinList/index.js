import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, ActivityIndicator } from 'react-native';
import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';

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
    Space,
    SubmitButton,
} from '../../styles/app';

import Logo from '../../components/Logo';

export default function CheckinList() {
    const more = 20;
    const [limit, setLimit] = useState(more);
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
            dispatch(selectCheckinByStudentRequest({ id: idStudent, limit }));
        }

        loadPlans();
    }, [dispatch, idStudent]); /* eslint-disable-line */

    function makeCheckin() {
        dispatch(
            saveCheckinByStudentRequest({
                id: idStudent,
            })
        );
    }

    async function loadPlans() {
        setLimit(limit + more);
        dispatch(selectCheckinByStudentRequest({ id: idStudent, limit }));
    }

    function renderFooter() {
        if (!loading) return null;

        return (
            <View>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <View>
            {!loading ? (
                <Container>
                    <SubmitButton loading={loading} onPress={makeCheckin}>
                        Novo check-in
                    </SubmitButton>
                    <Space />
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
                        onEndReached={loadPlans}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={renderFooter}
                    />
                </Container>
            ) : (
                <Container>
                    <ActivityIndicator />
                </Container>
            )}
        </View>
    );
}

CheckinList.navigationOptions = () => ({
    headerTitle: <Logo />,
});
