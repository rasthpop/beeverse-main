'use client'

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "./ui/button";
import Image from "next/image";
import React, { useState } from "react";
import RankInfoCard from "./rank-info-card";
import { Tables } from "../../types/supabase";
import { getRanks } from "@/utils/supabase/helpers/db";
import { createClient } from "@/utils/supabase/client";
import RankIcon from "./rank-icon";
import { useData } from "@/controllers/context";
import HoneyDisplay from "./honey-display";

export default function Bossdefeat(props:{
    isOpen: boolean;
    loot: number;
    handleReward: React.Dispatch<React.SetStateAction<boolean>>
}){
    const [claim, setIsClaimed] = useState(false)
    return(
    <Drawer open={props.isOpen}>  
        <DrawerContent>
        <div className="w-full inline-flex items-center justify-end relative pb-2">
							<div className={`w-full inline-flex items-center justify-center absolute  "top-[55%]"  left-1/2 -translate-x-1/2 -mt-9`}>
								<Image
								src={'/icons/skull2.png'}
								alt="Logo"
								width={64}
								height={64}
								className='w-12 h-12 object-contain'
								draggable={false}
								priority
								/>
							</div>
						                    
					<h1 className={`w-[60%] text-2xl font-medium text-center absolute left-1/2 -translate-x-1/2 top-[90%] -translate-y-1/2`}>
                        The monster was defeated!
					</h1>
					<Button
					variant={'ghost'}
					size={'icon'}
					onClick={() => {props.handleReward(false)}}
					className='z-[99] mt-8'
					>
						<svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect x="14.8492" y="6.10352e-05" width="4" height="21" transform="rotate(45 14.8492 6.10352e-05)" fill="#D9D9D9"/>
							<rect x="0.00012207" y="2.82843" width="4" height="21" transform="rotate(-45 0.00012207 2.82843)" fill="#D9D9D9"/>
						</svg>
					</Button>
				</div>

                <div className='w-full min-h-full max-h-full items-center flex flex-col mt-8 ml-2 overflow-auto '>
							
                            <div className='flex pr-3  text-[14px]'>
                                <div className='bg-backdrop w-[128px] h-[128px] flex items-center flex-shrink-0 mr-[13px] rounded-[20px]'>
                                    <img src='/icons/tresurechest.png' />
                                </div>
                                <div>
                                    <span className=''>If you defeat the monster every day, the loot will increase by <HoneyDisplay iconSize={16} amount={25000}/>  each day..</span>
                                    <p className='mt-2'>
                                        Come tomorrow and get <HoneyDisplay iconSize={16} amount={props.loot + 25000}/>  . If you skip - progress will be lost
                                     </p>
                                </div>
                            </div>
    
                            <Button
                            // claim treasure
                            onClick={() =>{setIsClaimed(true)}}
                            className=' h-10 w-[50%] mt-6 mb-2 text-[20px] rounded-[64px] border-2'
                            >
                                {claim? <p className='opacity-60'> Come back in CD </p> : <div className='flex items-center'>Get {props.loot} <img src='/icons/honey.png' className='ml-[2px] w-[20px] h-[20px] object-contain' /></div>}
                            </Button>	
                        </div>
        </DrawerContent>
    </Drawer>
    )
}
