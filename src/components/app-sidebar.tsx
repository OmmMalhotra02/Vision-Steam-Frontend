import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import {
  Home, Youtube, Folder, Heart, Clock, User, Upload, Menu, X
} from "lucide-react"

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
        { title: "My Account", url: "/my-account", icon: <User size={18} /> },
        { title: "Upload Video", url: "/upload", icon: <Upload size={18} /> },
      ],
    },
  ]

  return (
    <div className="flex flex-col gap-6 p-4">
      {navData.map(group => (
        <div key={group.title}>
          <h3 className="mb-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
            {group.title}
          </h3>

          <ul className="ml-1 flex flex-col gap-1 border-b border-gray-500">
            {group.items.map(item => (
              <li key={item.title}>
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-md transition-colors
                     hover:bg-gray-200 dark:hover:bg-gray-800
                     ${isActive ? "bg-gray-300 dark:bg-gray-700 font-medium" : ""}`
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

