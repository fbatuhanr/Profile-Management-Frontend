import loginReducer from "./login";
import profileReducer from "./profile";

import { combineReducers } from 'redux';

const allReducers = combineReducers(
    {
        user_info: loginReducer,
        profile_info: profileReducer
    }
)

export default allReducers;