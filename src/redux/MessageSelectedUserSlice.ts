import { createSlice } from "@reduxjs/toolkit";

const MesssageSelectedUser = createSlice({
    name: 'messageSelectedUser',
    initialState: { user: ''},
    reducers: {
        MessageUserChange: (state, action) => {
            state.user = action.payload
        }
    }
})

export const {MessageUserChange} = MesssageSelectedUser.actions;
export default MesssageSelectedUser.reducer;