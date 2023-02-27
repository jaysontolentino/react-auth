import { apiSlice } from '../../app/api/apiSlice'
import { logout, setAuthToken, setAuthUser } from './authSlice'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints(build) {
        return {
            signIn: build.mutation({
                query({email, password}) {
                    return {
                        url: '/auth/login',
                        method: 'POST',
                        body: {email, password}
                    }
                },
                async onQueryStarted(arg, api) {
                    const result = await api.queryFulfilled
                    const token = result.data.token
                    const user = result.data.user
                    api.dispatch(setAuthToken(token))
                    api.dispatch(setAuthUser(user))
                },
            }),
            signUp: build.mutation({
                query(args) {
                    return {
                        url: '/auth/register',
                        method: 'POST',
                        body: args
                    }
                },
                async onQueryStarted(arg, api) {
                    const result = await api.queryFulfilled
                    const token = result.data.token
                    const user = result.data.user
                    api.dispatch(setAuthToken(token))
                    api.dispatch(setAuthUser(user))
                },
            }),
            signOut: build.mutation({
                query() {
                    return {
                        url: '/auth/logout',
                        method: 'POST'
                    }
                },
                async onQueryStarted(arg, api) {
                    await api.queryFulfilled
                    api.dispatch(logout())
                },
            }),
            refresh: build.mutation({
                query() {
                    return {
                        url: '/auth/refresh-token',
                        method: 'GET'
                    }
                },
                async onQueryStarted(arg, api) {
                    
                    const result = await api.queryFulfilled
                    const token = result.data.token
                    api.dispatch(setAuthToken(token))

                },
            }),
            getUser: build.mutation({
                query() {
                    return {
                        url: '/auth/auth-user',
                        method: 'GET'
                    }
                },
                async onQueryStarted(arg, api) {
                    const result = await api.queryFulfilled
                    const user = result.data.user
                    api.dispatch(setAuthUser({name: user.name, email: user.email}))
                },
            }),
        }
    },
})

export const { 
    useSignInMutation,
    useSignUpMutation,
    useSignOutMutation,
    useRefreshMutation,
    useGetUserMutation
 } = authApiSlice