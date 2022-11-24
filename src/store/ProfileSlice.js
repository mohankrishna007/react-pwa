import { createSlice } from "@reduxjs/toolkit";

const initialState =  {
    email: "",
    about: null,
    academics: null,
    finance: null,
    preference: null
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        addUserEmail(state, action){
            state.email = action.payload
        },
        addAboutData(state, action){
            state.about = action.payload
        },
        addAcademicsData(state, action){
            state.academics = action.payload
        },
        addFinanceData(state, action){
            state.finance = action.payload
        },
        addPreferenceData(state, action){
            state.preference = action.payload
        },
    }
})

export const actions = profileSlice.actions;
export default profileSlice.reducer;
