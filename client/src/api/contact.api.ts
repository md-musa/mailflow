import { api } from "./axios"

export const createContact = async (payload: {
    name: string
    email: string
    groupId: string
}) => {
    const response = await api.post("/contacts", payload)
    return response.data
}
