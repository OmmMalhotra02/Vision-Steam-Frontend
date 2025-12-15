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
    }, [])

    return (
        <div className="min-h-screen bg-gray-950 text-white">

            <div className="relative h-64 w-full overflow-hidden">
                <img
                    src={userData.coverImage}
                    alt="Cover"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-end gap-6 -mt-16">
                    <div className="p-1 rounded-full bg-linear-to-br from-rose-500 via-purple-500 to-indigo-500">
                        <Avatar className="w-32 h-32 bg-gray-950">
                            <AvatarImage src={userData.avatar} />
                            <AvatarFallback>
                                {userData.username?.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </div>

                    <div className="pb-2">
                        <h1 className="text-2xl font-semibold">{userData.username}</h1>
                        <p className="text-gray-400 text-sm">@{userData.username}</p>
                    </div>
                </div>

                <Tabs defaultValue="videos" className="mt-10">
                    <TabsList className="flex justify-between w-full max-w-4xl mx-auto rounded-xl border border-gray-800
  bg-gray-900/80 p-1">

                        <TabsTrigger value="videos" className="
    rounded-lg px-6 py-2 text-gray-400
    data-[state=active]:bg-gray-800
    data-[state=active]:text-white
    data-[state=active]:shadow-md
    data-[state=active]:ring-1
    data-[state=active]:ring-indigo-500/60
  ">Videos</TabsTrigger>
                        <TabsTrigger value="playlist" className="
    rounded-lg px-6 py-2 text-gray-400
    data-[state=active]:bg-gray-800
    data-[state=active]:text-white
    data-[state=active]:shadow-md
    data-[state=active]:ring-1
    data-[state=active]:ring-indigo-500/60
  ">Playlists</TabsTrigger>
                        <TabsTrigger value="tweets" className="
    rounded-lg px-6 py-2 text-gray-400
    data-[state=active]:bg-gray-800
    data-[state=active]:text-white
    data-[state=active]:shadow-md
    data-[state=active]:ring-1
    data-[state=active]:ring-indigo-500/60
  ">Tweets</TabsTrigger>
                        <TabsTrigger value="subscribed" className="
    rounded-lg px-6 py-2 text-gray-400
    data-[state=active]:bg-gray-800
    data-[state=active]:text-white
    data-[state=active]:shadow-md
    data-[state=active]:ring-1
    data-[state=active]:ring-indigo-500/60
  ">Subscribed</TabsTrigger>
                    </TabsList>

                    <TabsContent
                        value="videos"
                        className="mt-8 rounded-xl border border-gray-800 bg-gray-900/60 p-6
             data-[state=active]:animate-in data-[state=active]:fade-in
             data-[state=active]:slide-in-from-bottom-2"
                    >

                        {videos.length === 0 ? (
                            <p className="text-gray-400">No videos uploaded yet</p>
                        ) : (
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
                        )}
                    </TabsContent>

                    <TabsContent value="playlist" className="mt-8">
                        <Button className="mb-4">Create Playlist</Button>
                        <p className="text-gray-400">No playlists yet</p>
                    </TabsContent>

                    <TabsContent value="tweets" className="mt-8">
                        <p className="text-gray-400">No tweets yet</p>
                    </TabsContent>

                    <TabsContent value="subscribed" className="mt-8">
                        <p className="text-gray-400">No subscriptions</p>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}


export default MyAccount
