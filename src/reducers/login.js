const loginReducer = (state = {}, action) => {

    switch (action.type) {
        case 'LOG_IN':
            state = action.payload;
            return state;
        
        case 'LOG_OUT':
            return {};

        default:
            return state;
    }
}
export default loginReducer;