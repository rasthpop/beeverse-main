import { SupabaseClient } from "@supabase/supabase-js";
import { Database, Tables } from "../../../../types/supabase";


// Get users data
export async function getUsers(
	client: SupabaseClient<Database, "public">,
	from: number,
	to: number
) {
	const { data, error } = await client
    .from('users')
    .select()
	.range(from, to)
	.order('balance', { ascending: false });

	if (error) {
		console.log(error);
		return
	};

    return data;
}

// Get user data by telegram ID
export async function getUserTelegramId(
	client: SupabaseClient<Database, "public">,
	tgId: number
) {
	const { data, error } = await client
    .from('users')
    .select()
	.eq('id_tg', tgId);

	if (error || data.length === 0) return;

    return data[0];
}

// Get users data filtered by referral ID
export async function getUsersByReferral(
	client: SupabaseClient<Database, "public">,
	referralId: number,
) {
	const { data, error } = await client
    .from('users')
    .select()
	.eq('referrer_id',referralId)
	.order('balance', { ascending: false });

	if (error) return;

    return data;
}

// Get users data filtered by referral ID
export async function getReferralByUserId(
	client: SupabaseClient<Database, "public">,
	userId: number,
) {
	const { data, error } = await client
    .from('users')
    .select()
	.eq('referrer_id', userId);

	if (error) return;

    return data;
}

// Get ranks data
export async function getRanks(
	client: SupabaseClient<Database, "public">
) {
	const { data, error } = await client
    .from('ranks')
    .select()
	.order('id', { ascending: true });

	if (error) return;

    return data;
}

// Get quests data based on player ID
export async function getUserQuests(
	client: SupabaseClient<Database, "public">,
	userId: number
) {
	
	const { data, error } = await client
	.from('users')
	.select(`
		id,
		quests (*)
	`)
	.eq('id', userId)
	.order('id', { ascending: true });

	if (error) return;

    return data[0];
}

// Insert user row
export async function addUser(
    client: SupabaseClient<Database, "public">,
    user: { id_tg: number; username: string | null; premium: boolean; balance?: number, referrer_id?: number}
) {
    const { data, error: errorPlayers } = await client
    .from('users')
    .insert({
		...user,
	})
    .select();

    if (errorPlayers || data.length === 0) return;

    return data[0];
}

// Insert join users_quests row
export async function addJoinUsersQuests(
    client: SupabaseClient<Database, "public">,
    userId: number
) {
	const { data: quests, error: errorQuests } = await client
	.from('quests')
	.select('id')
	.order('id', { ascending: true });
	if (errorQuests) return;

	const user_quest: Tables<'users_quests'>[] = quests.map((quest) => ({
		completed: false,
		quest_id: quest.id,
		user_id: userId
	}));

    const { data: userQuests , error: errorUserQuests } = await client
    .from('users_quests')
    .insert(user_quest)
    .select();
    if (errorUserQuests) return;

    return userQuests;
}

// Update user data by ID
export async function updateUserBonus(
    client: SupabaseClient<Database, "public">,
	user: Tables<'users'>,
    balance: number
) {
    const { error } = await client
    .from('users')
    .update({
		balance: user.balance + balance
	})
    .eq('id', user.id);

    if (error) return;

    return true;
}

// Update user data by ID
export async function updateUserStats(
    client: SupabaseClient<Database, "public">,
	user: Tables<'users'>,
) {
    const { error } = await client
    .from('users')
    .update(user)
    .eq('id', user.id);

    if (error) return;

    return true;
}

//!

// Fetch player data from 'Players' table
export async function getPlayer(
    client: SupabaseClient<Database, "public">,
    tgId: number
) {
    const { data, error } = await client
    .from('Players')
    .select()
    .eq('tg_id', tgId);

	if (error || data.length === 0) return;

    return data[0];
}

// Fetch player data from 'Players' table
export async function getPlayerById(
    client: SupabaseClient<Database, "public">,
    playerId: number
) {
    const { data, error } = await client
    .from('Players')
    .select()
    .eq('id', playerId);

	if (error || data.length === 0) return;

    return data[0];
}

