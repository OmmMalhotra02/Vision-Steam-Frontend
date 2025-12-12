import { useEffect, useState } from 'react'
import './App.css'
import { VideoCard } from './components/video-card';
import axios from 'axios'
import { useSelector } from 'react-redux';

function App() {
  const [videos, setVideos] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const loginStatus = useSelector((state: any) => state.login.status)

  useEffect(() => {
    const fetchData = async () => {
      if (!loginStatus) return

      try {
        setLoading(true)
        const response = await axios.get('/api/videos/all-videos')
        setVideos(response.data.data) // ensure correct path
      } catch (error) {
        console.log("Failed fetching all videos", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [loginStatus])

  if (!loginStatus) return <div>Welcome to endless world of videos. Plan your uploads, handle your channel and enjoy!!</div>

  if (loading) return <div>Loading videos...</div>

  return (
    <div className="p-6">
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
