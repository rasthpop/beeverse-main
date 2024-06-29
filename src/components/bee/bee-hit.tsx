'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';


const BeeHit = (props:{ visible: boolean; }) => {
	const [changeAnimation, setChangeAnimation] = useState(0);

	useEffect(() => {
		const animationInterval = setInterval(() => {
			setChangeAnimation((prev) => prev + 1);
		}, 600);

		return () => {
			clearInterval(animationInterval);
		};
	}, []);

	return (
		<div
			className={`absolute z-10 top-[62%] left-[40%] flex justify-center ${
				props.visible ? 'visible' : 'invisible'
			}`}>
			<div className='relative'>
				{changeAnimation % 5 === 0 ? (
					<Image
						className='absolute top-0 z-10'
						src={'/animations/head_attack.png'}
						alt='Bee idle'
						width={100}
						height={100}
					/>
				) : (
					<Image
						className='absolute top-0 z-10'
						src={'/animations/head_back_attack.png'}
						alt='Bee idle'
						width={100}
						height={100}
					/>
				)}
				<Image
					className='relative z-20'
					src={'/animations/bee_attack.png'}
					alt='Bee idle'
					width={153}
					height={137}
				/>
			</div>
		</div>
	);
};

export default BeeHit;
