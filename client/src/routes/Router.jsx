import { createBrowserRouter } from "react-router-dom"
import Layout from "../layout/Layout"
import Home from "../pages/home/Home"
import Menu from "../pages/shop/Menu"
import Signup from "../components/Signup"
import PrivateRouter from "../private-routes/PrivateRouter"
import UpdateProfile from "../pages/dashboard/UpdateProfile"

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
                element: <PrivateRouter><Menu /></PrivateRouter>
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