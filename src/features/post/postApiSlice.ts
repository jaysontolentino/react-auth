import { addPost } from './postSlice'
import { apiSlice } from '../../app/api/apiSlice'
import { setPosts } from './postSlice'

export const postApiSlice = apiSlice.injectEndpoints({
    endpoints(build) {
        return {
            fetchPosts: build.mutation({
                query() {
                    return {
                        url: '/posts',
                        method: 'GET'
                    }
                },
                async onQueryStarted(arg, api) {
                    const result = await api.queryFulfilled
                    const posts = result.data.posts
                    api.dispatch(setPosts(posts))
                },
            }),
            fetchPost: build.query({
                query: (id: number) => `/posts/${id}`
            }),
            addPost: build.mutation({
                query({title, content}) {
                    return {
                        url: '/posts',
                        method: 'POST',
                        body: {title, content}
                    }
                },
                async onQueryStarted(arg, api) {
                    const result = await api.queryFulfilled
                    const post = result.data.post
                    api.dispatch(addPost(post))
                },
            }),
        }
    },
})

export const { 
    useFetchPostsMutation,
    useFetchPostQuery,
    useAddPostMutation
 } = postApiSlice