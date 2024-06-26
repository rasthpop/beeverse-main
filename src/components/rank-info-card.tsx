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
	}
) {
	
	return(
		<div className='w-full inline-flex gap-2'>
			<div className='inline-flex items-center justify-center'>
				<RankIcon
				name={props.name}
				url={`/icons/levels/${props.name}.png`}
				size={96}
				textClass='text-xl font-bold mt-0.5'
				/>
			</div>
			<div className='w-full flex flex-col items-start justify-center'>
				<HoneyDisplay amount={props.requiredAmount} iconSize={32} />
				{/* <div>
					<p>{(props.progress).toLocaleString('en')}/{(props.requiredAmount).toLocaleString('en')}<span></span> </p>
					<Progress value={props.progress} content="Immortal"/>
				</div> */}
				<p className='text-foreground text-base font-medium leading-5'>{props.description} + <span><HoneyDisplay amount={props.bonusAmount} iconSize={18} textClass='text-sm text-normal-stroke' /></span></p>
			</div>
		</div>
	)
}
