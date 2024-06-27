'use client'

import { useUtils } from "@tma.js/sdk-react";
import HoneyDisplay from "./honey-display";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export default function QuestCard(
	props: {
		reward: number;
		title: string;
		iconURL: string;
		actionTitle: string;
		actionURL?: string;
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
					<HoneyDisplay amount={props.reward} iconSize={24} />
					<div className="w-full h-full inline-flex items-start justify-start">
						<p className="text-base leading-5 text-foreground font-medium text-normal-stroke">{props.title}</p>
					</div>
				</div>
				<div className="h-full inline-flex items-center justify-end">
                	<Button
					variant={'default'}
					className="w-24 border-2 font-medium text-normal-stroke rounded-full py-1"
					onClick={() => {
						utils && props.actionURL && (
							isUrlTelegram 
							? utils.openTelegramLink(props.actionURL)
							: utils.openLink(props.actionURL)
						)
					}}
					>
						{props.actionTitle}
					</Button>
				</div>
            </div>
        </div>
    )
}
