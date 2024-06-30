
import Image from "next/image"
import React, {useState, useEffect} from "react"


export default function Progressbar(props:{
    health: number;
    maxHealth: number;

}
){
    const [healthBarWidth, setHealthBarWidth] = useState(89);
    useEffect(() => {
		const healthPercentage = (props.health / props.maxHealth) * 78 + 11;
		const newWidth = (healthPercentage / 100) * 100;
		setHealthBarWidth(newWidth);
	}, [props.health, props.maxHealth]);

    return(
        <div className='relative w-[250px] h-[26px] mx-auto my-2'>
        <Image src={'/progressbar/hp-bar-empty.png'} fill objectFit='cover' alt='Hp bar Empty' />
        <div
            style={{ width: healthBarWidth + '%' }}
            className={`max-w-[89%] min-w-[11%] h-[26px] overflow-hidden`}>
            <img
                className='w-[250px] relative max-w-none top-[-4px]'
                src={'/progressbar/hp-bar-full.png'}
                alt='Hp bar Full'
            />
        </div>
        <h2 className='absolute top-[2px] text-[#ECEBEA] text-sm font-medium text-center w-full'>
            {props.health}/{props.maxHealth}
        </h2>
    </div>        
    )
}