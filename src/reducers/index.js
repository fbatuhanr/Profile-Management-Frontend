import loginReducer from "./login"

import { combineReducers } from 'redux';

const allReducers = combineReducers(
    {
        user_info: loginReducer
    }
)

export default allReducers;