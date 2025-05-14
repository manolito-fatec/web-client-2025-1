import type {Tools} from "@/enums/Tools.ts";

export type User = {
    id?: number,
    fullname?: string,
    username: string,
    roles: string[],
    tableRoles?: string,
    tool: Tools,
    idTool: string,
    projectTool: string,
    password?: string,
    createdAt?: string,
    email: string,
}