import apiClient from '@/api/apiClient'
import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Dropzone, DropzoneEmptyState, DropzoneContent } from '@/components/ui/shadcn-io/dropzone'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

type FormData = {
    title: string
    description: string
    video: File | null
    thumbnail: File | null
}

type VideoData = {
    title: string
    description: string
    videoFile: string
    thumbnail: string
}

function VideoUpdate() {
    const { videoId } = useParams()
    const [videoData, setVideoData] = useState<VideoData>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { register, handleSubmit, control, reset, formState: { errors }, watch } = useForm<FormData>({})

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const res = await apiClient.get(`/api/videos/${videoId}`)
                const data = res.data.data
                setVideoData(data)
                reset({
                    title: data.title,
                    description: data.description,
                    video: null,
                    thumbnail: null,
                })
                toast.success("Video data fetched successfully")
            } catch (error: any) {
                console.log(error)
                toast.error(error.response?.data?.data?.message || "Failed to fetch video")
            }
        }
        fetchVideoData()
    }, [videoId, reset])

    const handleUpdate = async (data: FormData) => {
        setIsSubmitting(true)
        try {
            const formData = new FormData()
            formData.append("title", data.title)
            formData.append("description", data.description)

            if (data.video) formData.append("videoFile", data.video)
            if (data.thumbnail) formData.append("thumbnail", data.thumbnail)

            await apiClient.patch(`/api/videos/${videoId}`, formData)
            toast.success("Video updated successfully")
        } catch (error) {
            console.log(error)
            toast.error("Update failed")
        } finally {
            setIsSubmitting(false)
        }
    }

    const thumbnail = watch("thumbnail")
    const videoFile = watch("video")

    return (
        <div className="min-h-screen flex justify-center px-4 py-6 sm:py-10 bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
            <div className="w-full max-w-3xl rounded-2xl bg-white dark:bg-gray-900 text-black dark:text-white shadow-xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
                        Upload Video
                    </h1>
                    <Link to={"/my-account"}>
                        <Button size="sm" variant='outline'>Back</Button>
                    </Link>
                </div>


                <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4 sm:space-y-6">
                    <div className="space-y-1">
                        <Input
                            placeholder="Video Title"
                            {...register("title", { required: "Title is required" })}
                            className="text-black dark:bg-gray-700 dark:text-white"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <Textarea
                            placeholder="Video Description"
                            rows={4}
                            {...register("description", { required: "Description is required" })}
                            className="text-black dark:bg-gray-700 dark:text-white"
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>

                    {(videoFile || videoData?.videoFile) && (
                        <video
                            controls
                            className="w-full h-48 sm:h-64 rounded-md object-cover"
                        >
                            <source src={videoFile ? URL.createObjectURL(videoFile) : videoData.videoFile} type="video/mp4" />
                        </video>
                    )}

                    <Controller
                        name="video"
                        control={control}
                        render={({ field }) => (
                            <div className="space-y-2">
                                <label className="font-medium text-sm">Video File</label>
                                <Dropzone
                                    accept={{ "video/*": [] }}
                                    maxSize={1024 * 1024 * 100}
                                    maxFiles={1}
                                    src={field.value ? [field.value] : undefined}
                                    onDrop={(files) => {
                                        const file = files[0]
                                        if (!file) return
                                        const properFile = new File([file], file.name, { type: file.type })
                                        field.onChange(properFile)
                                    }}
                                    onError={console.error}
                                >
                                    {!field.value ? (
                                        <DropzoneEmptyState className="border-2 border-dashed rounded-lg py-8 sm:py-10">
                                            <p className="font-medium text-center">Drag & drop your video here</p>
                                            <p className="text-xs sm:text-sm text-muted-foreground text-center">
                                                MP4, WebM, MOV (max 100MB)
                                            </p>
                                        </DropzoneEmptyState>
                                    ) : (
                                        <DropzoneContent className="border rounded-lg p-3 sm:p-4 bg-muted">
                                            <p className="font-medium truncate">{field.value.name}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {(field.value.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                            <p className="text-xs text-green-600 mt-1">Video ready to upload ✔</p>
                                        </DropzoneContent>
                                    )}
                                </Dropzone>
                            </div>
                        )}
                    />

                    {(thumbnail || videoData?.thumbnail) && (
                        <img
                            src={thumbnail ? URL.createObjectURL(thumbnail) : videoData.thumbnail}
                            alt="Thumbnail preview"
                            className="h-20 w-32 sm:h-24 sm:w-40 object-cover rounded-md border"
                        />
                    )}

                    <Controller
                        name="thumbnail"
                        control={control}
                        render={({ field }) => (
                            <div className="space-y-2">
                                <label className="font-semibold text-sm">Thumbnail</label>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    <label className="cursor-pointer border rounded-lg px-3 py-2 text-sm hover:bg-muted transition-colors">
                                        Choose image
                                        <input
                                            type="file"
                                            accept="image/*"
                                            hidden
                                            onChange={(e) => {
                                                const file = e.target.files?.[0]
                                                if (file) field.onChange(new File([file], file.name, { type: file.type }))
                                            }}
                                        />
                                    </label>
                                    {thumbnail && (
                                        <img
                                            src={URL.createObjectURL(thumbnail)}
                                            alt="Thumbnail preview"
                                            className="h-20 w-32 sm:h-24 sm:w-40 object-cover rounded-md border"
                                        />
                                    )}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    JPG or PNG, recommended 1280×720
                                </p>
                            </div>
                        )}
                    />

                    <Button
                        variant="outline"
                        type="submit"
                        className="w-full h-11 text-lg sm:text-base"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Uploading..." : "Upload"}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default VideoUpdate
