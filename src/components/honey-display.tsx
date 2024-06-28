import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function HoneyDisplay(
	props: {
		textClass?: string;
		amount: number;
		iconSize: number;
		isBold: boolean;
	}
) {

	return(
	 <div className='inline-flex items-center justify-center'>
		<h1 
		className={cn(
			`${props.isBold && "font-bold"} text-foreground text-title-stroke text-[16px]  min-[364px]: text-xl ${props.isBold && "min-[395px]:text-2xl"}`,
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
