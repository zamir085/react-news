import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userTypeReducer from './slices/userTypeSlice'; 

const rootReducer = combineReducers({
  userType: userTypeReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
