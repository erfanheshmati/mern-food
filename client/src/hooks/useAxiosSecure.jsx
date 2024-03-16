import axios from "axios"
import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const axiosSecure = axios.create({ baseURL: "http://localhost:5000" })

export default function useAxiosSecure() {
    const navigate = useNavigate()
    const { logOut } = useAuth()

    // request interceptor
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem("access-token")
        config.headers.authorization = `Bearer ${token}`
        return config
    }, function (error) {
        return Promise.reject(error)
    })

    // response interceptor
    axiosSecure.interceptors.response.use(function (response) {
        return response
    }, async (error) => {
        const status = error.response.status
        if (status === 401 || status === 403) {
            await logOut()
            navigate("/signup")
        }
        return Promise.reject(error)
    })

    return axiosSecure
}