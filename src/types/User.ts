export type User = {
    id?: number,
    username: string,
    roles: string[],
    tableRoles?: string,
    tool?: string,
    idTool?: string[],
    projectTool?: string,
    password?: string,
    createdAt?: string,
    email: string,
}