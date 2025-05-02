import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading:null,
    user: null,
    error: null,
}

const AuthSlice = createSlice({
    name: "authslice",
    initialState: initialState,
    reducers: {
        SetUser:(state,action)=>{
            state.user = action.payload;
            state.loading = false;
        },
        Logout:(state)=>{
            state.user = null;
            state.loading = null;
            state.error = null;
        }

    }
})

export const { SetUser, Logout } = AuthSlice.actions;
export default AuthSlice.reducer;