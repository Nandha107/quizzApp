import { GoogleGenerativeAI } from '@google/generative-ai';

class GenerativeAI {
	private readonly client: GoogleGenerativeAI;

	constructor() {
		const apiKey = 'AIzaSyDuXK3BMC3DbjV0CepJ1ZzhX-x9_ZysdRE';

		if (!apiKey) {
			throw new Error('Missing REACT_APP_GOOGLE_API_KEY environment variable');
		}

		this.client = new GoogleGenerativeAI(apiKey);
	}
	// const prompt = `List a few popular cookie recipes using this JSON schema:

	// Recipe = {'recipeName': string}
	// Return: Array<Recipe>`;
	async generateContent(prompt: string, model = 'gemini-1.5-flash'): Promise<string> {
		console.log('coming AIIII');
		try {
			const modelInstance = await this.client.getGenerativeModel({
				model,
			});
			const result =
				await modelInstance.generateContent(`${prompt}  using this JSON schema:  	Timer = {
	hours: number;
	minutes: number;
	overAllSeconds: number;
};
 Option = {
	value: string;
}; Questions = {question: string;
	questionType: 'CHOICE' | 'TEXTAREA'; // Defines the type of question
	options: Option[]; // Array of options (will be empty for TEXTAREA type)
	answer: string; // The correct answer
    imageUrl:string;
    enableImage:boolean;
	timer: Timer;}


	Return: Array<Questions>;

  give only array could not asign any variable
	`);
			const response = await result.response;

			return response.text();
		} catch (error) {
			console.error('Error generating content:', error);
			throw new Error('Failed to generate content');
		}
	}
}

export default new GenerativeAI();
