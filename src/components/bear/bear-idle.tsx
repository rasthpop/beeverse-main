import Image from 'next/image';
import React from 'react';



const BearIdle = (props:{ visible: boolean; }) => {
	return (
		<div
			className={`absolute left-0 z-10 top-[56%] translate-y-[-50%] w-full flex justify-center ${
				props.visible ? 'visible' : 'invisible'
			}`}>
			<Image src={'/animations/bear_idle.png'} alt='Bear idle' width={304} height={406} />
		</div>
	);
};

export default BearIdle;
