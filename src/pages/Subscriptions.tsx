import React, { useEffect, useState } from 'react'
import { VideoCard } from '@/components/video-card'
import axios from 'axios'
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
                const res = await axios.get(`/api/subscriptions/c/${subscriberId}`)
                setChannels(res.data.data.channelsSubscribed);
            } catch (error) {
                console.error(error);
            }
        }
        fetchSubscribedChannels()
    }, [])

    return (
        <div className=" p-10 flex flex-row flex-wrap items-center gap-12">
            {
                channels.map((channel: any) => (
                    <div key={channel._id} className='flex flex-col justify-center items-center gap-5'>
                        <NavLink to={`/channel/${channel.channel._id}`} className="flex flex-col justify-center items-center gap-5">
                        <Avatar className="w-56 h-56">
                            <AvatarImage src={channel.channel.avatar} alt="@shadcn" className='size-xl' />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="text-lg font-semibold">
                            {channel.channel.username}
                        </p>
                        </NavLink>
                    </div>

                ))
            }

        </div>
    )
}

export default Subscriptions