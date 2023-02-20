import { Route, Routes } from 'react-router-dom';
import AuthProvider from './features/auth/AuthProvider';
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

function App() {

  const [fetchPosts, results] = useFetchPostsMutation()

  useEffect(() => {
    const loadPosts = async () => {
      await fetchPosts(null)
    }

    loadPosts()
  }, []);

  return (
    <Routes>
        <Route element={<AuthProvider/>}>
          <Route path='/' element={<Layout />} >
            <Route index element={<Home />} />
            <Route path='posts/:id' element={<PostPage />} />
          </Route>
            
          <Route element={<RedirectAuth />}>
            <Route path='login' element={<LoginPage />} />
            <Route path='register' element={<RegisterPage />} />
          </Route>

        
          <Route element={<AuthChecker />}>
            <Route path='create-post' element={<Layout />}>
              <Route index element={<CreatePostPage />} />
            </Route>
          </Route>
        </Route> 

        <Route path='*' element={<PageNotFound />} />
      
    </Routes>
  )
}

export default App;
