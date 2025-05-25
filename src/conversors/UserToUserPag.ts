import type { User } from "@/types/User.ts";
import type { UserPag } from "@/types/PagUser.ts";

/**
 * Convert a User object to UserPag
 * @method
 * @param user - The User object to convert
 * @returns UserPag object
 * @throws Error if required fields are missing
 */
export const userToPagConverter = (user: User): UserPag => {
    if (!user.id) {
        throw new Error("User id is required");
    }
    if (!user.password) {
        throw new Error("User password is required");
    }
    if (!user.roles) {
        throw new Error("User must have at least one role");
    }
    if (!user.tool) {
        throw new Error("User tool is required");
    }
    if (!user.idTool) {
        throw new Error("User idTool is required");
    }
    if (!user.createdAt) {
        throw new Error("User createdAt is required");
    }

    return {
        userId: user.id,
        userName: user.username,
        userRole: user.roles[0],
        userEmail: user.email,
        userPassword: user.password,
        toolName: user.tool,
        toolId: user.idTool[0],
        projectName: user.projectTool,
        createdAt: user.createdAt
    };
};