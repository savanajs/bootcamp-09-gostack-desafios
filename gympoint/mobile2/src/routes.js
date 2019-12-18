import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Auth from './pages/Auth';
import QuestionList from './pages/QuestionList';
import QuestionForm from './pages/QuestionForm';
import CheckinList from './pages/CheckinList';
import Answer from './pages/Answer';

const Routes = createAppContainer(
    createStackNavigator({
        Auth,
        QuestionList,
        QuestionForm,
        CheckinList,
        Answer
    },
    {
        headerLayoutPreset: 'center',
        headerBackTitleVisible: false,
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#7159c1',
            },
            headerTintColor: '#FFF'
        }
    })
);

export default Routes;
