import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import {
  Home, Youtube, Folder, Heart, Clock, User, Upload, Menu, X
} from "lucide-react"

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(false)

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
    <>
      {/* Mobile open button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded
          bg-gray-100 text-gray-900
          dark:bg-gray-800 dark:text-gray-100"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity md:hidden
          bg-black/40
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 p-4 gap-6 z-50
          border-r transition-transform duration-300
          bg-gray-50 text-gray-900 border-gray-200
          dark:bg-gray-900 dark:text-gray-100 dark:border-gray-800
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex md:flex-col
        `}
      >
        {/* Mobile close */}
        <button
          className="md:hidden mb-4 p-2 rounded
            hover:bg-gray-200 dark:hover:bg-gray-800"
          onClick={() => setIsOpen(false)}
        >
          <X size={20} />
        </button>

        {navData.map((group) => (
          <div key={group.title}>
            <h3 className="mb-2 text-sm font-semibold
              text-gray-600 dark:text-gray-400">
              {group.title}
            </h3>

            <ul className="ml-1 flex flex-col gap-1 border-b border-gray-500">
              {group.items.map((item) => (
                <li key={item.title}>
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      `
                      flex items-center gap-2 px-3 py-2 rounded-md
                      transition-colors
                      hover:bg-gray-200 dark:hover:bg-gray-800
                      ${
                        isActive
                          ? "bg-gray-300 dark:bg-gray-700 font-medium"
                          : ""
                      }
                      `
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
    </>
  )
}
