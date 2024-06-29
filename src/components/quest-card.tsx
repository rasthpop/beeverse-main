'use client'

import { useUtils } from "@tma.js/sdk-react";
import HoneyDisplay from "./honey-display";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import QuestDrawer from "./quest-drawer";

export default function QuestCard(
	props: {
		reward: number;
		title: string;
		iconURL: string;
		actionURL?: string;
		progress?: number; 
		goal?: number;
		action: string
	}
) {
	const utils = useUtils(true);

	let isUrlTelegram = false;
	let isUrlX = false;
	if (props.actionURL) {
		try {
			const domain = (new URL(props.actionURL));
			isUrlTelegram = domain.hostname === "t.me";
			isUrlX = domain.hostname === "x.com";
		} catch (error) {
			console.log(error);
		}
	}

	console.log(isUrlTelegram);

	return(
        <div className="w-full min-h-fit h-[90px] rounded-2xl inline-flex gap-2 items-center justify-between p-2">
            <div className="h-full inline-flex items-center justify-center p-2">
                <Avatar className={`w-14 h-14 ${(!isUrlTelegram && !isUrlX) ? "rounded-none" : "rounded-full"} ${isUrlX && "object-contain" } `}>
                    <AvatarImage
                    src={isUrlTelegram && "/icons/tg.png" || isUrlX && "/icons/x.png" || props.iconURL}
                    alt="avatar"
                    width={128}
                    height={128}
                    />
                    <AvatarFallback className="bg-backdrop">?</AvatarFallback>
                </Avatar>
            </div>
            <div className="w-full h-full inline-flex gap-1 items-center justify-between">
				<div className="w-full max-w-32 h-full flex flex-col items-start justify-start">
					<HoneyDisplay text="20px" isBold={false} amount={props.reward} iconSize={24} />
					<div className={`${props.progress? "flex flex-col" : "inline-flex items-start justify-start"} w-full h-full `}>
						<p className={`${props.progress? "text-[12px]" : "text-base leading-5 "} text-foreground font-medium text-normal-stroke`}>{props.title}</p>
						{props.progress && 
							<p className="text-[12px]">
								({props.progress} / {props.goal} completed)
							</p>
						}
					</div>
				</div>
            </div>
			<QuestDrawer 
			section={props.iconURL}
			questTittle={props.title}
			questDescription={isUrlTelegram || isUrlX ? "Telegram or X Quest" : "Referall Quest" }
			questReward={props.reward}
			buttontext={props.action}
			progress={props.progress}
			goal={props.goal}
			/>
        </div>
    )
}
