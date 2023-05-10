import { createSlice } from "@reduxjs/toolkit";

const gigSlice = createSlice({
    name: 'gigPage',
    initialState: { pageNumber: 0,gig:{}},
    reducers: {
        gigPageChange: (state, action) => {
            state.pageNumber = action.payload;
        },
        gigDt: (state, action) => {
            state.gig = action.payload
        }
    }
})

export const { gigPageChange, gigDt } = gigSlice.actions;
export default gigSlice.reducer;