export type SignupRequestDto = {
     username: string;
     email: string;
     password: string;
     roles: string[];
     toolUserId: string;
     toolId: number;
}