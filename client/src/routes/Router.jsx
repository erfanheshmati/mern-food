import { createBrowserRouter } from "react-router-dom"
import Layout from "../layout/Layout"
import Home from "../pages/home/Home"
import Menu from "../pages/shop/Menu"
import Signup from "../components/Signup"
import PrivateRouter from "../private-routes/PrivateRouter"
import UpdateProfile from "../pages/dashboard/UpdateProfile"
import Cart from "../pages/shop/Cart"

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
            {
                path: '/cart',
                element: <Cart />
            },
            {
                path: '/update-profile',
                element: <PrivateRouter><UpdateProfile /></PrivateRouter>
            },
        ]
    },
    {
        path: '/signup',
        element: <Signup />
    },
])

export default router