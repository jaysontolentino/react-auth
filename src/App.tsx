import { Route, Routes } from 'react-router-dom';
import RedirectAuth from './features/auth/RedirectAuth';
import AuthChecker from './features/auth/AuthChecker';
import Layout from './pages/Layout';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PageNotFound from './pages/PageNotFound';
import CreatePostPage from './pages/CreatePostPage';
import { useEffect } from 'react';
import { useFetchPostsMutation } from './features/post/postApiSlice';
import PostPage from './pages/PostPage';
import { useRefreshMutation } from './features/auth/authApiSlice';
import { selectAuthToken } from './features/auth/authSlice';
import { useAppSelector } from './app/hook';

function App() {

  const token = useAppSelector(selectAuthToken)

  const [fetchPosts, fetchPostsResults] = useFetchPostsMutation()

  const [refreshToken, refreshTokenResult] = useRefreshMutation()


  useEffect(() => {
    const loadPosts = async () => {
      await fetchPosts(null)
    }

    const refreshingToken = async () => {
      await refreshToken(null)
    }

    loadPosts()

    if(!token) {
      refreshingToken()
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let apphtml

  if(fetchPostsResults.isLoading && refreshTokenResult.isLoading) {
    apphtml = <span>Loading...</span>
  } else {
    apphtml = (
      <Routes>
            <Route path='/' element={<Layout />} >
              <Route index element={<Home />} />
              <Route path='posts/:id' element={<PostPage />} />

              <Route element={<RedirectAuth />}>
                <Route path='login' element={<LoginPage />} />
                <Route path='register' element={<RegisterPage />} />
              </Route>

              <Route element={<AuthChecker />}>
                <Route path='create-post' element={<CreatePostPage />} />
              </Route>
            </Route>

          <Route path='*' element={<PageNotFound />} />
        
      </Routes>      
    )
  }

  return apphtml as JSX.Element
}

export default App;
