import { createBrowserRouter } from "react-router-dom"
import Layout from "../layout/Layout"
import Home from "../pages/home/Home"

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            }
        ]
    },
])

export default router