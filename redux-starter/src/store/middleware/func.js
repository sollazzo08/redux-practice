//This middleware is called Thunk

const func = ({dispatch, getState}) => next => action => {
  //if action is a function then call it, if its an object pass it to next middleware function or the reducer
  if(typeof action === 'function')
    action(dispatch, getState)
  else 
    return next(action)  
}

export default func;