import { api } from "./axios"
import type { GroupItem } from "@/types/group.type"

export const fetchGroups = async (): Promise<GroupItem[]> => {
    const response = await api.get<GroupItem[]>("/groups")
    return response.data
}

export const createGroup = async (payload: { name: string }) => {
    const response = await api.post("/groups", payload)
    return response.data
}
