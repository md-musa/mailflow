export interface CampaignPayload {
    subject: string
    body: string
    additionalEmails: string[]
    scheduledAt: string | null
    groupIds?: string[]
}

export interface CampaignResonse {
    //
}