import { useEffect, useRef } from 'react';

export const useClickOutside = (handler: any) => {
	const domNode = useRef<any>();

	useEffect(() => {
		document.onkeydown = (e) => {
			if (e.key === 'Escape') {
				handler();
			}
		};

		let handleAction = (event: any) => {
			if (!domNode.current?.contains(event.target)) {
				handler();
			}
		};

		document.addEventListener('mousedown', handleAction);

		return () => document.removeEventListener('mousedown', handleAction);
	});

	return domNode;
};
