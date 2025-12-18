import { useEffect, useState } from "react"
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
import apiClient from "@/api/apiClient"
import { Button } from "@/components/ui/button"
import { Video, Users, Eye, ThumbsUp, MessageSquare, Heart } from "lucide-react";

type Stats = {
    totalVideos: number,
    totalSubscribers: number,
    totalVideoLikes: number,
    totalTweetLikes: number,
    totalCommentLikes: number,
    totalCommentsCount: number,
    totalViews: number,
}

const initialStats = {
    totalVideos: 0,
    totalSubscribers: 0,
    totalVideoLikes: 0,
    totalTweetLikes: 0,
    totalCommentLikes: 0,
    totalCommentsCount: 0,
    totalViews: 0
}

function MyAccount() {
    const userData = useSelector((state: any) => state.login.userData)
    const [stats, setStats] = useState<Stats>(initialStats)

    useEffect(() => {
        const handleStats = async () => {
            const res = await apiClient.get("/api/dashboard/stats")
            setStats(res.data.data)
        }
        handleStats()
    }, [])

    return (
        <div className="min-h-screen text-black bg-gray-100 dark:bg-gray-950 dark:text-white">
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
                        <Avatar className="w-32 h-32 text-black bg-gray-100 dark:bg-gray-950 dark:text-white">
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

                <div className="grid grid-cols-2 gap-3 mt-5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                    <div className="rounded-xl border bg-card p-3 sm:p-4 transition-colors hover:border-indigo-500/40">
                        <div className="flex items-center justify-between">
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                Total Videos
                            </p>
                            <Video className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-500" />
                        </div>
                        <h3 className="mt-1 sm:mt-2 text-xl sm:text-2xl font-semibold">
                            <h3 className="mt-1 sm:mt-2 text-xl sm:text-2xl font-semibold">
                                {stats.totalVideos || 0}
                            </h3>

                        </h3>
                    </div>

                    <div className="rounded-xl border bg-card p-3 sm:p-4 transition-colors hover:border-rose-500/40">
                        <div className="flex items-center justify-between">
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                Subscribers
                            </p>
                            <Users className="h-4 w-4 sm:h-5 sm:w-5 text-rose-500" />
                        </div>
                        <h3 className="mt-1 sm:mt-2 text-xl sm:text-2xl font-semibold">
                            {stats?.totalSubscribers || 0}
                        </h3>
                    </div>

                    <div className="rounded-xl border bg-card p-3 sm:p-4 transition-colors hover:border-emerald-500/40">
                        <div className="flex items-center justify-between">
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                Total Views
                            </p>
                            <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500" />
                        </div>
                        <h3 className="mt-1 sm:mt-2 text-xl sm:text-2xl font-semibold">
                            {stats?.totalViews || 0}
                        </h3>
                    </div>

                    <div className="rounded-xl border bg-card p-3 sm:p-4 transition-colors hover:border-blue-500/40">
                        <div className="flex items-center justify-between">
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                Video Likes
                            </p>
                            <ThumbsUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                        </div>
                        <h3 className="mt-1 sm:mt-2 text-xl sm:text-2xl font-semibold">
                            {stats.totalVideoLikes || 0}
                        </h3>
                    </div>

                    <div className="rounded-xl border bg-card p-3 sm:p-4 transition-colors hover:border-purple-500/40">
                        <div className="flex items-center justify-between">
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                Total Comment
                            </p>
                            <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
                        </div>
                        <h3 className="mt-1 sm:mt-2 text-xl sm:text-2xl font-semibold">
                            {stats?.totalCommentsCount || 0}
                        </h3>
                    </div>

                    <div className="rounded-xl border bg-card p-3 sm:p-4 transition-colors hover:border-purple-500/40">
                        <div className="flex items-center justify-between">
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                Comment Likes
                            </p>
                            <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
                        </div>
                        <h3 className="mt-1 sm:mt-2 text-xl sm:text-2xl font-semibold">
                            {stats?.totalCommentLikes || 0}
                        </h3>
                    </div>

                    <div className="rounded-xl border bg-card p-3 sm:p-4 transition-colors hover:border-pink-500/40">
                        <div className="flex items-center justify-between">
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                Tweet Likes
                            </p>
                            <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-pink-500" />
                        </div>
                        <h3 className="mt-1 sm:mt-2 text-xl sm:text-2xl font-semibold">
                            {stats?.totalTweetLikes || 0}
                        </h3>
                    </div>
                </div>


                <Tabs defaultValue="videos" className="mt-10 text-black bg-gray-100 dark:bg-gray-950 dark:text-white">
                    <TabsList className="flex justify-between w-full max-w-4xl mx-auto rounded-xl border border-gray-800 p-1 text-black bg-gray-100 dark:bg-gray-950 dark:text-white">

                        <TabsTrigger value="playlist" className="rounded-lg px-6 py-2 text-gray-400 data-[state=active]:bg-gray-800 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:ring-1 data-[state=active]:ring-indigo-500/60">
                            Playlists
                        </TabsTrigger>
                        <TabsTrigger value="tweets" className="rounded-lg px-6 py-2 text-gray-400 data-[state=active]:bg-gray-800 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:ring-1 data-[state=active]:ring-indigo-500/60">
                            Tweets
                        </TabsTrigger>
                        <TabsTrigger value="subscribed" className="rounded-lg px-6 py-2 text-gray-400 data-[state=active]:bg-gray-800 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:ring-1 data-[state=active]:ring-indigo-500/60">
                            Subscribed
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="playlist" className="mt-8 rounded-xl border text-black bg-gray-100 dark:bg-gray-950 dark:text-white border-gray-800 p-6 data-[state=active]:animate-in data-[state=active]:fade-in data-[state=active]:slide-in-from-bottom-2">
                        <Button className="mb-4 hover:bg-gray-800" variant="outline">Create Playlist</Button>
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
        </div >
    )
}

export default MyAccount