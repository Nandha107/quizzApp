import { CgSpinner } from 'react-icons/cg';

type Props = {
	text?: string;
	opacity?: string;
	background?: string;
	display?: string;
	className?: string;
};

export const LoadingSpinner: React.FC<Props> = ({
	text,
	opacity = 'opacity-100',
	background = '',
	display = 'flex',
	className,
}) => {
	return (
		<div
			className={`z-[10000] ${display} items-center justify-center h-full w-full fade-in ${background} ${opacity} ${className}`}
		>
			<div className="flex gap-2 items-center">
				<CgSpinner className="w-8 h-8 animate-spin text-white" />

				<p className="text-sm m-2">{text ?? 'Fetching Your Data...'}</p>
			</div>
		</div>
	);
};
