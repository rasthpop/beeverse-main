import Image from 'next/image';
import React from 'react';


const BearDamage = (props:{ visible:boolean; }) => {
	return (
		<div
			className={`absolute z-10 left-0  top-[56%] translate-y-[-50%] w-full flex justify-center ${
				props.visible ? 'visible' : 'invisible'
			}`}>
			<Image src={'/animations/bear_damage.png'} alt='Bear idle' width={304} height={406} />
		</div>
	);
};

export default BearDamage;
