export interface player{
    id: string;
    honeyLatest: number;
    honeyMax: number,
    balance: GLfloat,
    lastLogin: string,
    lastLogout: string,
    levelId: string,
    referredById: string,
    rankId: string,
    tgId: string,
    isPremium: boolean,
    userName: string,
    createdAt: string,
    bossStreak: number,
    lastBossDate:string,
    referralProfit: number,
    farmingDate:string,
}