import { useEffect, useState } from 'react'
import VideoAsRow from '@/components/VideoAsRow';
import apiClient from '@/api/apiClient';

function LikedVideos() {

    const user: any = localStorage.getItem('userData')
    const [likedVideos, setlikedVideos] = useState([])

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await apiClient.get(`/api/likes/videos`)
                console.log(res.data.data);

                setlikedVideos(res.data.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchHistory()
    }, [user.id])

    return (
        <div className="min-h-screen px-4 py-4 sm:px-6 sm:py-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="max-w-6xl mx-auto mb-6">
                <h1 className="text-3xl sm:text-4xl font-bold">
                    Your Favorite Picks 🎬
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Here are all the videos you've liked. Enjoy rewatching your favorites!
                </p>
            </div>
            <div className="flex flex-col gap-4 max-w-6xl mx-auto">
                {likedVideos.map((video: any) => (
                    <VideoAsRow key={video._id} video={video} />
                ))}
            </div>
        </div>
    )
}

export default LikedVideos