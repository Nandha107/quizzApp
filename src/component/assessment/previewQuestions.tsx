interface createTestType {
	question: string;
	timeDuration: {
		hours: number;
		minutes: number;
		overAllSeconds: number;
	};
	chooseAnswerType: string;
	options: { value: string }[];
	textAreaAnswer: string;
	correctAnswer: string;
}

export const PreviewQuestions = () => {
	const getLocalStorageQuestionsItem = localStorage.getItem('createQuestions');

	return (
		<div className="w-full h-full flex flex-col pl-3 pr-10 py-5">
			<div className="flex items-center h-[7%] gap-3">
				<p className="text-2xl font-semibold">Preview</p>
			</div>
			<div className="border border-gray-300 rounded-lg flex flex-col gap-3 items-center py-8 bg-gray-300/15 overflow-y-scroll lg:min-h-[93%] lg:max-h-[93%] px-16">
				<div className="w-full gap-3 flex flex-col">
					{getLocalStorageQuestionsItem ? (
						<>
							{JSON.parse(getLocalStorageQuestionsItem).map(
								(question: createTestType, index: number) => {
									return (
										<div key={index} className="flex flex-col gap-4">
											<p className="font-bold text-xl px-2">
												{' '}
												{index + 1}. {question.question}
											</p>
											<div className="flex flex-col gap-2 min-w-[80%] max-w-full">
												{question.options.map(
													(
														option: { value: string },
														index: number,
													) => {
														return (
															<div
																key={index}
																className="flex gap-3 items-center p-1 border border-[#DFDFDF] rounded-lg bg-white w-[80%]"
															>
																<div className="w-[10%] flex justify-center py-1 rounded-lg bg-[#DFDFDF]">
																	<p className="text-lg font-bold">
																		{index + 1}
																	</p>
																</div>
																<div className="w-full">
																	<p className="text-lg">
																		{option.value}
																	</p>
																</div>
															</div>
														);
													},
												)}
											</div>
										</div>
									);
								},
							)}
						</>
					) : (
						<>No More Questions...</>
					)}
				</div>
			</div>
		</div>
	);
};
