import { useAppSelector } from "../../app/hook"
import Post from "./Post"
import { IPost, selectPosts } from "./postSlice"

const PostList = function() {

    const posts = useAppSelector(selectPosts).posts

    return (
        <div className="w-[600px] flex flex-col gap-y-5">
            {posts.map((post: IPost) => <Post key={post.id} post={post} />)}
        </div>
    )
}

export default PostList