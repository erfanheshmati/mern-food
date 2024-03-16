import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../layout/MainLayout"
import Home from "../pages/home/Home"
import Menu from "../pages/shop/Menu"
import Signup from "../components/Signup"
import PrivateRouter from "../private-routes/PrivateRouter"
import UpdateProfile from "../pages/dashboard/UpdateProfile"
import Cart from "../pages/shop/Cart"
import DashboardLayout from "../layout/DashboardLayout"
import Dashboard from "../pages/dashboard/admin/Dashboard"
import Users from "../pages/dashboard/admin/Users"
import AddMenu from "../pages/dashboard/admin/AddMenu"
import ManageItems from "../pages/dashboard/admin/ManageItems"
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu"

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
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
    {
        path: '/dashboard',
        element: <PrivateRouter><DashboardLayout /></PrivateRouter>,
        children: [
            {
                path: '',
                element: <Dashboard />
            },
            {
                path: 'users',
                element: <Users />
            },
            {
                path: 'add-menu',
                element: <AddMenu />
            },
            {
                path: 'manage-items',
                element: <ManageItems />
            },
            {
                path: 'update-menu/:id',
                element: <UpdateMenu />,
                loader: ({ params }) => fetch(`http://localhost:5000/menu/${params.id}`)
            },
        ]
    }
])

export default router