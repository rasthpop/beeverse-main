"use client"

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useData } from "@/controllers/context";
import { useRouter } from "next/navigation";
import TargetStatsCard from "@/components/target-stats-card";
import HoneyDisplay from "@/components/honey-display";
import MenuButton from "@/components/menu-drawer";
import RankDrawer from "@/components/rank-drawer";
import { TAP_PROFIT } from "@/constants";
import BeeIdle from "@/components/bee/bee";
import BeeHit from "@/components/bee/bee-hit";
import BearIdle from "@/components/bear/bear-idle";
import BearDamage from "@/components/bear/bear-hit";
import Progressbar from "@/components/ui/progressbar";
import Bossdefeat from "@/components/boss-defeat-drawer";
import BearDead from "@/components/bear/bear-defeated";
import Cooldown from "@/components/ui/boss-cooldown-timer";



export default function Page() {

	const router = useRouter();
	const maxHealth = 1000;
	const reward = 25000


	const [atackInProgress, setAtackInProgress] = useState(false);
	const [gameEnd, setGameEnd] = useState(false);
	const [rewardDrawer, setRewardDrawer] = useState(false);
	const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const [health, setHealth] = useState(maxHealth);
	// Context
	const {
		isPhone,
		user,
		userRank,
		ranks,
		leaders,
		friends,
		quests,
		handleNewRank,
		handlePlayerTap
	} = useData()!;
	const isContext = !user || !userRank || !ranks;

	// Handle coin interaction

	
// work in Progress..
async	function handleAtack() {

	if (isContext) return;

	if (user.balance >= (userRank.required_amount - TAP_PROFIT)) {
		const isLevelUpdated = handleNewRank(userRank);
		if (!isLevelUpdated) console.log("PLAYER NOT NEW RANK");
		if (isLevelUpdated) console.log("PLAYER NEW RANK");
	} else {
		const isTapDone = handlePlayerTap(TAP_PROFIT);
	}

		if (gameEnd) return;
		if(health > 0){
		setHealth((prev) => prev - 100);
		}
		if (!atackInProgress && health != 0) {
			setAtackInProgress(true);
		}

		if (clickTimeoutRef.current) {
			clearTimeout(clickTimeoutRef.current);
		}

		clickTimeoutRef.current = setTimeout(() => {
			setAtackInProgress(false);
			clickTimeoutRef.current = null
		}, 300);

	}

	useEffect(() => {
        if(health === 0){
			setGameEnd(true)
			setRewardDrawer(true)
		}
		
    }, [health]);

	if (isContext) return router.replace('/');
	return (
		<main className="grow w-full h-screen overflow-auto bg-[url(/back.png)] bg-center bg-no-repeat bg-cover flex flex-col relative  z-0">
			<div>
			<video
				src='/animations/back.webm'
				autoPlay
				muted
				loop
				className='w-full h-full absolute object-cover z-0'/>
			</div>
			<div className="absolute top-1/2 z-[99]">VERSION: 3.0 </div>

			{gameEnd && <div className="absolute right-4 top-1/2"> <Cooldown /></div>}

			<section id="main-section" className="w-full h-full flex flex-col items-center justify-between z-20 mt-6">
				<div id="main-top-box" className="w-full flex flex-col justify-between gap-1">
					<div className="w-full fixed h-14 inline-flex items-center justify-between gap-1.5 px-4 ">
						<div className="min-w-14 min-h-14 inline-flex items-center justify-center">
							<RankDrawer isSvg={false} />
						</div>
						<div className="w-full inline-flex gap-0.5 items-center justify-center  ">
							<div className=" flex justify-center">
							<span className="ml-auto">	<HoneyDisplay  isBold={true} amount={user.balance} iconSize={24} /> </span>
							<span className="text-xl font-bold text-foreground ">/</span>
							<span className="ml-2">	<HoneyDisplay isBold={true} amount={userRank.required_amount} iconSize={24} /> </span>
							</div>
						</div>
							<div className="ml-2">
								<RankDrawer isSvg={true} />
							</div>
					</div>
					<div className=" fixed top-[75px] w-full h-20 bg-[url(/interface/target-box.png)] bg-center bg-no-repeat bg-contain rounded-xl inline-flex items-center justify-center px-12 ">
						<TargetStatsCard
						title={"Bear"}
						data={"Level 10"}
						iconMainURL="/icons/skull.png"
						iconDataURL="/icons/shield.png"
						isLocked={false}
						/>
						<TargetStatsCard title={"HP Heal"} data={"Coming soon"} isLocked={true} />
						<TargetStatsCard title={"Loot"} data={reward} isLocked={false} />
					</div>
					{/* <Progress value={100} content="Immortal" className="fixed text-[16px] z-20 top-[155px] bg-[url(/interface/target-progress.png)] "/> */}
					<div className="fixed w-full z-20 top-[155px] text-md">
					<Progressbar health={health} maxHealth={maxHealth}/>
					</div>
				</div>
			{health != 0 &&
				<div
						onTouchStart={isPhone ? handleAtack : undefined}
						onClick={!isPhone ? handleAtack : undefined}						
						className="bg-red-400 opacity-0 w-full fixed top-[190px] h-[360px] z-[799]">

				</div>
			}	
				<div className="w-full h-full inline-flex items-center justify-center px-4 py-2">
						{/* Bear */}
					<div>
						<BearDead visible={gameEnd} />
						<BearIdle visible={!atackInProgress && !gameEnd} />
						<BearDamage visible={atackInProgress && !gameEnd} />
					</div>
					<BeeIdle visible={!atackInProgress || gameEnd} />
					<BeeHit visible={atackInProgress && !gameEnd} />
				</div>

				<div><Bossdefeat loot={reward} handleReward={setRewardDrawer} isOpen={rewardDrawer}/></div>

				<div id="main-bottom-box" className="z-[999] fixed bottom-0 w-full inline-flex items-center justify-center mb-4">
					<div className="w-full relative">
						<div className="w-full z-[999] h-20 bg-[url(/interface/menu.png)] bg-center bg-no-repeat bg-cover rounded-xl inline-flex items-end justify-center px-4 pb-3 relative">
							<MenuButton
							title={"Leaders"}
							iconURL={"/icons/star.png"}
							size={"sm"}
							isLocked={false}
							section="leaderboard"
							user={user}
							leaders={leaders}
							/>
							<MenuButton
							title={"Friends"}
							iconURL={"/icons/email.png"}
							size={"sm"}
							isLocked={false}
							section="friends"
							user={user}
							friends={friends}
							/>
							<MenuButton
							title={"Retreat"}
							iconURL={"/icons/flag.png"}
							size={"lg"}
							isLocked={true}
							section="retreat"
							user={user}
							/>
							<MenuButton
							title={"Quests"}
							iconURL={"/icons/notification.png"}
							size={"sm"}
							isLocked={false}
							section="quests"
							user={user}
							quests={quests}
							/>
							<MenuButton
							title={"Treasure"}
							iconURL={"/icons/chest.png"}
							size={"sm"}
							isLocked={false}
							section="bonus"
							user={user}
							/>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
