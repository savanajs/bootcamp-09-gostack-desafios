import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Text,
  TouchableOpacity,
} from 'react-native';

import { selectHelpsByStudentRequest } from '../../store/modules/help/actions';

import {
  Container,
  View,
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
  const helps = useSelector(state => state.help.helps);
  const idStudent = useSelector(state => state.auth.student.id);

  useEffect(() => {
    async function loadPlans() {
      dispatch(selectHelpsByStudentRequest({ id: idStudent }));
    }

    loadPlans();
  }, []);

  return (
    <View>
      <Container>
        <TouchableOpacity>
          <CustomButton>Novo pedido de auxilio</CustomButton>
        </TouchableOpacity>
        <List
          data={helps}
          keyExtractor={item => String(item.id)}
          renderItem={({ item, index }) => (
            <CustomCard>
              <CustomCardHeader>
                <CustomCardHeaderTextLeft>
                  <Text>Sem resposta</Text>
                </CustomCardHeaderTextLeft>
                <CustomCardHeaderTextRight>
                  <Text>{item.createdAt}</Text>
                </CustomCardHeaderTextRight>
              </CustomCardHeader>
              <CustomCardContent>
                {item.question}
              </CustomCardContent>
            </CustomCard>
          )}
        />
      </Container>
    </View>
  );
}

QuestionList.navigationOptions = () => ({
  headerTitle: (
    <Logo />
  ),
});
