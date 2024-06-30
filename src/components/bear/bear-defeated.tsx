import Image from 'next/image';
import React from 'react';



const BearDead = (props:{ visible:boolean }) => {
	return (
		<div
			className={`absolute left-0 z-10 top-[56%] translate-y-[-50%] w-full flex justify-center  ${
				props.visible ? 'visible' : 'invisible'
			}`}>
			<Image
				className='-translate-x-1'
				width={255}
				height={400}
				objectFit='contain'
				src={'/bear-dead.png'}
				alt='Dead bear'
			/>
			<Image
				className='absolute top-[26%] left-1/2 -translate-x-[calc(50%+10px)]'
				width={234}
				height={175}
				src={'/long_chain.png'}
				alt='Long chain'
			/>
		</div>
	);
};

export default BearDead;
