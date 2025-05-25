export type User = {
    id?: number,
    username: string,
    password?: string,
    email: string,
    roles: string[],
    permissions?: string[],
    tableRoles?: string,
    tool?: string,
    idTool?: string,
    projectTool?: string,
    toolProjectIdList?: string[],
    toolUserId?: string,
    createdAt?: string,
}

export type UserDto = {
    originalId: string;
    userName: string;
}