import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import CreatePlaylistDialog from "./CreatePlaylistDialog"
import apiClient from "@/api/apiClient"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"

interface PlaylistCardProps {
  playlist: any
  onUpdated?: () => void // optional callback after edit
}

export default function PlaylistCard({ playlist, onUpdated }: PlaylistCardProps) {
  const [open, setOpen] = useState(false)

  const handleDelete = async () => {
    try {
      const res = await apiClient.delete(`/api/playlist/${playlist._id}`)
      toast.success(res.data.message)
      if (onUpdated) {
        onUpdated()
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Failed to delete playlist")
    }
  }

  return (
    <>
      <Card className="group hover:border-indigo-500/40 transition">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold line-clamp-2">{playlist.name}</h3>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreVertical className="h-4 w-4 text-muted-foreground dark:text-muted-dark" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 p-2 rounded-md shadow-md sm:w-auto md:w-48">
                <DropdownMenuItem onClick={() => setOpen(true)} className="text-fuchsia-600">Edit</DropdownMenuItem>
                <DropdownMenuItem className="text-red-500" onClick={handleDelete}>Delete</DropdownMenuItem>
                <Link to={`/playlists/${playlist._id}`}>
                  <DropdownMenuItem className="text-amber-400">Add Videos</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {playlist.description || "No description"}
          </p>

          <div className="flex items-center justify-between">
            <Badge variant="secondary">{playlist.videos.length} videos</Badge>
            <span className="text-xs text-muted-foreground">
              Updated {new Date(playlist.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </CardContent>
      </Card>

      <CreatePlaylistDialog
        open={open}
        onOpenChange={setOpen}
        playlist={playlist}
        onSuccess={onUpdated}
      />
    </>
  )
}
