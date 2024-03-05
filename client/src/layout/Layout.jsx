import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <div>
            <nav></nav>
            <Outlet />
            <footer></footer>
        </div>
    )
}
