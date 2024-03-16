import React from 'react'
import useAxiosPublic from './useAxiosPublic'
import { useQuery } from "@tanstack/react-query"

export default function useMenu() {
    const axiosPublic = useAxiosPublic()

    const { data: menu = [], isPending: loading, refetch } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await axiosPublic.get("/menu")
            return res.data
        }
    })

    return [menu, loading, refetch]
}
