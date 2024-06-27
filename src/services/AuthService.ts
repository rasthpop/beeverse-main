import { AxiosResponse } from "axios";
import $api from "@/http";
import { AuthResponse } from "@/models/response/AuthResponse";

export default class AuthSerive {
    static async login(tgId: string, isPremium: boolean, userName: string): Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>('/login', {tgId, isPremium, userName})
    }
    static async logout(): Promise<void>{
        return $api.post('/logout')
    }
}

