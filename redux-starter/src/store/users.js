import { createSlice } from '@reduxjs/toolkit';

let lastId = 0;
const slice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    addUser: (users, action) => {
      users.push({
        id: ++lastId,
        username: action.payload.username,
        assignedBugs 
      })

    }
  }
})

export const { addUser } = slice.actions 
export default slice.reducer