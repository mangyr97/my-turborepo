import {z} from 'zod';

export const UserLoginRequestSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const UserLoginResponseSchema = z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
});

export type UserLoginRequest = z.infer<typeof UserLoginRequestSchema>;
export type UserLoginResponse = z.infer<typeof UserLoginResponseSchema>;