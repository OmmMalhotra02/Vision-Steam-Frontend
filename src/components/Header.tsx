import React from 'react'
import { Button } from './ui/button'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setShowLoginPage, logout } from '@/store/loginSlice'

interface HeaderProps {
  toggleSidebar: () => void
}

function Header({ toggleSidebar }: HeaderProps) {
  const dispatch = useDispatch()
  const loginStatus = useSelector((state: any) => state.login.status)

  return (
    <nav className="
      w-full
      flex items-center justify-between
      px-6 py-3
      bg-gray-100 dark:bg-gray-900
    text-gray-900 dark:text-gray-100
      border-b border-gray-400
    ">
      <div className="flex gap-4 items-center">
        <button
          onClick={toggleSidebar}
          className="w-10 h-10 text-xl text-white"
        >
          ☰
        </button>
        <img src="logo.png" alt="logo" className="w-35 hidden md:block" />
      </div>

      <div className="hidden md:flex justify-center flex-1">
        <input
          type="text"
          placeholder="Search"
          className="
            w-full max-w-[420px] h-11
            rounded-full px-5
            bg-gray-100 dark:bg-gray-900 text-white
            border border-neutral-700
            focus:outline-none
          "
        />
      </div>

      <div>
        {loginStatus ? (
          <Button variant="outline" onClick={() => dispatch(logout())}>
            Logout
          </Button>
        ) : (
          <NavLink to="/login">
            <Button
              variant="outline"
              onClick={() => dispatch(setShowLoginPage(true))}
            >
              Login
            </Button>
          </NavLink>
        )}
      </div>
    </nav>
  )
}


export default Header
