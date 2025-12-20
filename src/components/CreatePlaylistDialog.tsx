import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import apiClient from "@/api/apiClient"
import { toast } from "sonner"

interface CreatePlaylistDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  playlist?: any // optional, if editing
  onSuccess?: () => void
}

export default function CreatePlaylistDialog({
  open,
  onOpenChange,
  playlist,
  onSuccess
}: CreatePlaylistDialogProps) {
  const [playlistInfo, setPlayListInfo] = useState({
    name: "",
    description: ""
  })

  useEffect(() => {
    if (playlist) {
      setPlayListInfo({
        name: playlist.name,
        description: playlist.description
      })
    } else {
      setPlayListInfo({ name: "", description: "" })
    }
  }, [playlist])

  const enterFormData = (e: any) => {
    const { name, value } = e.target
    setPlayListInfo(prev => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (playlist) {
        await apiClient.patch(`/api/playlist/${playlist._id}`, playlistInfo)
        toast.success("Playlist updated")
      } else {
        await apiClient.post('/api/playlist/', playlistInfo)
        toast.success("Playlist created")
      }
      setPlayListInfo({ name: "", description: "" })
      onSuccess?.()
      onOpenChange(false)
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to save playlist")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          w-[95%] max-w-md
          rounded-xl
          bg-background text-foreground
          border
          dark:bg-gray-900 dark:border-gray-700 dark:text-white
          sm:p-6
          p-4
        "
      >
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl font-semibold">
            {playlist ? "Edit Playlist" : "Create Playlist"}
          </DialogTitle>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            Organize your videos and keep them in one place
          </p>
        </DialogHeader>

        <form onSubmit={onSubmit} className="mt-4 space-y-4">
          <Input
            placeholder="Playlist name"
            className="bg-background dark:bg-gray-800"
            name="name"
            value={playlistInfo.name}
            onChange={enterFormData}
          />

          <Textarea
            placeholder="Description"
            className="min-h-[90px] resize-none bg-background dark:bg-gray-800"
            name="description"
            value={playlistInfo.description}
            onChange={enterFormData}
          />

          <Button type="submit" className="w-full">
            {playlist ? "Update Playlist" : "Create Playlist"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
