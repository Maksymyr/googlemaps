import InitialState from '../constants/InitialState';
import * as types from '../constants/ActionTypes';

export default function addresses(state = InitialState.addresses, action) {
    let {type, payload} = action;

    switch(type) {
    case types.ADD_ADDRESS:
        return [...state, payload] 
    case types.ADD_MONGO:
        return [...state, payload];
    case types.DEL_ADDRESS:
        return state.filter(item => item._id != payload._id);
    default:
        return state;
    }
};