import apiClient from '@/api/apiClient'
import { useEffect, useState } from 'react'
import VideoAsRow from '@/components/VideoAsRow';


function WatchHistory() {

    const userData: any = JSON.parse(localStorage.getItem('userData'))
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
    }, [userData._id])

    return (
        <div className="min-h-screen px-4 py-4 sm:px-6 sm:py-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="flex flex-col gap-4 max-w-6xl mx-auto">
                {watchHistory.map((video: any) => (
                    <VideoAsRow key={video._id} video={video} />
                ))}
            </div>
        </div>
    )
}

export default WatchHistory