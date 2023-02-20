import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Alert from "../../components/Alert"
import Input from "../../components/Input"
import { useAddPostMutation } from "./postApiSlice"

const AddPost = function() {
    
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.pathname || '/'

    const [formError, setFormError] = useState('')
    const [isError, setIsError] = useState(false)
    const [formData, setFormData] = useState<{
        title: string,
        content: string
    }>({title: '', content: ''})

    const [addPost,addPostResult] = useAddPostMutation()

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault()

        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        })

        setIsError(false)
        setFormError('')
    }

    const handleAddPost = async () => {
        try {
            await addPost(formData).unwrap()
            navigate(from, {replace: true})
        } catch (error) {
            const err = error as any
        }
    }

    useEffect(() => {
        if(addPostResult.isError) {
            const err = addPostResult.error as any
            setIsError(true)
            setFormError(err.data.error)
        }
    }, [addPostResult])

    return (
        <div className="bg-white py-10 px-6 rounded-lg shadow-md flex flex-col items-center gap-y-4 w-full"> 

            {isError && <Alert type='error'>{formError}</ Alert>}
            
            <Input type="text" placeholder="Post Title" name="title" onChange={onChangeInput} />
            {/* <Input type="text" placeholder="Post Content" name="content" onChange={onChangeInput} /> */}
            <textarea placeholder="Post Content..." className="w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" name="content" onChange={onChangeInput}></textarea>

            <button disabled={addPostResult.isLoading}
            className='w-full rounded-md border-none outline-none py-3 bg-indigo-500 text-white hover:bg-indigo-400'
            onClick={handleAddPost}>
                {addPostResult.isLoading ? 'Loading...' : 'Create Post'}
            </button>
        </div>
    )
}

export default AddPost