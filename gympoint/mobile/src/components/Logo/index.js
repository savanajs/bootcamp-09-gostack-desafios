import React from 'react';
import { Image, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import logo from '../../assets/logo-secondary.png';

import { Container } from './styles';

export default function Logo() {
    return (
        <Image
            resizeMode="cover"
            style={{
                width: 135,
                height: 24,
                resizeMode: 'contain',
                alignSelf: 'center',
                marginLeft: 'auto',
                marginRight: 'auto',
            }}
            source={logo}
        />
    );
}
