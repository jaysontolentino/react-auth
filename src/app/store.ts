import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './../features/auth/authSlice'
import postReducer from './../features/post/postSlice'
import { apiSlice } from './api/apiSlice'


const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    posts: postReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware({serializableCheck: false}).concat(apiSlice.middleware)
    },
    devTools: false
})

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch