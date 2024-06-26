import Image from 'next/image';

export default function TargetStatsCard(
    props: {
        title: string;
        data: string;
        iconMainURL?: string;
		iconDataURL?: string;
		isLocked: boolean;
    }
) {

    return(
        <div className="w-full min-w-fit inline-flex items-center justify-center gap-1 p-1 relative">
			{
				props.isLocked && (
					<Image
					src={"/icons/lock.png"}
					alt="Logo"
					width={128}
					height={44}
					className="w-full scale-90 absolute left-1/2 -translate-x-1/2 top-0 object-contain mt-2"
					draggable={false}
					priority
					/>
				)
			}
            {
				props.iconMainURL && (
					<Image
					src={props.iconMainURL}
					alt="Logo"
					width={32}
					height={32}
					className=""
					draggable={false}
					priority
					/>
				)
			}
            <div className="w-full h-full flex flex-col items-center justify-center">
                <h4 className="text-xl text-foreground text-title-stroke whitespace-nowrap">{props.title}</h4>
				<div className='w-full inline-flex items-center justify-center gap-0.5'>
					{
						props.iconDataURL && (
							<Image
							src={props.iconDataURL}
							alt="Logo"
							width={14}
							height={14}
							className="object-contain"
							draggable={false}
							priority
							/>
						)
					}
					<p className="w-full text-xs text-foreground font-montserrat text-center font-medium text-normal-stroke whitespace-nowrap">{props.data}</p>
				</div>
            </div>
        </div>
    )
}