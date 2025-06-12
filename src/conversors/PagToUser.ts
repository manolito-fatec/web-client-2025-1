import type { User } from "@/types/User.ts";
import type { UserPag } from "@/types/PagUser.ts";

/**
 * Convert UserPag object back to User
 * @method
 * @param userPag - The UserPag object to convert
 * @returns User object
 * @throws Error if required fields are missing
 */
export const pagToUserConverter = (userPag: UserPag): User => {
    if (userPag.userId === undefined) {
        throw new Error("userId is required");
    }
    if (!userPag.userName) {
        throw new Error("userName is required");
    }
    if (!userPag.userRole) {
        throw new Error("userRole is required");
    }
    if (!userPag.userEmail) {
        throw new Error("userEmail is required");
    }
    if (!userPag.userPassword) {
        throw new Error("userPassword is required");
    }
    if (!userPag.toolName) {
        throw new Error("toolName is required");
    }
    if (userPag.toolId === undefined) {
        throw new Error("toolId is required");
    }

    return {
        id: userPag.userId,
        username: userPag.userName,
        roles: [userPag.userRole],
        email: userPag.userEmail,
        password: userPag.userPassword,
        tool: userPag.toolName,
        idTool: userPag.toolId,
        projectTool: userPag.projectName,
        createdAt: userPag.createdAt
    };
};