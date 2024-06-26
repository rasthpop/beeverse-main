import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function RankIcon(
	props: {
		name: string;
		url: string;
		size: number;
		textClass?: string;
	}
) {
	return(
		<div className="bg-transparent inline-flex items-center justify-center relative">
			<Image
			src={props.url}
			alt="Level"
			width={props.size}
			height={props.size}
			className="min-w-full min-h-full object-contain"
			draggable={false}
			priority
			/>
			<h4
			className={cn(
				"text-base leading-none font-bold text-title-stroke absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 mt-[1px]",
				props.textClass
			)}>
				{props.name}
			</h4>
		</div>
	)
}
