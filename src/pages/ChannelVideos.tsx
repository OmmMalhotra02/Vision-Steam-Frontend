import { VideoCard } from '@/components/video-card'
import apiClient from '@/api/apiClient'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function ChannelVideos() {

    const { channelId } = useParams()
    const [videos, setVideos] = useState([])

    useEffect(() => {
        if (!channelId) return

        const fetchVideos = async () => {
            const res = await apiClient.get(`/api/subscriptions/s/${channelId}`)
            setVideos(res.data.data.videos)
        }
        fetchVideos()
    }, [channelId])

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
            views={video.views}
            createdAt={video.createdAt}
          />
        ))}
      </div>
    </div>
    )
}

export default ChannelVideos
