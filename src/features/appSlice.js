import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',

    // initial state of app; null
    initialState: {
        channelId: null,
        channelName: null,
    },

    reducers: {
        // fuctions
        setChannelInfo: (state, action) => {
            // using setChannelInfo we will store channelId and channelName

            state.channelId = action.payload.channelId;
            state.channelName = action.payload.channelName;
        },
    }

})

// we export action to use through out the code
export const { setChannelInfo } = appSlice.actions;

// help of this we can grap the value once they are loaded
//from name //from initial state

export const setChannelId = (state) => state.app.channelId;
export const setChannelName = (state) => state.app.channelName;


export default appSlice.reducer;
