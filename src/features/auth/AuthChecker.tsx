import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../../app/hook"
import { selectAuthToken, selectAuthUser } from "./authSlice"

const AuthChecker = function() {

    const token = useAppSelector(selectAuthToken)

    return (token) ? <Outlet /> : <Navigate to='/login' />

    //return <Outlet />
}

export default AuthChecker