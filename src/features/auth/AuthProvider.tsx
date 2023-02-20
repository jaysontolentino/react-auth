import { Outlet } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'
import { useRefreshMutation } from "./authApiSlice"
import { useSelector } from 'react-redux'
import { selectAuthToken } from "./authSlice"

const AuthProvider = function() {

    const token = useSelector(selectAuthToken)
    const effectRan = useRef(false)

    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError
    }] = useRefreshMutation()

    useEffect(()=> {

        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { 

            const refreshingToken = async () => {
                try {
                    await refresh(null)
                    setTrueSuccess(true)
                }
                catch (err) {
                }
            }

            if (!token) refreshingToken()
        }

        // the trick, it is always true on refresh
        return () => {
            effectRan.current = true
        } 
    }, [])


    let _html
    
    if (isLoading) { //persist: yes, token: no
        //console.log('loading')
        _html = <span>Loading...</span>
    } else if (isSuccess && trueSuccess) { //persist: yes, token: yes
        //console.log('success')
        _html = <Outlet />
    } else if (token && isUninitialized) { //persist: yes, token: yes
        //console.log('token and uninit')
        //console.log(isUninitialized)
        _html = <Outlet />
    } else if(isError) {
        _html = <Outlet />
    }

    return _html as JSX.Element
}
export default AuthProvider