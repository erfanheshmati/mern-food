import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSecure'
import { useQuery } from "@tanstack/react-query"

export default function useAdmin() {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, "isAdmin"],
        queryFn: async () => {
            const res = await axiosSecure.get(`user/admin/${user?.email}`)
            return res.data?.admin
        }
    })

    return [isAdminLoading, isAdmin]
}
