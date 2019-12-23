import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, TouchableOpacity } from 'react-native';

import { signOut } from '../../store/modules/auth/actions';
import { selectCheckinByStudentRequest } from '../../store/modules/checkin/actions';

import {
  Container,
  View,
  CustomButton,
  CustomCard,
  CustomCardHeader,
  CustomCardHeaderTextLeft,
  CustomCardHeaderTextRight,
  List,
} from '../../styles/app';

import {
  SubmitButton,
} from '../../styles/form';

import Logo from '../../components/Logo';

export default function CheckinList({ navigation }) {
  const dispatch = useDispatch();
  const signed = useSelector(state => state.auth.signed);
  const idStudent = useSelector(state => state.auth.student.id);
  const checkins = useSelector(state => state.checkin.checkins);

  useEffect(() => {
    async function loadPlans() {
      dispatch(selectCheckinByStudentRequest({ id: idStudent }));
    }

    loadPlans();
  }, []);

  function handleCancel() {
    dispatch(signOut());
  }

  return (
    <View>
      <Container>
        <TouchableOpacity>
          <CustomButton>Novo check-in</CustomButton>
        </TouchableOpacity>
        <List
          data={checkins}
          keyExtractor={item => String(item.id)}
          renderItem={({ item, index }) => (
            <CustomCard>
              <CustomCardHeader>
                <CustomCardHeaderTextLeft>
                  <Text>
                    Check-in #
                    {' '}
                    {index + 1}
                  </Text>
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
    </View>
  );
}

CheckinList.navigationOptions = () => ({
  headerTitle: (
    <Logo />
  ),
});
