import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import PlaylistVideoRow from "@/components/PlaylistVideoRow"
import VideoAsRow from "@/components/VideoAsRow"
import apiClient from "@/api/apiClient"
import { toast } from "sonner"

function AddVideosToPlaylist() {
  const { playlistId } = useParams()
  const [playlist, setPlaylist] = useState<any>(null)
  const [videos, setVideos] = useState<any[]>([])

  const fetchAllVideos = async () => {
    try {
      const res = await apiClient.get("/api/dashboard/videos")
      setVideos(res.data.data)
    } catch (err) {
      console.error(err)
      toast.error("Failed to fetch channel videos")
    }
  }

  const fetchPlaylist = async () => {
    try {
      const res = await apiClient.get(`/api/playlist/${playlistId}`)
      setPlaylist({
        ...res.data.data,
        videos: res.data.data.videos || []
      })
    } catch (err) {
      console.error(err)
      toast.error("Failed to fetch playlist")
    }
  }

  useEffect(() => {
    fetchAllVideos()
    fetchPlaylist()
  }, [playlistId])

  const handleAddVideo = async (videoId: string) => {
    try {
      await apiClient.patch(`/api/playlist/add/${videoId}/${playlistId}`)
      toast.success("Video added to playlist")
      fetchPlaylist()
    } catch (err: any) {
      console.error(err)
      toast.error(err?.response?.data?.message || "Failed to add video")
    }
  }

  const handleRemove = async (videoId: string) => {
    try {
      await apiClient.patch(`/api/playlist/remove/${videoId}/${playlistId}`)
      toast.success("Video removed from playlist")
      fetchPlaylist()
    } catch (err: any) {
      console.error(err)
      toast.error(err?.response?.data?.message || "Failed to remove video")
    }
  }

  if (!playlist) {
    return (
      <div className="flex justify-center py-10 text-gray-600 dark:text-gray-400">
        Loading playlist...
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col lg:flex-row gap-6">

      <div className="flex-1 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{playlist.name}</h1>
        {playlist.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400">{playlist.description}</p>
        )}
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {playlist.videos.length} videos
        </p>

        <div className="space-y-3 max-h-[70vh] overflow-y-auto">
          {playlist.videos.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No videos in this playlist yet.
            </p>
          ) : (
            playlist.videos.map((vidId: string) => {
              const video = videos.find(v => v._id === vidId)
              if (!video) return null
              return <PlaylistVideoRow key={vidId} video={video} onRemove={() => handleRemove(vidId)} />
            })
          )}
        </div>
      </div>

      <div className="flex-1 text-black bg-white dark:bg-gray-900 dark:text-white p-4 rounded-xl shadow-sm max-h-[80vh] overflow-y-auto space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All videos from your Channel</h1>
        {videos.map((video: any) => {
          const isInPlaylist = playlist.videos.includes(video._id)
          return (
            <div key={video._id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <Button
                className="w-full sm:w-auto"
                variant="outline"
                disabled={isInPlaylist}
                onClick={() => handleAddVideo(video._id)}
              >
                {isInPlaylist ? "Added" : "Add"}
              </Button>
              <VideoAsRow video={video} />
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default AddVideosToPlaylist
