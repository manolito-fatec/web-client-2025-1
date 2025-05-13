import {Roles} from "@/enums/Roles.ts";
import type {Tools} from "@/enums/Tools.ts";

export type User = {
    id?: number,
    fullname?: string,
    username: string,
    role: Roles,
    tool: Tools,
    idTool: string,
    projectTool: string,
    password?: string,
    createdAt?: string,
    email: string,
}