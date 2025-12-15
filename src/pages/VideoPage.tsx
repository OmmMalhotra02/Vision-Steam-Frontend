import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
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
} from "@/components/ui/shadcn-io/video-player"
import { useParams } from 'react-router-dom'
import apiClient from '@/api/apiClient'
import { useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Share2, Download, Bell, Trash2 } from "lucide-react"
import { toast } from "sonner"
import confetti from "canvas-confetti"

function VideoPage() {
    const { videoId } = useParams()
    const loginStatus = useSelector((state: any) => state.login.status)
    const loginUserId = useSelector((state: any) => state.login.userData?._id)
    const [loading, setLoading] = useState(false)
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState<any[]>([])
    const [like, setLike] = useState(false)
    const [videoData, setVideoData] = useState(null)
    const [likesCount, setLikesCount] = useState(videoData?.likes || 0)
    const [subscribed, setSubscribed] = useState(null)

    const fireConfetti = () => {
        confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#ff0000", "#ff6b6b", "#ffd93d"]
        })
    }

    const handleAddComment = async () => {
        if (!comment) return
        try {
            const res = await apiClient.post(`/api/comments/${videoId}`, { content: comment })
            const newComment = res.data.data

            setComments(prev => [...prev, {
                text: newComment.content,
                user: {
                    fullName: newComment.owner.fullName,
                    avatar: newComment.owner.avatar
                }
            }])
            setComment("")
            toast.success("Comment added!")
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteComment = async (commentId) => {
        try {
            await apiClient.delete(`/api/comments/${commentId}`)
            setComments((prev) => prev.filter(c => c._id !== commentId))
            toast.success("Comment deleted!")
        } catch (error) {
            console.error(error)
            toast.error("Failed to delete comment")
        }
    }

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(videoData.videoFile)
            toast.success("Video link copied!", { duration: 3000 })
        } catch (err) {
            console.log(err)
        }
    }

    const handleLike = async () => {
        try {
            const res = await apiClient.post(`/api/likes/toggle/v/${videoId}`)
            if (res.data.message.includes("Liked")) {
                setLike(true)
                setLikesCount((prev: any) => prev + 1)
            } else {
                setLike(false)
                setLikesCount((prev: any) => Math.max(prev - 1, 0))
            }
        } catch (error) {
            console.error("Error liking video", error)
        }
    }

    const handleSubscribe = async () => {
        try {
            const res = await apiClient.post(`/api/subscriptions/c/${videoData.owner}`)

            const isSubscribed = res.data.data.subscribed
            setSubscribed(isSubscribed)
            if (isSubscribed) {
                fireConfetti()
                toast.success("Subscribed 🎉")
            } else {
                toast("Unsubscribed")
            }
        } catch (error) {
            console.error(error)
            const serverMessage = error.response?.data?.message
            serverMessage ? toast.error(serverMessage) : toast.error("Something went wrong")
        }
    }

    useEffect(() => {
        const fetchVideoUrl = async () => {
            try {
                setLoading(true)
                const response = await apiClient.get(`/api/videos/${videoId}`)
                const video = response.data.data
                setVideoData(video)
                setLike(video.isLiked)
                setSubscribed(video.isSubscribed ?? false)
                setLikesCount(video.likesCount)

                const commentResponse = await apiClient.get(`/api/comments/${videoId}`)
                const mappedComments = commentResponse.data.data.map((c: any) => ({
                    _id: c._id,
                    text: c.content,
                    user: {
                        _id: c.owner._id,
                        fullName: c.owner.fullName,
                        avatar: c.owner.avatar
                    }
                }))
                setComments(mappedComments)
            } catch (error) {
                console.error("Error on fetching video url or comments", error)
            } finally {
                setLoading(false)
            }
        }
        if (loginStatus) fetchVideoUrl()
    }, [videoId, loginStatus])

    if (!loginStatus) return <div>Please login to watch this video.</div>
    if (loading) return <div>Loading Video.....</div>
    if (!videoData?.videoFile) return <div>Video not found</div>

    return (
        <div className="p-6 dark:bg-gray-800 dark:text-white">
            <VideoPlayer className="w-full h-[400px]">
                <VideoPlayerContent src={videoData?.videoFile} controls className="w-full h-full" poster={videoData?.thumbnail} />
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
            <h2 className="text-2xl font-bold mt-4">{videoData?.title}</h2>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={videoData?.ownerAvatar || "https://res.cloudinary.com/dtx0qlu9l/image/upload/v1765610926/jgojbw8xlduqisqfvxbz.png"} />
                        <AvatarFallback>{videoData?.ownerFullName?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{videoData?.ownerFullName}</p>
                        <p className="text-sm text-gray-500">{videoData?.views} views</p>
                    </div>
                </div>

                <div className="flex items-center gap-6 mt-4">
                    <div className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition" onClick={handleLike}>
                        <Heart size={24} className={like ? "text-red-500" : "text-gray-500"} />
                        <span>{likesCount}</span>
                    </div>

                    <div className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition" onClick={handleShare}>
                        <Share2 size={24} />
                        <span>Share</span>
                    </div>

                    <div className="flex items-center gap-2 cursor-pointer hover:text-green-500 transition">
                        <Download size={24} />
                        <span>Download</span>
                    </div>

                    <button
                        onClick={handleSubscribe}
                        className={`ml-auto flex items-center gap-2 px-4 py-2 rounded-lg transition
                            ${subscribed
                                ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                : "bg-red-600 text-white hover:bg-red-700"
                            }`}
                    >
                        <Bell size={20} />
                        {subscribed ? "Subscribed" : "Subscribe"}
                    </button>
                </div>
            </div>

            <div className="mt-4 text-gray-700 dark:text-white">
                <h3 className="font-semibold text-lg mb-1">Description</h3>
                <p>{videoData?.description}</p>
            </div>

            <div className="mt-6">
                <h3 className="text-xl font-semibold mb-2">Comments</h3>
                <div className="flex flex-col gap-2 mb-4">
                    <Textarea
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    />
                    <Button onClick={handleAddComment}>Post Comment</Button>
                </div>
                <div className="space-y-3">
                    {comments.map((c) => (
                        <div key={c._id} className="flex items-start gap-3">
                            <Avatar>
                                {c.user.avatar ? (
                                    <AvatarImage src={c.user.avatar} />
                                ) : (
                                    <AvatarFallback>{c.user.fullName?.[0] || "U"}</AvatarFallback>
                                )}
                            </Avatar>

                            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md flex-1">
                                <p className="font-semibold text-sm">{c.user.fullName}</p>
                                <p className="text-sm">{c.text}</p>
                            </div>

                            {c.user._id === loginUserId && (
                                <button
                                    onClick={() => handleDeleteComment(c._id)}
                                    className="text-red-500 text-sm ml-2"
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default VideoPage
