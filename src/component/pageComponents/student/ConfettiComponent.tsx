import { useEffect } from 'react';
import confetti from 'canvas-confetti';

const ConfettiComponent = () => {
	const defaults = {
		spread: 360,
		ticks: 50,
		gravity: 0,
		decay: 0.94,
		startVelocity: 30,
		shapes: ['star'],
		colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
	};

	const shoot = () => {
		confetti({
			...defaults,
			particleCount: 40,
			scalar: 1.2,
			shapes: ['star'],
		});

		confetti({
			...defaults,
			particleCount: 10,
			scalar: 0.75,
			shapes: ['circle'],
		});
	};

	useEffect(() => {
		const interval1 = setTimeout(shoot, 0);
		const interval2 = setTimeout(shoot, 100);
		const interval3 = setTimeout(shoot, 200);

		// Cleanup the intervals to avoid memory leaks
		return () => {
			clearTimeout(interval1);
			clearTimeout(interval2);
			clearTimeout(interval3);
		};
	}, []);

	return <div></div>;
};

export default ConfettiComponent;
