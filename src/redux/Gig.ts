import { createSlice } from "@reduxjs/toolkit";

const gigSlice = createSlice({
    name: 'gigPage',
    initialState: { pageNumber: 0},
    reducers: {
        gigPageChange: (state, action) => {
            state.pageNumber = action.payload;
        }
    }
})

export const { gigPageChange } = gigSlice.actions;
export default gigSlice.reducer;