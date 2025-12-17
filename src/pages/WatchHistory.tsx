import apiClient from '@/api/apiClient'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

interface Props {
    video: any;
}

const WatchHistoryRow = ({ video }: Props) => {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/video/${video._id}`)} className="flex gap-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition">

            <div className="relative w-48 h-28 shrink-0">
                <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover rounded-lg"
                />
                <span className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                    {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, "0")}
                </span>
            </div>

            <div className="flex flex-col">
                <h3 className="font-medium text-sm sm:text-base line-clamp-2">
                    {video.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {video.ownerUser.username}
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {video.views} views • {new Date(video.createdAt).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
};


function WatchHistory() {

    const user: any = localStorage.getItem('userData')
    const [watchHistory, setwatchHistory] = useState([])

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await apiClient.get(`/api/users/watch-history`)
                console.log(res.data.data);

                setwatchHistory(res.data.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchHistory()
    }, [user.id])

    return (
        <div className="min-h-screen px-4 py-4 sm:px-6 sm:py-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="flex flex-col gap-4 max-w-6xl mx-auto">
                {watchHistory.map((video: any) => (
                    <WatchHistoryRow key={video._id} video={video} />
                ))}
            </div>
        </div>
    )
}

export default WatchHistory