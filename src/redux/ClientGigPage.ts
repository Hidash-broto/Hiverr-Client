import { createSlice } from "@reduxjs/toolkit";

const gigPage = createSlice({
    name: 'gigPage',
    initialState: {gigPage: 'Backend Development'},
    reducers: {
        gigPageList: (state, action) => {
            state.gigPage = action.payload
        }
    }
})

export const { gigPageList } = gigPage.actions;
export default gigPage.reducer