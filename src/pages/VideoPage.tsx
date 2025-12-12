import React, { useState, useEffect } from 'react'
import {
    VideoPlayer,
    VideoPlayerContent,
    VideoPlayerControlBar,
    VideoPlayerPlayButton,
    VideoPlayerTimeDisplay,
    VideoPlayerTimeRange,
    VideoPlayerVolumeRange,
    VideoPlayerMuteButton,
    VideoPlayerSeekBackwardButton,
    VideoPlayerSeekForwardButton,
} from "@/components/ui/shadcn-io/video-player";
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useSelector } from 'react-redux';

function VideoPage() {
    const { videoId } = useParams();
    const loginStatus = useSelector((state: any) => state.login.status);
    const [loading, setLoading] = useState(false)
    const [videoUrl, setVideoUrl] = useState("")
    const [thumbnail, setThumbnail] = useState("")

    useEffect(() => {
        const fetchVideoUrl = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`/api/videos/${videoId}`)
                setVideoUrl(response.data.data.videoFile)
                setThumbnail(response.data.data.thumbnail)
                console.log("Fetched URL:", response.data.data.thumbnail);
            } catch (error) {
                console.error("Error on fetching video url", error)
            } finally {
                setLoading(false)
            }
        }
        if (loginStatus) fetchVideoUrl()
    }, [videoId, loginStatus])

    if (!loginStatus) return <div>Please login to watch this video.</div>;
    if (loading) return <div>Loading Video.....</div>
    if (!videoUrl) return <div>Video not found</div>

    return (
        <div className="p-6">
            <VideoPlayer className="w-full h-[400px]">
                <VideoPlayerContent src={videoUrl} controls className="w-full h-full" poster={thumbnail}/>

                <VideoPlayerControlBar>
                    <VideoPlayerPlayButton />
                    <VideoPlayerSeekBackwardButton />
                    <VideoPlayerSeekForwardButton />
                    <VideoPlayerTimeDisplay />
                    <VideoPlayerTimeRange />
                    <VideoPlayerMuteButton />
                    <VideoPlayerVolumeRange />
                </VideoPlayerControlBar>
            </VideoPlayer>
        </div>
    )
}


export default VideoPage