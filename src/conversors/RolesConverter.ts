import type {UserPag} from "@/types/PagUser.ts";
import {type Ref, ref} from "vue";

/**
 * Converts the enum roles from the back-end to prettier ones
 * @param userList
 */
export const rolesFix = (userList: UserPag[]) => {
    const userListFixed: Ref<UserPag[]> = ref<UserPag[]>([]);
    for (const user of userList) {
        const userCopy = { ...user };
        let role = userCopy.userRole;
        switch (role) {
            case 'ROLE_ADMIN':
                role = 'Admin';
                break;
            case 'ROLE_OPERATOR':
                role = 'Operator';
                break;
            case 'ROLE_MANAGER':
                role = 'Manager';
                break;
        }
        userCopy.userRole = role;
        userListFixed.value.push(userCopy);
    }

    return userListFixed.value;
}

/**
 * Converts the prettier values to the back-end to enum required strings
 * @param userReturn
 */
export const rolesReturn = (userReturn: UserPag) => {
    const userFixed: Ref<UserPag> = ref<UserPag>(userReturn);
    let role = userReturn.userRole;
    switch (role) {
        case "ADMIN":
            role = 'ROLE_ADMIN';
            break;
        case "OPERATOR":
            role = 'ROLE_OPERATOR';
            break;
        case "MANAGER":
            role = 'ROLE_MANAGER';
            break;
    }
    userFixed.value.userRole = role;

    return userFixed.value;
}