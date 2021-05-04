import * as actions from './actionTypes';

//Job of reducers is to return new state based on an action

let lastId = 0;

// In redux reducers have to be pure
export default function reducer(state = [], action) {
  switch (action.type) {
    case actions.BUG_ADDED:
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];

    case actions.BUG_REMOVED:
      return state.filter((bug) => bug.id !== action.payload.id);

    case actions.BUG_RESOLVED:
      return state.map(bug => bug.id !== action.payload.id ? bug : {...bug, resolved: true})
      
    default:
      return state;
  }
}
