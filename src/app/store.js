import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/taskSlice"

export const dataStore = configureStore({
    reducer :{
        taskdata: taskReducer,
    },

})