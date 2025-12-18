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
import Subscriptions from './pages/Subscriptions'
import ChannelVideos from './pages/ChannelVideos'
import MyAccount from './pages/MyAccount'
import UnderConstruction from './pages/UnderConstruction'
import { ThemeProvider } from './components/theme-provider'
import VideoUpdate from './pages/VideoUpdate'
import WatchHistory from './pages/WatchHistory'
import ManageVideos from './pages/ManageVideos'

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
      <Route path='subscriptions' element={
        <ProtectedRoute>
          <Subscriptions />
        </ProtectedRoute>} />
      <Route path='channel/:channelId' element={
        <ProtectedRoute>
          <ChannelVideos />
        </ProtectedRoute>} />
      <Route path='my-account' element={
        <ProtectedRoute>
          <MyAccount />
        </ProtectedRoute>} />
        <Route path='video-edit/:videoId' element={
        <ProtectedRoute>
          <VideoUpdate />
        </ProtectedRoute>} />
        <Route path='history' element={
        <ProtectedRoute>
          <WatchHistory />
        </ProtectedRoute>} />
        <Route path='manage-videos' element={
        <ProtectedRoute>
          <ManageVideos />
        </ProtectedRoute>} />
      <Route path="*" element={<UnderConstruction />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider defaultTheme="light" storageKey="vision-stream-theme">
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ThemeProvider>
)
