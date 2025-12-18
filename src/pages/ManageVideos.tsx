import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { VideoCard } from "@/components/video-card"
import apiClient from "@/api/apiClient"
import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"
import { toast } from "sonner"

function ManageVideos() {
    const userData = useSelector((state: any) => state.login.userData)
    const [videos, setVideos] = useState([])

    useEffect(() => {
        const handleVideos = async () => {
            const res = await apiClient.get("/api/dashboard/videos")
            setVideos(res.data.data)
        }
        handleVideos()
    }, [])

    const togglePublish = async (id: string) => {
        try {
            const res = await apiClient.patch(`/api/videos/toggle/publish/${id}`)
            setVideos((prevVideos) => {
                return prevVideos.map((v) =>
                    v._id === id ? { ...v, isPublished: !v.isPublished } : v
                )
            })
            res.data.data.isPublished ? toast.success("Video published successfully") : toast.success("Video unpublished successfully")
        } catch (error) {
            console.error(error);
            toast.error(error.response.data?.message)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            const res = await apiClient.delete(`/api/videos/${id}`)
            res.data.data === "Video Deleted successfully" ? toast.success("Video deleted successfully") : null
            setVideos(prevVideos =>
                prevVideos.filter((v: any) => v._id !== id)
            )
        } catch (error) {
            console.error(error);
            toast.error(error.response.data?.message)
        }
    }

    return (
        <div className="relative overflow-hidden min-h-screen text-black bg-gray-100 dark:bg-gray-950 dark:text-white">

            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-1 items-center justify-between w-full p-2 mr-5 ">
                    <div className="">
                        <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
                            Creator Studio - Manage your videos effortlessly
                        </h2>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">
                            Take control of your videos — edit, publish, and manage with ease.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <h1 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                {userData.username}
                            </h1>
                            <p className="text-sm text-gray-400">
                                @{userData.username}
                            </p>
                        </div>

                        <div className="p-1 rounded-full bg-linear-to-br from-rose-500 via-purple-500 to-indigo-500">
                            <Avatar className="w-24 h-24 bg-gray-100 text-black dark:bg-gray-950 dark:text-white">
                                <AvatarImage src={userData.avatar} />
                                <AvatarFallback>
                                    {userData.username?.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </div>
                <div>
                {videos.length === 0 ? (
                    <p className="text-gray-400">No videos uploaded yet</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {videos.map((video: any) => (
                            <div key={video._id} className="relative group rounded-xl overflow-hidden">
                                <div className="absolute top-2 right-2 z-10 flex gap-1 rounded-lg backdrop-blur-md border border-black dark:border-white/10 p-1 text-black bg-gray-100 dark:bg-black/60 dark:text-white">
                                    <button className="p-1.5 rounded-md hover:bg-white/10">
                                        <Link to={`/video-edit/${video._id}`}>
                                            <Pencil size={16} />
                                        </Link>
                                    </button>
                                    <button onClick={() => togglePublish(video._id)} className="p-1.5 rounded-md hover:bg-white/10">
                                        {video.isPublished ? (
                                            <Eye size={16} className="text-green-500" />
                                        ) : (
                                            <EyeOff size={16} className="text-red-500" />
                                        )}
                                    </button>
                                    <button onClick={() => handleDelete(video._id)} className="p-1.5 rounded-md hover:bg-red-500/20 text-red-500">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <VideoCard
                                    videoId={video._id}
                                    thumbnail={video.thumbnail}
                                    title={video.title}
                                    views={video.views}
                                    createdAt={video.createdAt}
                                />
                            </div>
                        ))}
                    </div>
                )}
                </div>
            </div>
        </div >
    )
}


export default ManageVideos
