import type { CampaignPayload } from "@/types/campaign.type";
import { api } from "./axios";


export const createCampaign = async (payload: CampaignPayload) => {
    console.log(payload)
    const response = await api.post<CampaignPayload>('/campaigns', payload);
    return response.data;
};

export const fetchCampaigns = async () => {
    const response = await api.get<CampaignPayload>('/campaigns');
    return response.data;
};

export const fetchSummary = async () => {
    const response = await api.get('/campaigns/summary');
    return response.data;
};

