import { VideoCard } from '@/components/video-card'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function ChannelVideos() {

    const { channelId } = useParams()
    const [videos, setVideos] = useState([])

    useEffect(() => {
        if (!channelId) return

        const fetchVideos = async () => {
            const res = await axios.get(`/api/subscriptions/s/${channelId}`)
            setVideos(res.data.data.videos)
            console.log(res);
        }
        fetchVideos()
    }, [channelId])

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {videos.map((video: any) => (
                    <VideoCard
                        key={video._id}
                        videoId={video._id}
                        thumbnail={video.thumbnail}
                        title={video.title}
                        channel={video.videoOwner.username}
                        views={video.views}
                        createdAt={video.createdAt}
                    />
                ))}
            </div>
        </div>
    )
}

export default ChannelVideos