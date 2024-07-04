import { configureStore, combineReducers, Reducer } from '@reduxjs/toolkit';
import authReducer from './UserStore/Authentication/AuthSlice';
import authSliceAdmin, { resetAdminState } from './AdminStore/Authentication/AuthSlice';
import { AuthState } from './UserStore/Authentication/Interfaces';
import { AdminAuth } from './AdminStore/Authentication/Interfaces';
import AdminUserSlice, { resetAdminUserState } from './AdminStore/Management/UserManagement/AdminUserSlice';
import { UserManage } from './AdminStore/Management/UserManagement/Interfaces';
import { PostState } from './UserStore/Post-Management/Interfaces';
import postSlice from './UserStore/Post-Management/PostSlice';
import { profileState } from './UserStore/ProfileManagement/interfaces';
import profileSlice from './UserStore/ProfileManagement/ProfileSlice';
import { videoState } from './UserStore/Video-Management/Interfaces';
import VideoSlice from './UserStore/Video-Management/VideoSlice';
import ChatSlice from './UserStore/Chat-Management/ChatSlice';

import { ChatState } from './UserStore/Chat-Management/interfaces';

interface RootReducerInterface {
  auth: AuthState;
  admin: AdminAuth;
  adminuser:UserManage;
  post:PostState;
  profile:profileState;
  video:videoState,
  chat:ChatState,
}

const rootReducer: Reducer<RootReducerInterface> = combineReducers({
  auth: authReducer,
  admin: authSliceAdmin,
  adminuser:AdminUserSlice,
  post:postSlice,
  profile:profileSlice,
  video:VideoSlice,
  chat:ChatSlice,
});



export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const resetAdminStates = () => (dispatch: AppDispatch) => {
  dispatch(resetAdminState());
  dispatch(resetAdminUserState());
};


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
}); 

export default store;
