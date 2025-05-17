export type User = {
    id?: number,
    username: string,
    roles: string | string[],
    tableRoles?: string,
    tool?: string,
    idTool?: number,
    projectTool?: string,
    password?: string,
    createdAt?: string,
    email: string,
}