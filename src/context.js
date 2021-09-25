import React, { Component } from 'react'
import axios from 'axios';

// -Provider -Consumer
const UserContext = React.createContext();

// Creating reducer
const reducer = (state, action) => {
    switch (action.type) {
        case "DELETE_USER":
            axios.delete("http://localhost:3004/users/"+action.payload)
            return {
                ...state,
                users: state.users.filter(user => action.payload !== user.id)
            }
        default:
            return state;
    }
}

const UserConsumer = UserContext.Consumer;
export default UserConsumer;