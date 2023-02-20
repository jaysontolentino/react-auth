import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../../app/hook"
import { selectAuthToken } from "./authSlice"

const RedirectAuth = function() {

    const token = useAppSelector(selectAuthToken)

    return (!token) ? <Outlet /> : <Navigate to='/' />

    //return <Outlet />
}

export default RedirectAuth