// Insert player and referral data into 'Players' and 'Referrals' tables
export async function addPlayerAndReferral(
    client: SupabaseClient<Database, "public">,
    playerData: Tables<'Players'>,
	referralData: Tables<'Referrals'>
) {
    const { data, error: errorPlayers } = await client
    .from('Players')
    .insert(playerData)
    .select();
    if (errorPlayers || data.length === 0) return;

	const { error: errorReferrals } = await client
    .from('Referrals')
    .insert({
		referral_id: data[0].id,
		code: referralData.code
	});

	if (errorReferrals) return;

    return data[0];
}

// Fetch all referred players from 'Players' and 'Referrals' tables
export async function getPlayerReferrals(
    client: SupabaseClient<Database, "public">,
    playerId: number
) {
	const { data: dataReferrals, error: errorReferrals } = await client
    .from('Referrals')
    .select()
    .eq('referral_id', playerId);

	if (errorReferrals || dataReferrals.length === 0) return;

    const { data: dataPlayers, error: errorPlayers } = await client
    .from('Players')
    .select()
    .eq('referred_by_id', dataReferrals[0].id);

    if (errorPlayers || dataPlayers.length === 0) return;

    return dataPlayers;
}

// Fetch referral by code from 'Referrals' table
export async function getReferral(
    client: SupabaseClient<Database, "public">,
    code: string
) {
    const { data, error } = await client
    .from('Referrals')
    .select()
    .eq('code', code);

    if (error) return;

    return data[0];
}

// Fetch early referral bonuses by code from 'Referrals' table
export async function getReferralEarlyBonuses(
    client: SupabaseClient<Database, "public">,
    playerId: number
) {
    const { data, error } = await client
    .from('Referrals_Early_Bonuses')
    .select()
    .eq('player_id', playerId);

    if (error) return;

    return data[0];
}

// Insert early referral bonuses by code from 'Referrals' table
export async function addReferralEarlyBonus(
    client: SupabaseClient<Database, "public">,
    referralEarlyBonus: Tables<'Referrals_Early_Bonuses'>
) {
    const { data, error } = await client
    .from('Referrals_Early_Bonuses')
    .insert(referralEarlyBonus)
	.select();

    if (error) return;

    return data[0];
}

// Update early referral bonuses by code from 'Referrals' table
export async function updateReferralEarlyBonus(
    client: SupabaseClient<Database, "public">,
    referralEarlyBonus: Tables<'Referrals_Early_Bonuses'>
) {
    const { data, error } = await client
    .from('Referrals_Early_Bonuses')
    .update({
		honey: referralEarlyBonus.honey,
		multiplier: referralEarlyBonus.multiplier
	})
	.eq('player_id', referralEarlyBonus.player_id!);

    if (error) return;

    return true;
}

// Fetch player levels data 'Levels_Player' table
export async function getLevelsPlayer(
    client: SupabaseClient<Database, "public">,
) {
    const { data, error } = await client
    .from('Levels_Player')
    .select();

    if (error || data.length === 0) return;

    return data;
}

// Fetch mines data from 'Mines' table
export async function getMines(
    client: SupabaseClient<Database, "public">,
) {
    const { data, error } = await client
    .from('Mines')
    .select();

	if (error || data.length === 0) return;

    return data;
}

// Fetch mine levels data from 'Levels_Mine' table
export async function getLevelsMine(
    client: SupabaseClient<Database, "public">,
) {
    const { data, error } = await client
    .from('Levels_Mine')
    .select();

	if (error || data.length === 0) return;

    return data;
}

// Update latest player info/stats into 'Players' table
export async function updatePlayer(
    client: SupabaseClient<Database, "public">,
    data: Tables<'Players'>
) {
    const { error } = await client
    .from('Players')
    .update({
		honey_latest: data.honey_latest,
		honey_max: data.honey_max,
		level_id: data.level_id,
	})
    .eq('tg_id', data.tg_id!);

    if (error) return;

    return true;
}
