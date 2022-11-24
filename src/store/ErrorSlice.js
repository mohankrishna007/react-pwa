import { createSlice } from "@reduxjs/toolkit";

const initialState =  {
    error: false,
};

const ErrorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        updateErrorState(state, action){
            state.error = action.payload
        },
    }
})

export const actions = ErrorSlice.actions;
export default ErrorSlice.reducer;
