export type UserPag = {
    userId?: number;
    userName: string;
    userRole: string;
    userEmail: string;
    userPassword: string;
    toolName: string;
    toolId: number;
    projectId? : string;
    projectName?: string;
    createdAt?: string;
}