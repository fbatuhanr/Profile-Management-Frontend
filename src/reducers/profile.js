const profileReducer = (state = {}, action) => {

    switch (action.type) {
        case 'PROFILE_UPDATE':
            state = action.payload;
            return state;
        
        case 'LOG_OUT':
            return {};

        default:
            return state;
    }
}
export default profileReducer;