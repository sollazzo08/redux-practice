// Ducks Patter
import { createAction, createReducer } from '@reduxjs/toolkit';

// Actions Creators

// export const bugAdded = (description) => ({
//   type:BUG_ADDED,
//   payload: {
//     description
//   },
// });

export const bugAdded = createAction('bugAdded')

// export const bugResolved = (id) => ({
//   type:BUG_RESOLVED,
//   payload: {
//     id,
//   },
// });

export const bugResolved = createAction('bugResolved')

export const bugRemoved = createAction('bugRemoved')


// Reducer 

//Job of reducers is to return new state based on an action
let lastId = 0;

export default createReducer([], {
  // key: value
  //actions: functions (event => event handler)

  [bugAdded.type]: (bugs, action) => {
    bugs.push({
      id: ++lastId,
      description: action.payload.description,
      resolved: false,
    })
  },
  [bugResolved.type]: (bugs, action) => {
    const index = bugs.findIndex(bug => bug.id === action.payload.id)
    bugs[index].resolved = true;
  }

})

