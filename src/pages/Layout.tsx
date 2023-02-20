import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hook'
import { useSignOutMutation } from '../features/auth/authApiSlice'
import { logout, selectAuthToken } from '../features/auth/authSlice'

const Layout = function() {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [signOut, signOutResult] = useSignOutMutation()

    const token = useAppSelector(selectAuthToken)
    const handleLogout = async () => {
        await signOut(null)
        dispatch(logout())
        navigate('/')
    }

    return (
        <div className="w-screen h-screen flex flex-col bg-slate-200">

            <nav className="flex justify-between items-center w-full bg-white shadow-md py-4 px-6 md:px-12">
                <div className="flex ">
                   <Link to='/' className="text-xl font-black">React App</Link>
                </div>
                
                {token && <button className='bg-indigo-500 p-2 text-white rounded' onClick={handleLogout}>Logout</button>}
                
            </nav>

            <main className="flex flex-1 flex-col items-center  bg-indigo-50 px-6 py-4">
                <Outlet />
            </main>
            
        </div>
    )
}

export default Layout