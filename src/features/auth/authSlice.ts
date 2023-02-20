import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface IUser {
    name: string
    email: string
}

export interface IAuthState {
    user: IUser | null,
    token: string
}

const initialState: IAuthState = {
    user: null,
    token: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setAuthUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
        },
        setAuthToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
        logout: (state) => {
            state.user = null
            state.token = ''
        }
    },
    extraReducers: (builder) => {}
})

export const { setAuthUser, setAuthToken, logout } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth
export const selectAuthUser = (state: RootState) => state.auth.user
export const selectAuthToken = (state: RootState) => state.auth.token

export default authSlice.reducer