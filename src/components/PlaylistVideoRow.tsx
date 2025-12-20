import { Button } from "@/components/ui/button"

interface PlaylistVideoRowProps {
  video: {
    thumbnail: string
    title: string
    views: number
  }
  onRemove: () => void
}

function PlaylistVideoRow({ video, onRemove }: PlaylistVideoRowProps) {
  
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 rounded-lg border border-gray-200 dark:border-gray-700">

      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full sm:w-32 h-20 rounded object-cover shrink-0"
      />

      <div className="flex-1 min-w-0">
        <h4 className="font-medium line-clamp-1 text-gray-900 dark:text-gray-100">
          {video.title}
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {video.views} views
        </p>
      </div>

      <Button
        variant="ghost"
        className="text-red-500 mt-2 sm:mt-0 shrink-0 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        onClick={onRemove}
      >
        Remove
      </Button>
    </div>
  )
}

export default PlaylistVideoRow
