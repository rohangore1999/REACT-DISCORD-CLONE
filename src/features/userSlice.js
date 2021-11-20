import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',

    // initial state of user; null
    initialState: {
        user: null
    },

    reducers: {
        // fuctions; login and logout
        login: (state, action) => {
            // with the help of login; we will store the user data
            state.user = action.payload;
        },

        logout: (state, action) => {
            // with the help of logout; we will store the user data
            // when logout we set user to null
            state.user = null
        },
    }

})

// we export action to use through out the code
export const { login, logout } = userSlice.actions;

// help of this we can grap the value once they are loaded
//from name //from initial state
// need to import this so as to get user data which is stored in redux
export const selectUser = (state) => state.user.user;


export default userSlice.reducer;
