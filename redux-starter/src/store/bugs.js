// Ducks Patter
import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

let lastId = 0;

const slice = createSlice({
  name: 'bugs',
  initialState: [],
  reducers: {
    // property that maps actions to actions handlers
    bugAdded: (bugs, action) => {
      bugs.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },
    bugResolved: (bugs, action) => {
      const index = bugs.findIndex((bug) => bug.id === action.payload.id);
      bugs[index].resolved = true;
    },
  },
});



export const { bugAdded, bugResolved } = slice.actions;
export default slice.reducer;


// Selector
// Memoization is a technique for optimization expensive functions
// bugs => get unresolved bugs from cache
export const getUnresolvedBugs = createSelector(
  state => state.entities.bugs,
  bugs => bugs.filter(bug => !bug.resolved)
)

// Actions Creators

// export const bugAdded = (description) => ({
//   type:BUG_ADDED,
//   payload: {
//     description
//   },
// });

// export const bugResolved = (id) => ({
//   type:BUG_RESOLVED,
//   payload: {
//     id,
//   },
// });

// export const bugAdded = createAction('bugAdded')
// export const bugResolved = createAction('bugResolved')
// export const bugRemoved = createAction('bugRemoved')

/*
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
*/
