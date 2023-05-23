import { createSlice } from "@reduxjs/toolkit";

const freelancerPage = createSlice({
    name: 'freelancerPage',
    initialState: {page: 'Dashboard'},
    reducers: {
        freelancerPageChange: (state, action) => {
            state.page = action.payload;
        }
    }
})

export const {freelancerPageChange} = freelancerPage.actions;
export default freelancerPage.reducer;