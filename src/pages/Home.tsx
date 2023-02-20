
import { Link } from "react-router-dom";
import PostList from "../features/post/PostList";

const Home = function() {
    return (
        <div>
            <div className="my-6">
                <Link to='create-post' className='bg-indigo-500 text-white p-2 rounded'>Create Post</Link>
            </div>
            
            
            <PostList />
        </div>
    )
}

export default Home