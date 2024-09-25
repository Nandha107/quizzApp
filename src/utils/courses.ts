interface courseType {
	icon?: any;
	Dept: string;
	Abbreviation: string;
	key: string | number;
	path: string;
}

export const CoursesData: courseType[] = [
	{
		icon: '',
		Dept: 'Civil',
		Abbreviation: 'CIVIL ENGINEERING',
		key: 'civil',
		path: 'civil',
	},
	{
		icon: '',
		Dept: 'Mech',
		Abbreviation: 'MECHANICAL ENGINEERING',
		key: 'mech',
		path: 'mech',
	},
	{
		icon: '',
		Dept: 'EEE',
		Abbreviation: 'ELECTRICAL AND ELECTRONICS ENGINEERING',
		key: 'eee',
		path: 'eee',
	},
	{
		icon: '',
		Dept: 'ECE',
		Abbreviation: 'ELECTRONICS AND COMMUNICATION ENGINEERING',
		key: 'ece',
		path: 'ece',
	},
	{
		icon: '',
		Dept: 'CSE',
		Abbreviation: 'COMPUTER SCIENCE ENGINEERING',
		key: 'cse',
		path: 'cse',
	},
];
