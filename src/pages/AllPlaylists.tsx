import apiClient from '@/api/apiClient'
import VideoAsRow from '@/components/VideoAsRow'
import React, { useEffect, useState } from 'react'

function AllPlaylists() {
    const [playlists, setPlaylists] = useState<any[]>([])
    const [selectedPlaylist, setSelectedPlaylist] = useState<any | null>(null)
    const [allVideos, setAllVideos] = useState<any[]>([])

    const fetchPlaylists = async () => {
        try {
            const res = await apiClient.get('/api/playlist/')
            setPlaylists(res.data.data || [])
        } catch (err) {
            console.error("Failed to fetch playlists", err)
        }
    }

    const fetchPlaylistDetails = async (playlistId: string) => {
        try {
            const res = await apiClient.get(`/api/playlist/${playlistId}`)
            setSelectedPlaylist(res.data.data)
        } catch (err) {
            console.error("Failed to fetch playlist details", err)
        }
    }

    const fetchAllVideos = async () => {
        try {
            const res = await apiClient.get('/api/dashboard/videos')
            setAllVideos(res.data.data || [])
        } catch (err) {
            console.error("Failed to fetch videos", err)
        }
    }

    useEffect(() => {
        fetchPlaylists()
        fetchAllVideos()
    }, [])

    return (
        <div className="mx-auto max-w-6xl px-4 py-6 space-y-6">

            {!selectedPlaylist ? (
                <>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">All Playlists</h2>
                    {playlists.length === 0 ? (
                        <div className="rounded-xl border border-dashed p-8 text-center bg-white dark:bg-gray-900 dark:border-gray-800">
                            <p className="text-gray-700 dark:text-gray-300">
                                No playlists yet.
                            </p>
                        </div>
                    ) : (
                        <ul className="space-y-2">
                            {playlists.map(p => (
                                <li
                                    key={p._id}
                                    className="p-4 rounded-lg cursor-pointer bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                                    onClick={() => fetchPlaylistDetails(p._id)}
                                >
                                    <h3 className="font-semibold text-gray-900 dark:text-white">{p.name}</h3>
                                    {p.description && <p className="text-sm text-gray-600 dark:text-gray-400">{p.description}</p>}
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{(p.videos || []).length} videos</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            ) : (
                <>
                    <button
                        className="mb-4 px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
                        onClick={() => setSelectedPlaylist(null)}
                    >
                        ← Back to playlists
                    </button>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{selectedPlaylist.name}</h2>
                    {selectedPlaylist.description && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{selectedPlaylist.description}</p>
                    )}

                    {(selectedPlaylist.videos || []).length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400">No videos in this playlist yet.</p>
                    ) : (
                        <div className="flex flex-col gap-4 max-w-6xl mx-auto">
                            {selectedPlaylist.videos.map((vidId: string) => {
                                const video = allVideos.find(v => v._id === vidId)
                                if (!video) return null
                                return <VideoAsRow key={vidId} video={video}/>
                            })}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default AllPlaylists
