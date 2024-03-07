import { createBrowserRouter } from "react-router-dom"
import Layout from "../layout/Layout"
import Home from "../pages/home/Home"
import Menu from "../pages/shop/Menu"
import Signup from "../components/Signup"

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/menu',
                element: <Menu />
            },
        ]
    },
    {
        path: '/signup',
        element: <Signup />
    },
])

export default router