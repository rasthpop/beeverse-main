
import Image from "next/image"
import React, {useState, useEffect} from "react"


export default function Rankprogress(props:{
    balance: number;
    reqAmount: number;
}
){
    const [healthBarWidth, setHealthBarWidth] = useState(89);
    useEffect(() => {
		const healthPercentage = (props.balance / props.reqAmount) * 78 + 11;
		const newWidth = (healthPercentage / 100) * 100;
		setHealthBarWidth(newWidth);
	}, [props.balance, props.reqAmount]);

    return(
		<div className='relative w-[220px] h-[26px] my-2'>
				<Image src={'/progressbar/hp-bar-empty.png'} fill objectFit='cover' alt='Hp bar Empty' />
				<div
					style={{ width: healthBarWidth + '%' }}
					className={`max-w-[89%] min-w-[11%] h-[26px] overflow-hidden`}>
					<img
						className='w-[220px] relative max-w-none top-[-1.5px]'
						src={'/progressbar/hp-bar-full.png'}
						alt='Hp bar Full'
					/>
				</div>
				<h2 className='absolute top-[6px] text-[#ECEBEA] text-[10px] font-medium text-center w-full'>
					{props.balance}/{props.reqAmount} HP
				</h2>
			</div>        
    )
}