import { createSlice } from "@reduxjs/toolkit";
import { appInfo } from "../../constants/appInfos";

export interface AuthState {
    token: string;
    _id: string;
    name: string;
    rule: number;
}

const initialState = {
    token: '',
    _id: '',
    name: '',
    rule: 0,
};

const authSlice = createSlice({
    initialState: {
        data: initialState
    },
    name: 'auth',
    reducers: {
        addAuth: (state, action) => {
            state.data = action.payload;
            action.payload.isRemember && syncLocalStorage(action.payload);
        },
        removeAuth: (state, _) => {
            state.data = initialState;
            syncLocalStorage({} as AuthState);
        }
    }
});

export const authReducer = authSlice.reducer;
export const { addAuth, removeAuth } = authSlice.actions;

export const authSelector = (state: any) => state.authReducer.data;

const syncLocalStorage = (data: AuthState) => {
    localStorage.setItem(appInfo.localKey, JSON.stringify(data));
}
