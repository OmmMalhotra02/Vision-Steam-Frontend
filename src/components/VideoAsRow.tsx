import React from 'react'
import { useNavigate } from 'react-router-dom';

interface Props {
    video: any;
}

const VideoAsRow = ({ video }: Props) => {
    const navigate = useNavigate()
    console.log();

    return (
        <div onClick={() => navigate(`/video/${video._id || video.likedVideosData._id}`)} className="flex gap-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition">

            <div className="relative w-48 h-28 shrink-0">
                <img
                    src={video.thumbnail || video.likedVideosData.thumbnail}
                    alt={video.title || video.likedVideosData.title}
                    className="w-full h-full object-cover rounded-lg"
                />
                <span className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                    {(() => {
                        const duration = video.duration ?? video.likedVideosData?.duration ?? 0;
                        const minutes = Math.floor(duration / 60);
                        const seconds = Math.floor(duration % 60);
                        return `${minutes}:${String(seconds).padStart(2, "0")}`;
                    })()}
                </span>

            </div>

            <div className="flex flex-col">
                <h3 className="font-medium text-sm sm:text-base line-clamp-2">
                    {video.likedVideosData.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {video?.ownerUser?.username || video?.likedVideosData.videoOwner.username}
                </p>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {video.likedVideosData.views} views • {new Date(video.likedVideosData.createdAt).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
};

export default VideoAsRow