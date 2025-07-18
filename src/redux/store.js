import { configureStore } from "@reduxjs/toolkit";
import consumptionReducer from "./slices/consumptionSlice";
import authReducer from './slices/authSlice';
import userReducer from "./slices/userSlice"; 

export const store = configureStore({
    reducer: {
        consumption: consumptionReducer,
        auth: authReducer,
        user: userReducer,
    },
});


    