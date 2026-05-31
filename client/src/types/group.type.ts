export interface ContactItem {
    id: string
    name: string
    email: string
}

export interface GroupItem {
    id: string
    name: string
    description?: string
    contacts?: ContactItem[]
}
