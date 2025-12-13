import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from './Layout'
import App from './App'
import Login from './pages/Login'
import VideoPage from './pages/VideoPage'
import SignUp from './pages/SignUp'
import { ProtectedRoute } from './components/ProtectedRoute'
import VideoUpload from './pages/VideoUpload'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<App />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='video/:videoId' element={
        <ProtectedRoute>
          <VideoPage />
        </ProtectedRoute>} />
      <Route path='upload' element={
        <ProtectedRoute>
          <VideoUpload />
        </ProtectedRoute>} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
