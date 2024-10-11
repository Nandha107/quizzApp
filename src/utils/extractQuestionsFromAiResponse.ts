export const extractCodeFromResponse = (response: string): string[] => {
	// Additional languages to support in the regex
	const additionalLanguages = ['js']
		.map((lang) =>
			lang.toLowerCase().replace(/[+#]/g, (match) => {
				if (match === '+') return '\\+';
				if (match === '#') return '\\#';
				return match;
			}),
		)
		.join('|');

	const codeRegex = new RegExp(
		'`(?:javascript|json|typescript|js|jsx|ts|tsx|python|java|csharp|c#|' +
			additionalLanguages +
			')\\n([\\s\\S]*?)\\n`',
		'g',
	);

	// Using matchAll to find all matches
	const matches = Array.from(response.matchAll(codeRegex));

	// Extracting the captured code blocks (group 1) and returning them
	const codeBlocks = matches.map((match) => match[1]);

	return codeBlocks.length > 0 ? codeBlocks : ['try again!'];
};
