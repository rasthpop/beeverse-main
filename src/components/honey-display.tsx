import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function HoneyDisplay(
	props: {
		textClass?: string;
		amount: number;
		iconSize: number;
	}
) {

	return(
	 <div className='inline-flex items-center justify-center'>
		<h1 
		className={cn(
			"text-2xl font-bold text-foreground text-title-stroke",
			props.textClass
		)}
		>
			{(props.amount).toLocaleString('en')}
		</h1>
		<Image
		src={"/icons/honey.png"}
		alt="Logo"
		width={props.iconSize}
		height={props.iconSize}
		className="object-contain"
		draggable={false}
		priority
		/>
	 </div>
	)
}
