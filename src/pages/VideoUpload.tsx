import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Dropzone, DropzoneEmptyState, DropzoneContent } from '@/components/ui/shadcn-io/dropzone'
import apiClient from '@/api/apiClient'
import { toast } from 'sonner'
import { useState } from 'react'

type UploadFormData = {
    title: string
    description: string
    video: File | null
    thumbnail: File | null
}

function VideoUpload() {

    const [isSubmitting, setIsSubmitting] = useState(false)

    const { register, handleSubmit, control, reset, formState: { errors }, watch } = useForm<UploadFormData>({
        defaultValues: {
            title: "",
            description: "",
            video: null,
            thumbnail: null
        },
    })
    const thumbnail = watch("thumbnail")

    const onSubmit = async (data: UploadFormData) => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description);

            if (data.video) {
                const properVideo = new File([data.video], data.video.name, { type: data.video.type });
                formData.append("videoFile", properVideo);
            }

            if (data.thumbnail) {
                const properThumbnail = new File([data.thumbnail], data.thumbnail.name, { type: data.thumbnail.type });
                formData.append("thumbnail", properThumbnail);
            }

            const res = await apiClient.post('/api/videos/', formData);
            toast.success("Video uploaded successfully");
            reset({
                title: "",
                description: "",
                video: null,
                thumbnail: null
            });
        } catch (error) {
            console.error(error);
            toast.error("Process failed");
        } finally {
            setIsSubmitting(false)
        }
    };


    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Upload  Video</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className='space-y-1'>
                    <Input
                        placeholder="Video Title"
                        {...register("title", { required: "Title is required" })}
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm">{errors.title.message}</p>
                    )}
                </div>

                <div className="space-y-1">
                    <Textarea
                        placeholder='Video Description'
                        rows={4}
                        {...register("description", { required: "Description is required" })}
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                <Controller
                    name="video"
                    control={control}
                    rules={{ required: "Video file is required" }}
                    render={({ field }) => (
                        <div className="space-y-2">
                            <label className="font-medium text-sm">
                                Video File
                            </label>

                            <Dropzone
                                accept={{ "video/*": [] }}
                                maxSize={1024 * 1024 * 100}
                                maxFiles={1}
                                src={field.value ? [field.value] : undefined}
                                onDrop={(files) => {
                                    const file = files[0];
                                    if (!file) return;
                                    const properFile = new File([file], file.name, { type: file.type });
                                    field.onChange(properFile);
                                }}
                                onError={console.error}
                            >
                                {!field.value ? (
                                    <DropzoneEmptyState className="border-2 border-dashed rounded-lg py-10">
                                        <p className="font-medium">Drag & drop your video here</p>
                                        <p className="text-sm text-muted-foreground">
                                            MP4, WebM, MOV (max 100MB)
                                        </p>
                                    </DropzoneEmptyState>
                                ) : (
                                    <DropzoneContent className="border rounded-lg p-4 bg-muted">
                                        <p className="font-medium">{field.value.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {(field.value.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                        <p className="text-xs text-green-600 mt-1">
                                            Video ready to upload ✔
                                        </p>
                                    </DropzoneContent>
                                )}
                            </Dropzone>


                            {errors.video && (
                                <p className="text-red-500 text-sm">
                                    {errors.video.message}
                                </p>
                            )}
                        </div>
                    )}
                />


                <Controller
                    name="thumbnail"
                    control={control}
                    rules={{ required: "Thumbnail is required" }}
                    render={({ field }) => (
                        <div className="space-y-2">
                            <label className="font-semibold text-sm">Thumbnail</label>

                            <div className="flex items-center gap-4">
                                <label className="cursor-pointer border rounded-lg px-4 py-2 text-sm hover:bg-muted">
                                    Choose image
                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const properFile = new File([file], file.name, { type: file.type });
                                                field.onChange(properFile);
                                            }
                                        }}
                                    />
                                </label>

                                {thumbnail && (
                                    <img
                                        src={URL.createObjectURL(thumbnail)}
                                        alt="Thumbnail preview"
                                        className="h-20 w-32 object-cover rounded-md border"
                                    />
                                )}
                            </div>

                            <p className="text-xs text-muted-foreground">
                                JPG or PNG, recommended 1280×720
                            </p>

                            {errors.thumbnail && (
                                <p className="text-red-500 text-sm">
                                    {errors.thumbnail.message}
                                </p>
                            )}
                        </div>
                    )}
                />

                <Button type="submit" className="w-full h-11 text-lg" disabled={isSubmitting}>
                    {isSubmitting ? "Uploading..." : "Upload"}
                </Button>
            </form>
        </div>
    )
}

export default VideoUpload