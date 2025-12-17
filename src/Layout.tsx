import { useState, useEffect } from 'react'
import Header from './components/Header'
import { Link, Outlet } from 'react-router-dom'
import { AppSidebar } from '@/components/app-sidebar'
import { Toaster } from "@/components/ui/sonner"

const DESKTOP_BREAKPOINT = 768

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= DESKTOP_BREAKPOINT)
  const toggleSidebar = () => setSidebarOpen(prev => !prev)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= DESKTOP_BREAKPOINT) {
        setSidebarOpen(true)
      } else {
        setSidebarOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="flex h-screen">

      <div
        className="fixed top-0 left-0 h-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-lg transition-transform duration-300 z-50"
        style={{
          width: 255,
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)'
        }}
      >
        <div className="flex w-auto justify-between items-center p-3 border-b border-gray-500">
          <Link to="/">
            <img src="logo.png" alt="logo" className="w-31.5" />
          </Link>
          <button onClick={toggleSidebar} className="text-xl font-bold">
            ✕
          </button>
        </div>
        <AppSidebar />
      </div>

      <div className="flex-1 flex flex-col">

        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 dark:border-gray-800">
          <Header toggleSidebar={toggleSidebar} />
        </header>

        <main
          className="flex-1 transition-all duration-300"
          style={{ marginLeft: sidebarOpen ? 250 : 0 }}
        >
          <Outlet />
        </main>
        <Toaster
          position="top-center"
          richColors
          closeButton
          toastOptions={{
            className: "h-10 rounded-lg shadow-md",
          }}
        />
      </div>
    </div>
  )
}

export default Layout
