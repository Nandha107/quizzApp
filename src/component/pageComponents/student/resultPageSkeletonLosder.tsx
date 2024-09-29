const SkeletonLoader = () => (
	<div className="w-full mx-auto bg-white animate-pulse">
		<div className="md:flex w-full gap-2 h-full md:gap-9 p-8">
			<div className="md:w-[60%] w-full flex flex-col justify-center items-center ">
				<div className="h-64 w-64 bg-gray-300 rounded-full" />
				<div className="flex flex-col gap-3 mt-5 ">
					<div className="h-8 w-3/4 bg-gray-300 rounded-md" />
					<div className="h-4 w-1/2 bg-gray-300 rounded-md" />
					<div className="h-12 w-full bg-gray-300 rounded-md mt-5" />
				</div>
			</div>

			<div className="flex mt-5 md:m-0 flex-col w-full overflow-y-auto h-[50vh] md:h-[70vh] gap-3">
				{[...Array(4)].map((_, index) => (
					<div key={index} className="p-4 border rounded-lg shadow-md bg-gray-100">
						<div className="h-4 w-1/2 bg-gray-300 rounded-md mb-2" />
						<div className="h-4 w-1/3 bg-gray-300 rounded-md" />
						<div className="h-3 w-1/4 bg-gray-200 rounded-md mt-2" />
					</div>
				))}
			</div>
		</div>
	</div>
);
export default SkeletonLoader;
