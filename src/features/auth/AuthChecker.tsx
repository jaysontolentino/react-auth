import { Navigate, Outlet } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hook"
import { logout, selectAuthToken } from "./authSlice"
import { useEffect } from "react"
import { useRefreshMutation } from "./authApiSlice"

const AuthChecker = function() {

    const token = useAppSelector(selectAuthToken)
    const dispatch = useAppDispatch()

    // eslint-disable-next-line no-empty-pattern
    const [refreshToken, {isError}] = useRefreshMutation()

    useEffect(() => {

        const refreshingToken = async () => {
            await refreshToken(null)
        }

        refreshingToken()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if(isError) dispatch(logout())

    return (token) ? <Outlet /> : <Navigate to='/login' />
}

export default AuthChecker