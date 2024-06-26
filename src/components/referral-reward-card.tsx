'use client'

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import HoneyDisplay from './honey-display';


export default function ReferralRewardCard(
    props: {
        avatarURL: string;
        title: string;
        amount: number;
    }
) {
    return(
        <div className="w-full min-h-fit h-[90px] bg-backdrop border-2 border-border rounded-2xl inline-flex gap-2 items-center justify-between p-2">
            <div className="h-full inline-flex items-center justify-center p-2">
                <Avatar className="w-14 h-14">
                    <AvatarImage
                    src={props.avatarURL}
                    alt="avatar"
                    width={128}
                    height={128}
                    />
                    <AvatarFallback className="bg-hover">?</AvatarFallback>
                </Avatar>
            </div>
            <div className="w-full h-full inline-flex gap-1 items-center justify-between">
				<div className="w-full max-w-32 h-full flex flex-col items-start justify-start">
					<HoneyDisplay amount={props.amount} iconSize={24} />
					<div className="w-full h-full inline-flex items-end justify-start">
						<p className="text-base leading-5 text-foreground font-medium text-normal-stroke">{props.title}</p>
					</div>
				</div>
				<div className="h-full inline-flex items-end justify-end">
                	<p className="text-base leading-5 text-gold font-medium text-end inline-flex gap-2 items-center align-middle">For you and your friend</p>
				</div>
            </div>
        </div>
    )
}
