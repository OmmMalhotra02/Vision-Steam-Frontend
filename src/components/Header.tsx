import React from 'react'
import { Button } from './ui/button'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setShowLoginPage, logout } from '@/store/loginSlice'
import {
    SidebarTrigger,
} from "@/components/ui/sidebar"

function Header() {

    const dispatch = useDispatch()
    // const loginpageShowStatus = useSelector((state: any) => state.login.showLoginPage)
    const loginStatus = useSelector((state: any) => state.login.status)

    return (
        <nav className='flex flex-1 items-center justify-between mr-5'>
            <div className='flex gap-10'>
                <SidebarTrigger className="w-10 h-10" />
                <img src="logo.png" alt="logo" className='w-35' />
            </div>
            <div>
                <input type="text" placeholder='Search' className='border border-black w-150 h-11 rounded-4xl p-4' />
            </div>
            <div className=''>
                {loginStatus ? (
                    <Button variant='outline' onClick={() => dispatch(logout())}>
                        Logout
                    </Button>

                ) :
                    <NavLink to="/login">
                        <Button variant='outline' onClick={() => dispatch(setShowLoginPage(true))}>
                            Login
                        </Button>
                    </NavLink>}
            </div>
        </nav>
    )
}

export default Header