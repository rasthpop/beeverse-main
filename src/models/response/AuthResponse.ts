import { player } from "../player";

export interface AuthResponse {
    message: string;
    accessToken: string;
    refreshToken: string;
    user: player
}