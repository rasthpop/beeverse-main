'use client'

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "./ui/button";
import Image from "next/image";
import React from "react";
import RankInfoCard from "./rank-info-card";
import { Tables } from "../../types/supabase";
import { getRanks } from "@/utils/supabase/helpers/db";
import { createClient } from "@/utils/supabase/client";
import RankIcon from "./rank-icon";
import { useData } from "@/controllers/context";

export default function RankDrawer() {
	// Supabase
	const supabase = createClient();
	// Context
	const {
		user,
		userRank,
		ranks
	} = useData()!;

	const [isOpen, setIsOpen] = React.useState<boolean>(false);



	return(
		<Drawer open={isOpen}>
			<DrawerTrigger
			onClick={() => setIsOpen(!isOpen)}
			>
				<RankIcon name={userRank!.name} url={`/icons/levels/${userRank!.name}.png`} size={64} />
			</DrawerTrigger>
			<DrawerContent>
				<div className="w-full inline-flex items-center justify-end relative">
					<h1 className='w-full text-2xl font-medium text-center whitespace-nowrap absolute left-1/2 -translate-x-1/2 top-[70%] -translate-y-1/2'>Alpha Ranks Rewards:</h1>
					<Button
					variant={'ghost'}
					size={'icon'}
					onClick={() => setIsOpen(false)}
					className="z-[99] mt-8"
					>
						<svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect x="14.8492" y="6.10352e-05" width="4" height="21" transform="rotate(45 14.8492 6.10352e-05)" fill="#D9D9D9"/>
							<rect x="0.00012207" y="2.82843" width="4" height="21" transform="rotate(-45 0.00012207 2.82843)" fill="#D9D9D9"/>
						</svg>
					</Button>
				</div>
				<div className='w-full h-auto max-h-full flex flex-col gap-4 mt-4 overflow-auto'>
					{ranks.map((rank, idx) => (
						<RankInfoCard
						key={idx}
						name={rank.name}
						description={rank.description}
						iconURL={`/icons/levels/${rank.name}.png`}
						requiredAmount={rank.required_amount}
						bonusAmount={rank.bonus_amount}
						currentbalance={user?.balance || 0}
						progress={
							rank.id === (userRank?.id || ranks[0])
							? (user?.balance || 0)
							: 100
						}
						/>
					))}
				</div>
			</DrawerContent>
		</Drawer>
	)
}
