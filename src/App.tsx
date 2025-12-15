import { useEffect, useState } from 'react'
import './App.css'
import { VideoCard } from './components/video-card'
import { useSelector } from 'react-redux'
import IntroPage from './pages/IntroPage'
import apiClient from './api/apiClient'

function App() {
  const [videos, setVideos] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const loginStatus = useSelector((state: any) => state.login.status)

  useEffect(() => {
    const fetchData = async () => {
      if (!loginStatus) return

      try {
        setLoading(true)
        const response = await apiClient.get('/api/videos/all-videos')
        setVideos(response.data.data)
      } catch (error) {
        console.log("Failed fetching all videos", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [loginStatus])

  if (!loginStatus) return <IntroPage />

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-gray-700 dark:text-gray-300">
        Loading videos...
      </div>
    )
  }

  return (
    <div
      className="
        min-h-screen
        px-4 py-4
        sm:px-6 sm:py-6
        bg-gray-50 dark:bg-gray-900
        text-gray-900 dark:text-gray-100
      "
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video: any) => (
          <VideoCard
            key={video._id}
            videoId={video._id}
            thumbnail={video.thumbnail}
            title={video.title}
            channel={video.ownerUser.username}
            views={video.views}
            createdAt={video.createdAt}
          />
        ))}
      </div>
    </div>
  )
}

export default App
