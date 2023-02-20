import { Link } from "react-router-dom"
import { IPost } from "./postSlice"

interface IPostProps {
    post: IPost
}

const Post: React.FunctionComponent<IPostProps> = function({post}) {
    return (
        <div className="w-full bg-white border rounded-md shadow-md py-6 px-8 flex flex-col gap-y-4">

            <Link to={`posts/${post.id}`}>
                <h1 className="text-3xl font-medium">{post.title}</h1>
            </Link>
            

            <p>{post.content}</p>
        </div>
    )
}

export default Post