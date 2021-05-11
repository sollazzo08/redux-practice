// Ducks Patter
import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import users from './users';

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
    bugAssignToUser: (bugs, action) => {
      const {bugId, userId } = action.payload;
      const index = bugs.findIndex(bug => bug.id === bugId)
      bugs[index].userId = userId;
    }
  },
});

export const { bugAdded, bugResolved, bugAssignToUser} = slice.actions;
export default slice.reducer;

// Selector
// Memoization is a technique for optimization expensive functions
// bugs => get unresolved bugs from cache
export const getUnresolvedBugs = createSelector(
  state => state.entities.bugs,
  bugs => bugs.filter(bug => !bug.resolved)
)
//Selector for getting the bugs assigned to a user
export const getBugsByUser = userId => createSelector(
  state => state.entities.bugs,
  bugs => bugs.filter(bug => bug.userId === userId)
)


