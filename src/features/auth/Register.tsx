import { useState, useEffect } from "react"
import Input from "../../components/Input"
import { useSignUpMutation } from "./authApiSlice"
import { useLocation, useNavigate } from "react-router-dom"
import Alert from "../../components/Alert"

const Register = function() {

    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.pathname || '/quiz'

    const [formError, setFormError] = useState('')
    const [isError, setIsError] = useState(false)
    const [formData, setForm] = useState<{
        name: string
        email: string
        password: string
        password_confirm: string
    }>({
        name: '',
        email: '',
        password: '',
        password_confirm: ''
    })

    const [signUp,registerResult] = useSignUpMutation()

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()

        const {name, value} = e.target

        setForm({
            ...formData,
            [name]: value
        })
    }

    const handleSignUp = async () => {
        try {
            await signUp(formData).unwrap()
            navigate(from, {replace: true})
        } catch (error) {
        }
    }

    useEffect(() => {
        if(registerResult.isError) {
            const err = registerResult.error as any
            setIsError(true)
            setFormError(err.data.error)
        }
    }, [registerResult])

    return (
        <div className="bg-white py-10 px-6 rounded-lg shadow-md flex flex-col items-center gap-y-4 w-full">

            {isError && <Alert type='error'>{formError}</ Alert>}

            <Input type="text" placeholder='Name' name="name" onChange={onChangeInput} />
            <Input type="email" placeholder="Email" name="email" onChange={onChangeInput} />
            <Input type="password" placeholder="Password" name="password" onChange={onChangeInput} />
            <Input type="password" placeholder="Confirm Password" name="password_confirm" onChange={onChangeInput} />
            
            <button disabled={registerResult.isLoading}
            className='w-full rounded-md border-none outline-none py-3 bg-indigo-500 text-white hover:bg-indigo-400'
            onClick={handleSignUp}>
                {registerResult.isLoading ? 'Loading...' : 'Sign Up'}
            </button>
        </div>
    )
}

export default Register