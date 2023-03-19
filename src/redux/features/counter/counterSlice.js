import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
    email: "",
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addEmail: (state, action) => {
            state.email = action.payload;

        },
        removeEmail: (state) => {
            state.email = "";

        }
    },
})

// Action creators are generated for each case reducer function
export const { addEmail, removeEmail } = counterSlice.actions
export const selectEmail = (state) => state.counter.email;
export default counterSlice.reducer