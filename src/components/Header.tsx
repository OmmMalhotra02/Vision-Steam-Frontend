import { Button } from "./ui/button"
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setShowLoginPage, logout } from "@/store/loginSlice"
import { ModeToggle } from "@/components/mode-toggle"

interface HeaderProps {
  toggleSidebar: () => void
}

function Header({ toggleSidebar }: HeaderProps) {
  const dispatch = useDispatch()
  const loginStatus = useSelector((state: any) => state.login.status)

  return (
    <nav
      className="
        w-full flex items-center justify-between
        px-6 py-3
        bg-white dark:bg-gray-900
        text-gray-900 dark:text-gray-100
        border-b border-gray-200 dark:border-gray-800
      "
    >

      <div className="flex gap-4 items-center">
        <button
          onClick={toggleSidebar}
          className="w-10 h-10 text-xl rounded-md
                     hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          ☰
        </button>
        <img src="logo.png" alt="logo" className="w-32 hidden md:block" />
      </div>

      <div className="hidden md:flex justify-center flex-1">
        <input
          type="text"
          placeholder="Search"
          className="
            w-full max-w-[420px] h-11
            rounded-full px-5
            bg-gray-100 dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            border border-gray-300 dark:border-gray-700
            focus:outline-none focus:ring-2 focus:ring-indigo-500
          "
        />
      </div>

      <div className="flex items-center gap-3">
        <ModeToggle />

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
