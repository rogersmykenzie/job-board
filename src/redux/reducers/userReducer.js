//initial state
const initialState = {
    user: {}
}
//constants
const UPDATE_USER = "UPDATE_USER"
//action creators
export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payload: user
    }
}
//reducer
export default function reducer(state=initialState, action) {
    switch(action.type) {
        case UPDATE_USER:
            return {
                ...state,
                user: action.payload
            }
        default: return state;
    }
}