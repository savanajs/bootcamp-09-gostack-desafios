import { combineReducers } from 'redux';

import auth from './auth/reducer';
import checkin from './checkin/reducer';
import help from './help/reducer';

export default combineReducers({
    auth,
    checkin,
    help,
});
