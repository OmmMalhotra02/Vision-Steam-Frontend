import { useEffect, useState } from "react"
import PlaylistCard from "@/components/PlaylistCard"
import CreatePlaylistDialog from "@/components/CreatePlaylistDialog"
import apiClient from "@/api/apiClient"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export default function ManagePlaylists() {
  const [playlists, setPlaylists] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState<any>(null)
  const [openCreate, setOpenCreate] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("userData")
    if (storedUser) setUserData(JSON.parse(storedUser))
    else setLoading(false)
  }, [])

  const fetchPlaylists = async () => {
    if (!userData?._id) return
    try {
      const res = await apiClient.get(`/api/playlist/user/${userData._id}`)
      setPlaylists(res.data.data)
    } catch {
      toast.error("Failed to load playlists")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPlaylists()
  }, [userData])

  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-gray-950 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold dark:text-white">Your Playlists</h1>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
              Organize your videos the way you want
            </p>
          </div>
          <Button onClick={() => setOpenCreate(true)} variant="outline">
            Create Playlist
          </Button>
          <CreatePlaylistDialog
            open={openCreate}
            onOpenChange={setOpenCreate}
            onSuccess={fetchPlaylists}
          />
        </div>

        {loading ? (
          <div className="text-gray-700 dark:text-gray-300 text-sm">Loading playlists...</div>
        ) : playlists.length === 0 ? (
          <div className="rounded-xl border border-dashed p-8 text-center
                          bg-white dark:bg-gray-900 dark:border-gray-800">
            <p className="text-gray-700 dark:text-gray-300">
              You haven't created any playlists yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {playlists.map(p => (
              <PlaylistCard key={p._id} playlist={p} onUpdated={fetchPlaylists} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
