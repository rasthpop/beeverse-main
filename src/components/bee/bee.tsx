'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';


const BeeIdle = (props:{visible:boolean}) => {
	const [changeAnimation, setChangeAnimation] = useState(0);

	useEffect(() => {
		const animationInterval = setInterval(() => {
			setChangeAnimation((prev) => prev + 1);
		}, 2200);

		return () => {
			clearInterval(animationInterval);
		};
	}, []);

	return (
		<div
			className={`absolute z-10 top-[62%]  left-[40%] flex justify-center ${
				props.visible ? 'visible' : 'invisible'
			}`}>
			<div className='relative'>
				{changeAnimation % 5 === 0 ? (
					<Image
						className='absolute top-0 z-10'
						src={'/animations/head_idle.gif'}
						alt='Bee idle'
						width={100}
						height={100}
						priority
					/>
				) : (
					<Image
						className='absolute top-0 z-10'
						src={'/animations/head_back_idle.png'}
						alt='Bee idle'
						width={100}
						height={100}
						priority
					/>
				)}
				<Image
					className='relative z-20'
					src={'/animations/bee_idle.png'}
					alt='Bee idle'
					width={153}
					height={137}
					priority
				/>
			</div>
		</div>
	);
};

export default BeeIdle;
