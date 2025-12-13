import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: localStorage.getItem('loginStatus') === 'true' || false,
    userData: localStorage.getItem('userData')
        ? JSON.parse(localStorage.getItem('userData')!)
        : null, 
    showLoginPage: false
}

export const loginDetailsSlice = createSlice({
    name: 'loginDetails',
    initialState,
    reducers: {
        // by default below properties have access to state (current state) and action (values required to perform operation)
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.user;
            state.showLoginPage = false;

            localStorage.setItem('loginStatus', 'true');
            localStorage.setItem('userData', JSON.stringify(action.payload.user));
        },

        logout: (state) => {
            state.status = false;
            state.userData = null;
            localStorage.setItem('loginStatus', 'false');
            localStorage.removeItem('userData');
        },

        setShowLoginPage: (state, action) => {
            state.showLoginPage = action.payload
        }
    }
})

export const { login, logout, setShowLoginPage } = loginDetailsSlice.actions

export default loginDetailsSlice.reducer