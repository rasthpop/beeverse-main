'use client'

import React, { useState } from "react";
import HoneyDisplay from "./honey-display";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import Image from "next/image";
import { cn } from '@/lib/utils';
import { usePopup } from '@tma.js/sdk-react';
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";


export default function QuestDrawer(props:{
    questTittle: string,
    questDescription: string,
    questReward: number,
    section: string,
    buttontext: string
}){

    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    return(
        <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
            <DrawerTrigger>
            <div className="h-full inline-flex items-center justify-end">
                	<Button
					variant={'default'}
					className="w-24 border-2 font-medium text-normal-stroke rounded-full py-1"
					onClick={() => setIsOpen(true)}
					>
						Complete
					</Button>
				</div>
            </DrawerTrigger>
            <DrawerContent>
            <div className="w-full inline-flex items-center justify-end relative pb-2">
							<div className={`w-full inline-flex items-center justify-center absolute ${props.questTittle === "Invite your 3 friends!"? "top-[48%]" : "top-[53%]"}  left-1/2 -translate-x-1/2 -mt-9`}>
								<Image
								src={
                                    props.questTittle === "Invite your 3 friends!"? '/icons/email.png ' : props.section
                                }
								alt="Logo"
								width={64}
								height={64}
								className={`${props.questTittle === "Invite your 3 friends!"? "w-14 h-14" : "w-12 h-12"} object-contain`}
								draggable={false}
								priority
								/>
							</div>
						                    
					<h1 className={`w-full text-2xl font-medium text-center whitespace-nowrap absolute left-1/2 -translate-x-1/2 top-[90%] -translate-y-1/2`}>
                        {props.questTittle}
					</h1>
					<Button
					variant={'ghost'}
					size={'icon'}
					onClick={() => setIsOpen(false)}
					className='z-[99] mt-8'
					>
						<svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect x="14.8492" y="6.10352e-05" width="4" height="21" transform="rotate(45 14.8492 6.10352e-05)" fill="#D9D9D9"/>
							<rect x="0.00012207" y="2.82843" width="4" height="21" transform="rotate(-45 0.00012207 2.82843)" fill="#D9D9D9"/>
						</svg>
					</Button>
				</div>

                 <div className="px-12 mt-3 text-[14px] flex  flex-col">
                    <p>your tak is::::</p>
                    <div className="text-[16px]"><span>Reward:</span> <span> <HoneyDisplay isBold={false} iconSize={16} amount={props.questReward} /> </span> </div>
                    <div className="flex justify-center mt-4 mb-3">
                    <Button
                    className="text-xl"
                    variant={'default'}
                    >
                        {props.buttontext}
                    </Button>
                    </div>
                </div>

            </DrawerContent>
        </Drawer>            
    )
}