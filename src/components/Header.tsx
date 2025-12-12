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
    <nav className="flex flex-1 items-center justify-between mr-5">
      <div className="flex gap-4 items-center">
        <button onClick={toggleSidebar} className="w-10 h-10 text-xl">
          ☰
        </button>
        <img src="logo.png" alt="logo" className="w-35 hidden md:block" />
      </div>

      <div>
        <input
          type="text"
          placeholder="Search"
          className="border border-black w-150 h-11 rounded-4xl p-4"
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
