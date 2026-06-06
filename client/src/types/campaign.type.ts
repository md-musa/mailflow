export interface CampaignPayload {
  subject: string
  body: string
  additionalEmails?: string[]
  scheduledAt: string | null
  groupIds?: string[]
}

export interface CampaignStats {
  TOTAL: number
  SENT: number
  FAILED: number
  PENDING: number
  PROCESSING: number
}

export interface EmailJob {
  id: string
  recipientEmail: string
  status: string
  previewUrl?: string | null
  createdAt?: string
  updatedAt?: string
}

export interface CampaignItem {
  id: string
  subject: string
  body: string
  status: string
  createdAt?: string
  updatedAt?: string
  scheduledAt?: string | null
  emailJobs?: EmailJob[]
  stats: CampaignStats
}

export interface CampaignSummary {
  totalCampaign: number
  totalEmailSent: number
  totalEmailFailed: number
}

export interface CampaignListResponse {
  campaigns: CampaignItem[]
  summary: CampaignSummary
}
