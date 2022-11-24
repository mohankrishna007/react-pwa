import { configureStore } from "@reduxjs/toolkit";
import ProfileReducer  from './ProfileSlice';
import ErrorReducer from './ErrorSlice';

const store = configureStore({
    reducer: {
        profile: ProfileReducer,
        error: ErrorReducer,
    }
});

export default store;