import * as types from '../constants/ActionTypes'

const middleware = store => next => action => {
    next(action);

    return;
}
export default middleware;