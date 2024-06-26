"use client"

import * as React from 'react';
import { Database, Tables } from '../../types/supabase';
import { createClient } from '@/utils/supabase/client';
import { getPlayerReferrals, getUsersByReferral, updatePlayer, updateUserStats } from '@/utils/supabase/helpers/db';
import { SupabaseClient } from '@supabase/supabase-js';
import {
	useMiniApp,
	useInitData,
} from '@tma.js/sdk-react';

interface ContextType {
    supabase: SupabaseClient<Database, "public", any>,
	//
	isNew: boolean,
	setStateIsNew: (value: boolean) => void;
	justReferred: ReferredPlayer | null,
	setStateJustReferred: (value: ReferredPlayer) => void;
	isPhone: boolean,
	setStateIsPhone: (value: boolean) => void;
	//
    user: Tables<'users'> | null;
	setStateUser: (value: Tables<'users'>) => void;
    userRank: Tables<'ranks'> | null;
	setStateUserRank: (value: Tables<'ranks'>) => void;
    ranks: Tables<'ranks'>[];
	setStateRanks: (value: Tables<'ranks'>[]) => void;
	leaders: Tables<'users'>[];
	setStateLeaders: (value: Tables<'users'>[]) => void;
	friends: Tables<'users'>[];
	setStateFriends: (value: Tables<'users'>[]) => void;
	quests: Tables<'quests'>[];
	setStateQuests: (value: Tables<'quests'>[]) => void;
	handleNewRank: (currentRank: Tables<'ranks'>) => boolean;
	handlePlayerTap: (profitTap: number) => boolean;
}

export const ContextData = React.createContext<ContextType | null>(null);

export function ContextProvider({ children }: React.PropsWithChildren) {
	
	// Supabase SDK
    const supabase = createClient();
	// Telegram SDK
	const miniApp = useMiniApp(true);
    const initData = useInitData(true);
    
	const [isNew, setIsNew] = React.useState<boolean>(false);
	const [justReferred, setJustReferred] = React.useState<ReferredPlayer | null>(null);
	const [isPhone, setIsPhone] = React.useState<boolean>(false);
    const [user, setUser] = React.useState<Tables<'users'> | null>(null);
    const [userRank, setUserRank] = React.useState<Tables<'ranks'> | null>(null);
    const [ranks, setRanks] = React.useState<Tables<'ranks'>[]>([]);
	const [leaders, setLeaders] = React.useState<Tables<'users'>[]>([]);
	const [friends, setFriends] = React.useState<Tables<'users'>[]>([]);
	const [quests, setQuests] = React.useState<Tables<'quests'>[]>([]);

    const value: ContextType = {
		supabase,
		isNew,
		setStateIsNew: (value: boolean): void => setIsNew(value),
		justReferred,
		setStateJustReferred: (value: ReferredPlayer | null): void => setJustReferred(value),
		isPhone,
		setStateIsPhone: (value: boolean): void => setIsPhone(value),
		user,
		setStateUser: (value: Tables<'users'>): void => setUser(value),
		userRank,
		setStateUserRank: (value: Tables<'ranks'>): void => setUserRank(value),
		ranks,
		setStateRanks: (value: Tables<'ranks'>[]): void => setRanks(value),
		leaders,
		setStateLeaders: (value: Tables<'users'>[]): void => setLeaders(value),
		friends,
		setStateFriends: (value: Tables<'users'>[]): void => setFriends(value),
		quests,
		setStateQuests: (value: Tables<'quests'>[]): void => setQuests(value),
		handleNewRank: function (currentRank: Tables<'ranks'>): boolean {
			if (!user || !ranks) return false;

			const nextRank = ranks.find((rank) => rank.id === (currentRank.id + 1));
			if (!nextRank) return false;

			setUser({
				...user,
				balance: currentRank.bonus_amount,
				rank_id: nextRank.id
			});

			setUserRank(nextRank);
			return true;
		},
		handlePlayerTap: function (profitTap: number): boolean {
			setUser(prevState => ({
				...prevState!,
				balance: prevState?.balance! + profitTap,
			}));
			return true;
		},
	};

	React.useEffect(() => {
		if (!user) return;

		updateUserStats(supabase, user);
		
    }, [supabase, user]);
    
    return (
        <ContextData.Provider value={value}>{children}</ContextData.Provider>
    );
}

export const useData = () => React.useContext(ContextData);
