import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface IPost {
    id: number
    title: string
    content: string
    published: boolean
    authorId: number
}

export interface IPostState {
    posts: IPost[]
}

const initialState: IPostState = {
    posts: []
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers:{
        setPosts: (state, action: PayloadAction<IPost[]>) => {
            state.posts = action.payload
        },
        addPost: (state, action: PayloadAction<IPost>) => {
            state.posts = state.posts.concat(action.payload)
        }
    },
    extraReducers: (builder) => {}
})

export const { setPosts, addPost } = postSlice.actions

export const selectPosts = (state: RootState) => state.posts

export default postSlice.reducer