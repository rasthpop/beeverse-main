'use client'

import React from 'react';
import Image from 'next/image';
import { Button } from "./ui/button";
import { cn } from '@/lib/utils';
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer';
import { TelegramShareButton } from "react-share";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import ReferralRewardCard from './referral-reward-card';
import QuestCard from './quest-card';
import { usePopup } from '@tma.js/sdk-react';
import { Tables } from '../../types/supabase';
import HoneyDisplay from './honey-display';
import { Key } from 'lucide-react';

export default function MenuDrawer(
	props: {
		title: string;
		iconURL: string;
		size: "sm" | "lg";
		className?: string;
		isLocked: boolean;
		section?: "ranks" | "quests" | "friends" | "leaderboard" | "bonus" | "retreat";
		user: Tables<'users'>,
		leaders?: Tables<'users'>[],
		friends?: Tables<'users'>[],
		quests?: Tables<'quests'>[]
	}
) {
	//Front
	

	// Telegram SDK
	const tPopup = usePopup(true);

	// State
	const [isOpen, setIsOpen] = React.useState<boolean>(false);

	return(
		<Drawer open={isOpen} onClose={() => setIsOpen(false) }>
			<DrawerTrigger
			asChild
			disabled={props.isLocked}
			>
				<Button
				size={props.size}
				className={cn(
					`w-[76px] bg-transparent active:bg-transparent border-none flex flex-col gap-0 items-center justify-center text-sm font-medium text-normal-stroke leading-none relative`,
					props.className
				)}
				onClick={() => setIsOpen(true)}
				>
					{
						props.isLocked && (
							<Image
							src={"/icons/lock.png"}
							alt="Logo"
							width={128}
							height={44}
							className="w-full scale-75 absolute left-1/2 -translate-x-1/2 top-0 object-contain mt-7"
							draggable={false}
							priority
							/>
						)
					}
					<Image
					src={props.iconURL}
					alt="Logo"
					width={128}
					height={128}
					className="w-6 h-6 object-contain"
					draggable={false}
					priority
					/>
					{props.title}
					{
						props.isLocked && (
							<span className='text-[0.5rem] leading-none font-normal font-montserrat'>Coming soon</span>
						)
					}
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="w-full inline-flex items-center justify-end relative">
					{
						props.section === 'leaderboard' && (
							<div className='w-full inline-flex items-center justify-center absolute top-[43%] left-1/2 -translate-x-1/2 -mt-9'>
								<Image
								src={'/icons/star.png'}
								alt="Logo"
								width={128}
								height={128}
								className="w-16 h-16 object-contain"
								draggable={false}
								priority
								/>
							</div>
						)
					}
					<h1 className={`w-full text-2xl font-medium text-center whitespace-nowrap absolute left-1/2 -translate-x-1/2 ${props.section === "leaderboard" || props.section === "quests"? "top-[90%]" : "top-[80%]" }  -translate-y-1/2`}>
						{props.section === "ranks" && "Alpha Ranks Rewards:"}
						{props.section === "friends" && `Referrals`}
						{props.section === "bonus" && "Treasure"}
						{props.section === "quests" && "Quests:"}
						{props.section === "leaderboard" && "Leaderboard:"}
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
				{
					(props.section === "leaderboard" && props.leaders) && (
					<div className='flex justify-center pb-8'>
						<div className='w-[96%] min-h-[212px] max-h-[504px] rounded-3xl bg-backdrop mt-8  overflow-auto '>
							<Table className='flex justify-center  '>
								{/* <TableHeader>
									<TableRow>
										<TableHead className="max-w-full text-center text-normal-stroke">Name</TableHead>
										<TableHead className="max-w-full text-center text-normal-stroke">Honey</TableHead>
									</TableRow>
								</TableHeader> */}
								<TableBody className='w-[90%] mt-[14px] ' >
									{props.leaders.map((leader, idx) => (
										

										<TableRow key={idx} className='mb-[7px] flex items-center text-[16px] '>
											<div className={`text-[20px] ${idx === 0? "text-[gold]" : idx === 1? "text-[#cecdcd]" : idx == 2? "text-[#ffa041]" : "text-[white]"} `}>
												{idx + 1}
											</div>
											<TableCell className={`max-w-full text-center mr-auto truncate text-normal-stroke ${idx < 3 && ' text-[20px]'} ${idx === 0? "text-[gold]" : idx === 1? "text-[#cecdcd]" : idx == 2? "text-[#ffa041]" : "text-[white]"} `}>{leader.username || "unidentified"}</TableCell>
											<TableCell className="ml-[47px] max-w-full text-center text-normal-stroke">{(leader.balance).toLocaleString('en')}</TableCell>
											<span>Honey</span>
										</TableRow>
							
									))}
								</TableBody>
							</Table>
						</div>
					</div>	
					)
				}
				{
					(props.section === "friends" && props.friends) && (
						
						<div className='w-full h-full max-h-full flex flex-col mt-4 mb-4 overflow-auto'>
							
						<div className='w-full inline-flex items-center justify-center absolute top-[6%] left-1/2 -translate-x-1/2 -mt-9'>
						<Image src={'/icons/email.png'} alt="Logo" width={128} height={128} className="w-16 h-16 object-contain" draggable={false} priority/>
						</div>

							<div className='w-[98%] flex flex-col gap-2 mt-6'>
								<ReferralRewardCard avatarURL={'/icons/referral.png'} title={'Invite your friend!'} amount={5000} />
								<ReferralRewardCard avatarURL={'/icons/referral-premium.png'} title={'Invite your premium friend!'} amount={25000} />
							</div>
							<div className='w-full flex flex-col gap-2 items-center justify-center mt-2'>
								<p className='text-base font-medium text-foreground'>Referral Multiplier: <span className='text-gold'>1.0</span>X</p>
								<Button
								variant={'default'}
								className='px-4 py-1.5 gap-0.5'
								// onClick={() => refreshReferrals(player)}
								>
									Collect:
									<HoneyDisplay amount={50000} iconSize={16} textClass='text-base' />
								</Button>
							</div>
							<div className='w-[98%] flex flex-col items-center justify-center mt-4'>
								<div className='w-[98%] inline-flex items-center justify-between'>
									<p className='text-base text-title-stroke font-medium text-foreground'>List of your friends: {props.friends?.length || 0}</p>
									<Button
									variant={'ghost'}
									size={'icon'}
									// onClick={() => refreshReferrals(player)}
									>
										<svg width="32" height="32" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground">
											<path d="M5.49387 15.0017C5.4944 15.5195 5.91455 15.9387 6.43231 15.9382C6.95007 15.9377 7.3694 15.5176 7.36887 14.9999L5.49387 15.0017ZM11.6689 6.917L11.2996 6.0553L11.2984 6.0558L11.6689 6.917ZM16.5701 6.417L16.7607 5.49909L16.7578 5.49848L16.5701 6.417ZM22.1428 12.7597C22.2858 13.2574 22.8052 13.5448 23.3028 13.4018C23.8005 13.2587 24.088 12.7394 23.9448 12.2418L22.1428 12.7597ZM22.1365 12.265C22.0062 12.7661 22.307 13.2779 22.8081 13.4081C23.3092 13.5384 23.821 13.2376 23.9512 12.7365L22.1365 12.265ZM24.8387 9.32156C24.969 8.82044 24.6683 8.30862 24.1672 8.1784C23.6661 8.04816 23.1542 8.34882 23.024 8.84995L24.8387 9.32156ZM22.7942 13.4044C23.2932 13.5422 23.8096 13.2495 23.9475 12.7505C24.0855 12.2514 23.7926 11.735 23.2936 11.5971L22.7942 13.4044ZM19.9823 10.6821C19.4832 10.5442 18.9668 10.837 18.829 11.3361C18.6911 11.8351 18.9838 12.3515 19.483 12.4894L19.9823 10.6821ZM24.8688 14.9999C24.8683 14.482 24.4482 14.0627 23.9305 14.0632C23.4127 14.0637 22.9933 14.4839 22.9938 15.0017L24.8688 14.9999ZM13.7926 23.5845L13.602 24.5024L13.605 24.503L13.7926 23.5845ZM8.2199 17.2417C8.07686 16.7441 7.55751 16.4567 7.0599 16.5997C6.56227 16.7427 6.27482 17.2621 6.41786 17.7597L8.2199 17.2417ZM8.22624 17.7365C8.35647 17.2355 8.05581 16.7236 7.55469 16.5934C7.05356 16.4631 6.54175 16.7639 6.41152 17.265L8.22624 17.7365ZM5.52402 20.68C5.39379 21.1811 5.69445 21.6929 6.19557 21.8231C6.69669 21.9534 7.2085 21.6526 7.33874 21.1515L5.52402 20.68ZM7.56857 16.5971C7.06951 16.4592 6.55315 16.752 6.41525 17.251C6.27734 17.7501 6.57011 18.2665 7.06917 18.4044L7.56857 16.5971ZM10.3804 19.3194C10.8795 19.4572 11.3959 19.1645 11.5338 18.6655C11.6717 18.1664 11.3789 17.65 10.8798 17.5121L10.3804 19.3194ZM7.36887 14.9999C7.36734 13.4561 7.81189 11.9449 8.64905 10.6479L7.07371 9.63109C6.04059 11.2316 5.49197 13.0966 5.49387 15.0017L7.36887 14.9999ZM8.64905 10.6479C9.46856 9.37578 10.6492 8.37618 12.0393 7.7782L11.2984 6.0558C9.56576 6.80113 8.09516 8.04545 7.07371 9.63109L8.64905 10.6479ZM12.0382 7.77871C13.4073 7.19195 14.923 7.03733 16.3825 7.33553L16.7578 5.49848C14.9241 5.12383 13.0198 5.3181 11.2996 6.0553L12.0382 7.77871ZM16.3795 7.33491C17.8505 7.6404 19.195 8.38237 20.2377 9.46392L21.5876 8.16257C20.2831 6.80951 18.601 5.88128 16.7607 5.49909L16.3795 7.33491ZM20.2377 9.46392C21.1325 10.39 21.7871 11.5222 22.1428 12.7597L23.9448 12.2418C23.5045 10.7094 22.6955 9.3092 21.5876 8.16257L20.2377 9.46392ZM23.9512 12.7365L24.8387 9.32156L23.024 8.84995L22.1365 12.265L23.9512 12.7365ZM23.2936 11.5971L19.9823 10.6821L19.483 12.4894L22.7942 13.4044L23.2936 11.5971ZM22.9938 15.0017C22.9955 16.5454 22.5508 18.0566 21.7137 19.3536L23.2891 20.3704C24.3222 18.7699 24.8707 16.9049 24.8688 14.9999L22.9938 15.0017ZM21.7137 19.3536C20.8942 20.6259 19.7135 21.6254 18.3235 22.2232L19.0632 23.9462C20.7958 23.2009 22.2677 21.956 23.2891 20.3704L21.7137 19.3536ZM18.3235 22.2232C16.9543 22.81 15.4397 22.9641 13.9803 22.666L13.605 24.503C15.4386 24.8776 17.343 24.6834 19.0632 23.9462L18.3235 22.2232ZM13.9832 22.6666C12.5123 22.3611 11.1677 21.6191 10.1251 20.5376L8.7752 21.8389C10.0796 23.192 11.7618 24.1202 13.602 24.5024L13.9832 22.6666ZM10.1251 20.5376C9.23027 19.6115 8.57562 18.4794 8.2199 17.2417L6.41786 17.7597C6.85832 19.2921 7.66727 20.6922 8.7752 21.8389L10.1251 20.5376ZM6.41152 17.265L5.52402 20.68L7.33874 21.1515L8.22624 17.7365L6.41152 17.265ZM7.06917 18.4044L10.3804 19.3194L10.8798 17.5121L7.56857 16.5971L7.06917 18.4044Z" fill="white"/>
										</svg>
									</Button>
								</div>
								<div className='w-full h-24 bg-backdrop rounded-2xl inline-flex items-center justify-center mt-0.5'>
									{
										(props.friends.length > 0) ? (
											<Table>
												{/* <TableHeader>
													<TableRow>
														<TableHead className="max-w-full text-center text-normal-stroke">Name</TableHead>
														<TableHead className="max-w-full text-center text-normal-stroke">Honey</TableHead>
													</TableRow>
												</TableHeader> */}
												<TableBody>
													{props.friends.map((friend, idx) => (
													<TableRow key={idx}>
														<TableCell className="max-w-full text-center truncate text-normal-stroke">{friend.username || "unidentified"}</TableCell>
														<TableCell className="max-w-full text-center text-normal-stroke">{(friend.balance).toLocaleString('en')}</TableCell>
													</TableRow>
													))}
												</TableBody>
											</Table>
										) : (
											<div>
												<h4 className="text-base text-white/70 font-medium">You haven&apos;t invited anyone yet</h4>
											</div>
										)
									}
								</div>
							</div>
							<div className="w-full inline-flex gap-2 justify-center items-center mt-4">
								<TelegramShareButton url={`https://t.me/beeverse_main_dev_bot/start?startapp=frP-${props.user.id_tg}`} className="w-full">
									<Button
									variant={'default'}
									className="w-full h-14 gap-2 text-xl text-normal-stroke justify-between px-4 pl-10"
									>
										Invite your friend!
										<Image
										src={'/icons/email.png'}
										alt='email'
										width={52}
										height={52}
										/>
									</Button>
								</TelegramShareButton>
								<div>
									<Button
									variant={'default'}
									size={'icon'}
									className="w-14 h-14"
									onClick={() => {
										navigator.clipboard.writeText(`https://t.me/beeverse_main_dev_bot/start?startapp=frP-${props.user.id_tg}`);
										tPopup && tPopup.open({
											title: 'Done!',
											message: "Your invite code was copied.",
											buttons: [{ id: 'btn-ok', type: 'default', text: 'OK' }],
										})
									}}
									>
										<svg width="22" height="28" viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path fillRule="evenodd" clipRule="evenodd" d="M22.0001 9.44442C22.0001 7.41938 20.3585 5.77774 18.3334 5.77774H8.5556C6.53055 5.77774 4.88892 7.41938 4.88892 9.44442V24.1112C4.88892 26.1363 6.53055 27.7778 8.5556 27.7778H18.3334C20.3585 27.7778 22.0001 26.1363 22.0001 24.1112V9.44442ZM19.5556 9.44442C19.5556 8.76941 19.0085 8.2222 18.3334 8.2222H8.5556C7.88059 8.2222 7.33337 8.76941 7.33337 9.44442V24.1112C7.33337 24.7862 7.88059 25.3334 8.5556 25.3334H18.3334C19.0085 25.3334 19.5556 24.7862 19.5556 24.1112V9.44442Z" fill="white"/>
											<path d="M3.66668 3.33331H15.889C16.564 3.33331 17.1112 2.78609 17.1112 2.11108C17.1112 1.43607 16.564 0.888855 15.889 0.888855H3.66668C1.64163 0.888855 0 2.53049 0 4.55554V21.6667C0 22.3418 0.547216 22.889 1.22223 22.889C1.89724 22.889 2.44445 22.3418 2.44445 21.6667V4.55554C2.44445 3.88053 2.99167 3.33331 3.66668 3.33331Z" fill="white"/>
										</svg>
									</Button>
								</div>
							</div>
						</div>
					)
				}
				{
					props.section === "bonus" && (
						<div className='w-full min-h-full max-h-full items-center flex flex-col mt-4 ml-2 overflow-auto'>
							

						<div className='w-[95%] inline-flex items-center justify-center absolute top-[7%] left-1/2 -translate-x-1/2 -mt-9'>
						<Image src={'/icons/chest.png'} alt="Logo" width={128} height={128} className="w-16 h-16 object-contain" draggable={false} priority/>
						</div>
						<div className='flex text-[16px]'>
							<div className='bg-backdrop w-[145px] h-[145px] flex items-center flex-shrink-0 mr-[13px] rounded-[20px]'>
								<img src='/icons/tresurechest.png' />
							</div>
							<div>
								<span>Every 4 hours, your worker bees will bring you more honey! Specifically, 0.5% of your balance.</span>
								<p className=''>Your passive income now:  </p>
																			{/* 0.5% of balance  */}
								<div className='flex text-[18px] items-center'>	<p> 1,500</p> <img src='/icons/honey.png'  className='ml-[2px] w-4 h-4' />	</div>
							</div>
						</div>

						<Button
						// claim treasure
						className=' h-12 w-[50%] mt-6 mb-2 text-[20px] rounded-[64px] border-2'
						>
							Get 1,500 <img src='/icons/honey.png' className='ml-[2px] w-6 h-6' />
						</Button>	
					</div>
				)
				}
				{
					(props.section === "quests" && props.quests) && (
						<div className='w-full h-full max-h-full flex flex-col mt-4 overflow-auto'>	
							<div className='w-full inline-flex items-center justify-center absolute top-[11%] left-1/2 -translate-x-1/2 -mt-9'>
								<Image src={'/icons/notification.png'} alt="Logo" width={128} height={128} className="w-16 h-16 object-contain" draggable={false} priority/>
							</div>
							<div className='w-full flex flex-col mt-4'>
								<QuestCard
								reward={5000}
								iconURL={'/icons/referral.png'}
								title={'Invite your 1 friend!'}
								actionTitle='Complete'
								/>

							</div>



						</div>
					)
				}
			</DrawerContent>
		</Drawer>
	)
}
