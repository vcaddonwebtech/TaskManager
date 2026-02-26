import { createSlice } from "@reduxjs/toolkit"

const tasklSlice = createSlice({
    name : "task",
    initialState : {tasks: []},
    reducers: {
        addTask : (state,action)=>{
            console.log("DataTask in the Reducers",action.payload)
           state.tasks.push(action.payload)
        },
        showTask :(state ,action)=>{
            state.tasks = action.payload;
        },
        updateTask :(state ,action)=>{
            state.tasks.map((items ,index)=>(
                items.id === action.payload.id ? action.payload : items
            ));
        },
        deleteTask :(state ,action)=>{
          state.tasks = state.tasks.filter(items=>items.id!=action.payload);
            console.log("After Deletation : " , state.tasks)
        },
    }
})


export const {addTask ,showTask,updateTask,deleteTask} = tasklSlice.actions
export default tasklSlice.reducer 