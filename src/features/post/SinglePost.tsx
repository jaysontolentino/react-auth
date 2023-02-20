import { useParams } from "react-router-dom"
import { useFetchPostQuery } from "./postApiSlice"


const Post = function() {

    const params = useParams()

    const {isLoading, data} = useFetchPostQuery(Number(params.id))

    if(isLoading) return <span>Loading...</span>

    return (
        <div className="w-[600px] bg-white border rounded-md shadow-md py-6 px-8 flex flex-col gap-y-4">

            <h1 className="text-3xl font-medium">{data.post.title}</h1>
            
            <p>{data.post.content}</p>
        </div>
    )
}

export default Post