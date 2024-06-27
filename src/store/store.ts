import { player } from "@/models/player";
import AuthSerive from "@/services/AuthService";
import {makeAuthObservable} from "mobx"

export default class Store {
    user = {} as player;
    isAuth = false;

    constructor(){
        makeAuthObservable(this);
    }
    setAuth(bool: boolean){
        this.isAuth = bool;
    }
    setUser(user: player){
        this.user = user
    }
    async login(tgId: string, isPremium: boolean, userName: string){
        try{
            const response = await AuthSerive.login(tgId, isPremium, userName)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user)
        }catch(e){
            console.log("err")
            // console.log(e.response?.data?.message)
        }
    }

    async logout(){
        try{
            const response = await AuthSerive.logout()
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as player)
        }catch(e){
            console.log("err")
            // console.log(e.response?.data?.message) 
        }
    }
}

