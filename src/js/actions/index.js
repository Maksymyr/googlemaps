import * as types from '../constants/ActionTypes';

export const addAddress = (payload) => ({type: types.ADD_ADDRESS, payload}); 
export const addMongo = (payload) => ({type: types.ADD_MONGO, payload});
export const delAddress = (payload) => ({type: types.DEL_ADDRESS, payload});
