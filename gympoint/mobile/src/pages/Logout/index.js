import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Text } from 'react-native';

import { Container, View } from '../../styles/app';

import Logo from '../../components/Logo';

import { signOut } from '../../store/modules/auth/actions';

export default function Logout() {
    const dispatch = useDispatch();

    useEffect(() => {
        async function logout() {
            dispatch(signOut());
        }

        logout();
    }, [dispatch]);

    return (
        <View>
            <Container>
                <Text>Saindo....</Text>
            </Container>
        </View>
    );
}

Logout.navigationOptions = () => ({
    headerTitle: <Logo />,
});
