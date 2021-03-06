import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import appReducer from '../features/appSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
  },
},
// to see the redux inspect
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
