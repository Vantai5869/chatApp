import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userListSlice from './reducers/userListSlice';
import authSlice from './reducers/authSlice';
import conversationSlice from './reducers/conversationSlice';

const rootReducer = combineReducers({
  userList: userListSlice,
  auth:authSlice,
  conversationList:conversationSlice
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false}),
});

export default store;
