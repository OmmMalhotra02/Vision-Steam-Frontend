import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs"
import { VideoCard } from "@/components/video-card"
import apiClient from "@/api/apiClient"
import { Button } from "@/components/ui/button"

function MyAccount() {
    const userData = useSelector((state: any) => state.login.userData)
    const [videos, setVideos] = useState([])

    useEffect(() => {
        const handleVideos = async () => {
            const res = await apiClient.get("/api/dashboard/videos")
            setVideos(res.data.data)
        }
        handleVideos()
    })

    return (
        <div className="mx-auto">
            <div className="relative h-95 w-full overflow-hidden rounded-b-lg">
                <img
                    src={userData.coverImage}
                    alt="Cover"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Avatar and username */}
            <div className="flex items-center gap-6 -mt-10 px-6">
                <Avatar className="w-32 h-32 ring-4 ring-rose-500 shadow-lg">
                    <AvatarImage src={userData.avatar} alt={userData.username} />
                    <AvatarFallback>{userData.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-3xl font-semibold text-black">
                        {userData.username}
                    </h1>
                    <p className="text-gray-400">@{userData.username}</p>
                </div>
            </div>

            <Tabs defaultValue="videos" className="mt-8 px-6">
                <TabsList className="flex justify-between w-full max-w-4xl mx-auto">
                    <TabsTrigger value="videos">Videos</TabsTrigger>
                    <TabsTrigger value="playlist">Playlist</TabsTrigger>
                    <TabsTrigger value="tweets">Tweets</TabsTrigger>
                    <TabsTrigger value="subscribed">Subscribed</TabsTrigger>
                </TabsList>

                <TabsContent value="videos">
                    <div className="p-6">
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
                    <p className="text-gray-300 p-4">Videos content goes here</p>
                </TabsContent>

                <TabsContent value="playlist">
                    <Button className="bg-red-700 size-xl"> Create Playlist + </Button>
                    <p className="text-gray-300 p-4">Playlist content goes here</p>
                </TabsContent>

                <TabsContent value="tweets">
                    <p className="text-gray-300 p-4">Tweets content goes here</p>
                </TabsContent>

                <TabsContent value="subscribed">
                    <p className="text-gray-300 p-4">Subscribed content goes here</p>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default MyAccount
