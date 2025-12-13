import React, { useState } from 'react'
import Header from './components/Header'
import { Link, Outlet } from 'react-router-dom'
import { AppSidebar } from '@/components/app-sidebar'

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const toggleSidebar = () => setSidebarOpen(prev => !prev)

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className="fixed top-0 left-0 h-full bg-gray-100 shadow-lg transition-transform duration-300 z-50"
        style={{
          width: 250,
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)'
        }}
      >
        <div className="flex justify-between items-center p-3 border-b">
          <Link to="/">
            <img src="logo.png" alt="logo" className="w-31.5" />
          </Link>
          <button onClick={toggleSidebar} className="text-xl font-bold">
            ✕
          </button>
        </div>
        <AppSidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header stays fixed */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <Header toggleSidebar={toggleSidebar} />
        </header>

        {/* Outlet shifts when sidebar opens */}
        <main
          className="p-4 flex-1 transition-all duration-300"
          style={{ marginLeft: sidebarOpen ? 250 : 0 }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
