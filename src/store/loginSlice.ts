import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginDetails: [{id: 1, status: 200, userData: {}, message: "", success: true}]
}

export const loginDetailsSlice = createSlice({
    name: 'loginDetails',
    initialState,
    reducers: {
        // by default below properties have access to state (current state) and action (values required to perform operation)
        addLoginDetails: (state, action) => {
            const loginDetails = {
                id: action.payload.id,
                status: action.payload.status, 
                userData: action.payload.userData, 
                message: action.payload.message, 
                success: action.payload.success
            }
            state.loginDetails.push(loginDetails)
        },

        removeLoginDetails: (state, action) => {
            state.loginDetails = state.loginDetails.filter((loginDetail) => loginDetail.id !== action.payload.id)
        },

        updateLoginDetails: (state, action) => {
            state.loginDetails = state.loginDetails.map((loginDetail) => {
                if(loginDetail.id === action.payload.id) {
                    loginDetail.userData = action.payload.userData
                }
            })
        }
    }
})

export const {addLoginDetails, removeLoginDetails, updateLoginDetails} = loginDetailsSlice.actions

export default loginDetailsSlice.reducer