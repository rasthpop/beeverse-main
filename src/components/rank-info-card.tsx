import Image from 'next/image';
import HoneyDisplay from '@/components/honey-display';
import RankIcon from './rank-icon';
import Progressbar from './ui/progressbar';

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

	return(
		<div className='bg-[url(/backgrounds/tab.webp)] bg-cover bg-no-repeat w-full bg-center'>
		<div className='w-full inline-flex  '>
			<div className='inline-flex items-center justify-center pl-2'>
				<RankIcon
				name={props.name}
				url={`/icons/levels/${props.name}.png`}
				size={120}
				textClass='text-xl font-bold mt-0.5'
				/>
			</div>
			<div className='w-full flex flex-col items-start justify-center mb-4'>
				{/* <HoneyDisplay amount={props.requiredAmount} iconSize={32} /> */}
				{/* <Progress value={0} content={`${props.currentbalance}/${props.requiredAmount}`} className="bg-[url(/interface/target-progress.png)] text-[10px] "/> */}
				<div className='text-[10px] w-10'>
				<Progressbar health={100000} maxHealth={props.requiredAmount} />
				</div>
				<p className='text-foreground text-base font-medium leading-5 ml-[10px]'>Reward: {props.description} + <span><HoneyDisplay isBold={false} amount={props.bonusAmount} iconSize={18} textClass='text-sm text-normal-stroke font-not-bold' /></span></p>
			</div>
		</div>
		</div>
	)
}
