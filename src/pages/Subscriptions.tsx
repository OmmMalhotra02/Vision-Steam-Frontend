import React, { useEffect, useState } from 'react'
import apiClient from '@/api/apiClient'
import { useSelector } from 'react-redux'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { NavLink } from 'react-router-dom'

function Subscriptions() {

    const [channels, setChannels] = useState([])

    const userData = useSelector((state: any) => state.login?.userData)

    const subscriberId = userData._id

    useEffect(() => {

        const fetchSubscribedChannels = async () => {
            try {
                const res = await apiClient.get(`/api/subscriptions/c/${subscriberId}`)
                setChannels(res.data.data.channelsSubscribed);
            } catch (error) {
                console.error(error);
            }
        }
        fetchSubscribedChannels()
    }, [subscriberId])

    return (
        <div className="min-h-screen px-6 py-10 dark:bg-gray-950 text-gray-100 flex flex-col items-center">

            <h1 className="text-2xl sm:text-3xl font-semibold mb-10 tracking-wide">
                Your Subscriptions
            </h1>

            <div className="flex flex-wrap justify-center gap-16">
                {channels.map((channel: any) => (
                    <NavLink
                        key={channel._id}
                        to={`/channel/${channel.channel._id}`}
                        className="group flex flex-col items-center gap-4 transition-transform hover:scale-105"
                    >

                        <div className="
            rounded-full p-1
            bg-linear-to-tr
            from-indigo-500/40 via-purple-500/40 to-pink-500/40
            group-hover:from-indigo-500 group-hover:to-pink-500
            transition-all
          ">
                            <Avatar className="w-40 h-40 sm:w-52 sm:h-52 bg-gray-900">
                                <AvatarImage
                                    src={channel.channel.avatar}
                                    alt={channel.channel.username}
                                    className="rounded-full object-cover"
                                />
                                <AvatarFallback className="text-xl">CN</AvatarFallback>
                            </Avatar>
                        </div>

                        <div className="px-5 py-1 rounded-full bg-gray-800 text-sm sm:text-base font-medium">
                            {channel.channel.username}
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    )


}

export default Subscriptions
