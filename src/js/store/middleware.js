import * as types from '../constants/ActionTypes'

const middleware = store => next => action => {
    next(action);
    const data = action.payload;
    if(action.type == types.ADD_ADDRESS) {
        fetch('/save', {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }).then((res) => {
            console.log("this is res", res)
          }).catch((err) => {
            console.log(err)
          })
    }
    if(action.type == types.DEL_ADDRESS) {
      fetch('/del', {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }).then((res) => {
          console.log("this is res", res)
        }).catch((err) => {
          console.log(err)
        })
  }

    return;
}
export default middleware;