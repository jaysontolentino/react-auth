import { Link } from 'react-router-dom'
import Register from './../features/auth/Register'

const RegisterPage = function () {
    return (
        <div className='bg-slate-100 h-screen flex justify-center items-center p-8 md:px-0'>
            <div className='w-full h-full flex flex-col gap-y-4 items-center justify-center md:w-[350px]'>

                <div className='flex flex-col gap-y-2 text-center'>
                <h1 className='font-sans text-3xl font-bold text-slate-700'>Create your account</h1>
                <span className='text-slate-500'>Already registered? <Link to='/login' className='text-blue-600'>Sign In</Link></span>
                </div>
                
                <Register />
            </div>
        </div>
        

    )
}

export default RegisterPage