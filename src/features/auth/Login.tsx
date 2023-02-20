import { useState, useEffect } from 'react'
import Input from '../../components/Input'
import { useSignInMutation } from './authApiSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import Alert from '../../components/Alert'

const Login = function() {
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.pathname || '/create-post'

    const [formError, setFormError] = useState('')
    const [isError, setIsError] = useState(false)
    const [formData, setFormData] = useState<{
        email: string,
        password: string
    }>({email: '', password: ''})

    const [signIn,loginResult] = useSignInMutation()

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        })

        setIsError(false)
        setFormError('')
    }

    const handleSignIn = async () => {
        try {
            await signIn(formData).unwrap()
            navigate(from, {replace: true})
        } catch (error) {
            const err = error as any
            //setIsError(true)
            //setFormError(err.message)
        }
    }

    useEffect(() => {
        if(loginResult.isError) {
            const err = loginResult.error as any
            setIsError(true)
            setFormError(err.data.error)
        }
    }, [loginResult])


    return (
        <div className="bg-white py-10 px-6 rounded-lg shadow-md flex flex-col items-center gap-y-4 w-full"> 

            {isError && <Alert type='error'>{formError}</ Alert>}
            
            <Input type="email" placeholder="Email" name="email" onChange={onChangeInput} />
            <Input type="password" placeholder="Password" name="password" onChange={onChangeInput} />

            <button disabled={loginResult.isLoading}
            className='w-full rounded-md border-none outline-none py-3 bg-indigo-500 text-white hover:bg-indigo-400'
            onClick={handleSignIn}>
                {loginResult.isLoading ? 'Loading...' : 'Sign In'}
            </button>
        </div>
    )
}

export default Login