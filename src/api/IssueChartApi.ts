import { api } from "@/api/AxiosConfig.ts";
import type { MultiOptions } from "@/types/MultiSelect.ts";

const BASE_URL_ISSUE = '/gestor/issue';

export const fetchIssuesDetailed = async (
    projectId: number,
    severityitem?: MultiOptions[],
    priorityitem?: MultiOptions[]
) => {
    try {
        const severityParam = severityitem && severityitem.length > 0
            ? severityitem.join(',')
            : null;

        const priorityParam = priorityitem && priorityitem.length > 0
            ? priorityitem.join(',')
            : null;

        const params = new URLSearchParams();

        if (severityParam !== null) {
            params.append('severities', severityParam);
        }

        if (priorityParam !== null) {
            params.append('priorities', priorityParam);
        }

        const url = `${BASE_URL_ISSUE}/${projectId}${params.toString() ? `?${params.toString()}` : ''}`;

        const response = await api.get(url);
        return response.data;
    } catch (error) {
        throw error;
    };
};