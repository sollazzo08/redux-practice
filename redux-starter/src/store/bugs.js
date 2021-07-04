// Ducks Pattern
import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';
import moment from 'moment';


const slice = createSlice({
  name: 'bugs',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null, //useful for implement caching
  },
  //automatically creates an action because of reduxjs/toolkit
  reducers: {
    bugsRequestedFailed: (bugs, action) => {
      bugs.loading = false;
    },
    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },
    // property that maps actions to actions handlers
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now()
    },
    /*Redux tool/kit automatically creates an action for us called bugAdded 
      * command - event    (command - represents an instruction. event - represents what just happened)
      * addBug - bugAdded (two actions with similar names)
    */
    bugAdded: (bugs, action) => {
      bugs.list.push(action.payload);
    },
    // resolveBug (command) - bugResolved (event)  
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },
    bugAssignToUser: (bugs, action) => {
      const { id: bugId, userId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].userId = userId;
    },
  },
});

export const {
  bugAdded,
  bugResolved,
  bugAssignToUser,
  bugsReceived,
  bugsRequested,
  bugsRequestedFailed,
} = slice.actions;
export default slice.reducer;

//ACTION CREATORS aka (instructions)
const url = '/bugs';

//dispatching and api load action
export const loadBugs = () => (dispatch, getState) => {

  const {lastFetch} = getState().entities.bugs;

  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')

  if(diffInMinutes < 10) return 
  
  dispatch(apiCallBegan({
    url,
    onStart: bugsRequested.type,
    onSuccess: bugsReceived.type,
    onError: bugsRequestedFailed.type
  }));
}

export const addBug = bug => apiCallBegan({
  url,
  method: "post",
  data: bug,
  onSuccess: bugAdded.type
})

export const resolveBug = id => apiCallBegan({
  url: url + '/' + id,
  method: "patch",
  data: {resolved: true},
  onSuccess: bugResolved.type
})

export const assignBugToUser = (bugId, userId)=> apiCallBegan({
  url: url + '/' + bugId,
  method: "patch",
  data: {userId},
  onSuccess: bugAssignToUser.type
})



// Selector
// Memoization is a technique for optimization expensive functions
// bugs => get unresolved bugs from cache
export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.filter((bug) => !bug.resolved)
);
//Selector for getting the bugs assigned to a user
export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );
