import Image from 'next/image';
import HoneyDisplay from '@/components/honey-display';
import RankIcon from './rank-icon';
import { Progress } from './ui/progress';

export default function RankInfoCard(
	props: {
		name: string;
		description: string;
		iconURL: string;
		requiredAmount: number;
		bonusAmount: number;
		progress: number;
		currentbalance: number;
	}
) {
	const progressint = (props.currentbalance * 100) / props.requiredAmount
	return(
		<div className='bg-[url(/backgrounds/tab.png)] bg-cover bg-no-repeat w-full bg-center'>
		<div className='w-full inline-flex gap-2  '>
			<div className='inline-flex items-center justify-center pl-4'>
				<RankIcon
				name={props.name}
				url={`/icons/levels/${props.name}.png`}
				size={120}
				textClass='text-xl font-bold mt-0.5'
				/>
			</div>
			<div className='w-full flex flex-col items-start justify-center mb-4'>
				{/* <HoneyDisplay amount={props.requiredAmount} iconSize={32} /> */}
				<Progress value={0} content={`${props.currentbalance}/${props.requiredAmount}`} className="bg-[url(/interface/target-progress.png)] "/>
				<p className='text-foreground text-base font-medium leading-5 ml-[10px]'>Reward: {props.description} + <span><HoneyDisplay amount={props.bonusAmount} iconSize={18} textClass='text-sm text-normal-stroke font-not-bold' /></span></p>
			</div>
		</div>
		</div>
	)
}
