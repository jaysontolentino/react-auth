import { BaseQueryApi, BaseQueryFn, FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import { logout, setAuthToken } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    credentials: 'include',
    prepareHeaders(headers, api) {

        let state = api.getState() as RootState
        let token = state.auth.token

        if(token) headers.set('authorization', 'Bearer ' + token)
        
        return headers
    },
})


const baseQueryWithAuth = async function(args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) {
    let result = await baseQuery(args, api, extraOptions)

    // Unauthorized request
    if(result.error?.status === 401) {
        const refreshToken = await baseQuery('/auth/refresh-token', api, extraOptions)

        if(refreshToken?.data) {
            const data = refreshToken.data as {token: string}
            api.dispatch(setAuthToken(data?.token as string))
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logout)
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithAuth as BaseQueryFn,
    tagTypes: ['Post'],
    endpoints(build) {
        return {}
    },
})