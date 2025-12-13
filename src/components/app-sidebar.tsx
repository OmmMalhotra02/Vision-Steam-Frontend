import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  Home,
  Youtube,
  Folder,
  Heart,
  Clock,
  User,
  Upload
} from 'lucide-react'

export function AppSidebar() {
  const navData = [
    {
      title: "Main",
      items: [
        { title: "Home", url: "/", icon: <Home size={18} /> },
        { title: "Subscriptions", url: "/subscriptions", icon: <Youtube size={18} /> },
        { title: "Playlists", url: "/playlists", icon: <Folder size={18} /> },
        { title: "Liked Videos", url: "/likes", icon: <Heart size={18} /> },
        { title: "History", url: "/history", icon: <Clock size={18} /> },
      ],
    },
    {
      title: "User",
      items: [
        { title: "My Account", url: "/account", icon: <User size={18} /> },
        { title: "Upload Video", url: "/upload", icon: <Upload size={18} /> },
      ],
    },
  ]

  return (
    <div className="flex flex-col p-4 gap-6 w-63 bg-gray-50 h-full border-r">
      {navData.map((group) => (
        <div key={group.title}>
          <h3 className="font-bold mb-2 text-gray-700">{group.title}</h3>
          <ul className="ml-2 flex flex-col gap-2">
            {group.items.map((item) => (
              <li key={item.title}>
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-200 ${
                      isActive ? "bg-gray-300 font-semibold" : ""
                    }`
                  }
                >
                  {item.icon}
                  <span>{item.title}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
