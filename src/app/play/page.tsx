"use client"

import React from "react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { useData } from "@/controllers/context";
import { useRouter } from "next/navigation";
import TargetStatsCard from "@/components/target-stats-card";
import HoneyDisplay from "@/components/honey-display";
import InfoPopover from "@/components/info-popover";
import MenuButton from "@/components/menu-drawer";
import RankDrawer from "@/components/rank-drawer";
import { TAP_PROFIT } from "@/constants";
import { Bee } from "@/components/ui/bee";


export default function Page() {

	const router = useRouter();
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
	async function coinInteraction() {
		if (isContext) return;

		if (user.balance >= (userRank.required_amount - TAP_PROFIT)) {
			const isLevelUpdated = handleNewRank(userRank);
			if (!isLevelUpdated) console.log("PLAYER NOT NEW RANK");
			if (isLevelUpdated) console.log("PLAYER NEW RANK");
		} else {
			const isTapDone = handlePlayerTap(TAP_PROFIT);
		}
	}

	if (isContext) return router.replace('/');
	return (
		<main className="grow w-full h-screen bg-[url(/back.gif)] bg-center bg-no-repeat bg-cover flex flex-col relative overflow-auto z-0">
			<div className="absolute top-1/2 z-[99]">VERSION: 0.6 </div>
			<section id="main-section" className="w-full h-full flex flex-col items-center justify-between z-20 mt-6">
				<div id="main-top-box" className="w-full flex flex-col justify-between gap-1">
					<div className="w-full h-14 inline-flex items-center justify-between gap-1.5 px-4 relative">
						<div className="min-w-14 min-h-14 inline-flex items-center justify-center">
							<RankDrawer />
						</div>
						<div className="w-full inline-flex gap-0.5 items-center justify-between">
							<HoneyDisplay amount={user.balance} iconSize={24} />
							<span className="text-xl font-bold text-foreground">/</span>
							<HoneyDisplay amount={userRank.required_amount} iconSize={24} />
							<div className="ml-2">
								<InfoPopover content={"Honey"} />
							</div>
						</div>
					</div>
					<div className="w-full h-20 bg-[url(/interface/target-box.png)] bg-center bg-no-repeat bg-contain rounded-xl inline-flex items-center justify-center px-12 relative">
						<TargetStatsCard
						title={"Blue Orc"}
						data={"Level 999"}
						iconMainURL="/icons/skull.png"
						iconDataURL="/icons/shield.png"
						isLocked={false}
						/>
						<TargetStatsCard title={"HP Heal"} data={"Coming soon"} isLocked={true} />
						<TargetStatsCard title={"Treasure"} data={"Coming soon"} isLocked={true} />
					</div>
					<Progress value={100} content="Immortal" className="bg-[url(/interface/target-progress.png)]"/>
				</div>
				<div className="w-full h-full inline-flex items-center justify-center px-4 py-2">
					<div
					onTouchStart={isPhone ? coinInteraction : undefined}
					onClick={!isPhone ? coinInteraction : undefined}
					>
						<Image
						src={"/bear_idle.gif"}
						alt="Logo"
						width={1024}
						height={1024}
						className="h-full max-h-[372px] object-contain"
						draggable={false}
						priority
						/>
					</div>
					<Bee/>
				</div>
				<div id="main-bottom-box" className="w-full inline-flex items-center justify-center mb-4">
					<div className="w-full relative">
						<div className="w-full h-20 bg-[url(/interface/menu.png)] bg-center bg-no-repeat bg-cover rounded-xl inline-flex items-end justify-center px-4 pb-3 relative">
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
