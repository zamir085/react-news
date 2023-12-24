import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserTypeState {
  userType: string | null;
}

const initialState: UserTypeState = {
  userType: null,
};

const userTypeSlice = createSlice({
  name: 'userType',
  initialState,
  reducers: {
    setUserType(state, action: PayloadAction<string>) {
      state.userType = action.payload;
    },
    resetUserType(state) {
      state.userType = null;
    },
    logout(state) {
      state.userType = null;
    },
    updateLoggedInState(state, action: PayloadAction<boolean>) {
      state.userType = action.payload ? localStorage.getItem('user') || localStorage.getItem('publisher') : null;
    },
  },
});

export const { setUserType, resetUserType, logout, updateLoggedInState } = userTypeSlice.actions;
export default userTypeSlice.reducer;
