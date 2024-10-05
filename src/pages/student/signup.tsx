import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { SignUpImg } from '../../assets/icons/signup';
import { PrimaryButton } from '../../component/buttons/primaryButton';
import { LoadingSpinner } from '../../component/spinner/loadingSpinner';
import { Input } from '../../component/inputs/input';
import { DropDownArrow } from '../../assets/svg/dropdownArrow';
import { CustomizedSelect } from '../../component/inputs/select';

interface selectOptionType {
	label: string;
	value: string;
}

const SignUp: React.FC = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [collegeName, setCollegeName] = useState('');
	const [department, setDepartment] = useState<selectOptionType | null>(); // Default department
	const [graduationYear, setGraduationYear] = useState('');
	const [registerNo, setRegisterNo] = useState(''); // New state for Register No
	const [loading, setLoading] = useState(false);
	const [passwordShow, setPasswordShow] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const selectOptions: { label: string; value: string }[] = [
		{ label: 'CIVIL ENGINEERING', value: 'CIVIL' },
		{ label: 'MECHANICAL ENGINEERING', value: 'MECH' },
		{ label: 'ELECTRICAL AND ELECTRONICS ENGINEERING', value: 'EEE' },
		{ label: 'ELECTRONICS AND COMMUNICATION ENGINEERING', value: 'ECE' },
		{ label: 'COMPUTER SCIENCE ENGINEERING', value: 'CSE' },
	];

	const navigate = useNavigate();

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		if (password !== confirmPassword) {
			setError('Passwords do not match.');
			setLoading(false);
			return;
		}

		try {
			const response = await axios.post(
				'https://quiz-server-sigma.vercel.app/auth/signup',
				{
					name,
					email,
					phoneNumber: phone,
					password,
					role: 'STUDENT',
					collegeName,
					department,
					GraduationYear: parseInt(graduationYear),
					RegiterNo: parseInt(registerNo), // Include Register No in the API request
				},
			);
			console.log('Sign-up response:', response.data);
			navigate('/student-login');
		} catch (error) {
			setError('Sign-up failed. Please check your credentials and try again.');
			console.error('Sign-up error:', error);
		} finally {
			setLoading(false);
		}
	};

	console.log({ error });

	const handleLoginRedirect = () => {
		navigate('/student-login'); // Redirect to login page
	};

	return (
		<div className="w-full h-full bg-white">
			<div className="flex w-full h-full">
				{/* Left Side */}
				<div className="hidden lg:flex lg:items-center rounded-r-3xl lg:justify-center h-full w-[50%] bg-gradient-to-br from-teal-600/60 via-teal-600/20 to-teal-600/60 border-r">
					<SignUpImg />
				</div>

				{/* Right Side */}
				<div className="flex items-center justify-center h-full w-full lg:w-[50%] bg-white">
					<div className=" w-full h-full flex flex-col gap-12 items-center justify-center py-5">
						{/* Header */}
						<div className="flex flex-col items-center justify-center w-full gap-3">
							<p className="text-xl font-semibold md:text-3xl text-headingPrimary">
								Create Your Account
							</p>
							<p className="text-md font-normal text-gray-400">
								Already have an account?{' '}
								<span
									className="font-semibold text-primary hover:cursor-pointer hover:underline"
									onClick={handleLoginRedirect}
								>
									Sign In
								</span>
							</p>
						</div>
						{/* Form */}
						<form
							className="flex flex-col w-full gap-5 px-10 lg:px-8 overflow-y-scroll"
							onSubmit={handleSignUp}
						>
							<div className="w-full flex flex-col md:grid md:grid-cols-2 gap-5">
								<Input
									id="name"
									label="Full Name"
									htmlFor="name"
									type="text"
									placeholder="Enter Your Full Name"
									isRequired
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
								<Input
									id="email"
									htmlFor="email"
									label="Email Address"
									type="text"
									placeholder="Enter Your Email Address"
									isRequired
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<Input
									id="phone"
									htmlFor="phone"
									label="Phone Number"
									type="text"
									placeholder="Enter Your Phone Number"
									isRequired
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
								/>
								<Input
									id="registerNo"
									htmlFor="registerNo"
									label="Register No "
									type="text"
									placeholder="Enter Your Registration Number"
									isRequired
									value={registerNo}
									onChange={(e) => setRegisterNo(e.target.value)}
								/>
								<CustomizedSelect
									id="department"
									htmlFor="department"
									placeholder={'Select Your Department'}
									isRequired
									label="Choose Your Department"
									dropdownStyle={{ padding: '8px', borderRadius: '1rem' }}
									suffixIcon={<DropDownArrow />}
									size="large"
									value={department?.value as string}
									options={selectOptions}
									onChange={(dept) => setDepartment(dept)}
								/>
								<Input
									label="Graduation Year "
									id="graduationYear"
									htmlFor="graduationYear"
									type="text"
									minLength={4}
									maxLength={4}
									placeholder="Graduation Year (e.g., 2025)"
									isRequired
									value={graduationYear}
									onChange={(e) => setGraduationYear(e.target.value)}
								/>
								<Input
									label="College Name"
									id="collegeName"
									htmlFor="collegeName"
									type="text"
									placeholder="Enter Your College Name"
									isRequired
									className="col-span-2 justify-self-center w-full"
									value={collegeName}
									onChange={(e) => setCollegeName(e.target.value)}
								/>
								<div className="flex flex-col w-full gap-2">
									<label
										className="text-base text-secondary md:text-md"
										htmlFor="password"
									>
										Password <span className="text-red-600">*</span>
									</label>
									<div className="relative select-none">
										<input
											type={`${passwordShow ? 'text' : 'password'}`}
											id="password"
											placeholder="Password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											className="w-full pl-5 pr-10 py-3 md:py-4 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-600"
											required
										/>
										{passwordShow ? (
											<FaEye
												className="absolute text-[18px] right-3.5 top-[0.8rem] md:top-[1.1rem] lg:top-[1.2rem] text-gray-500/70 hover:cursor-pointer hover:text-primary"
												onClick={() => setPasswordShow(false)}
											/>
										) : (
											<FaEyeSlash
												className="absolute text-[18px] right-3.5 top-[0.8rem] md:top-[1.1rem] lg:top-[1.2rem] text-gray-500/70 hover:cursor-pointer hover:text-primary"
												onClick={() => setPasswordShow(true)}
											/>
										)}
									</div>
								</div>
								<div className="flex flex-col w-full gap-2">
									<label
										className="text-base text-secondary md:text-md"
										htmlFor="confirmPassword"
									>
										Confirm Password{' '}
										<span className="text-red-600">*</span>
									</label>
									<div className="select-none">
										<input
											type={`${passwordShow ? 'text' : 'password'}`}
											id="confirmPassword"
											placeholder="Confirm Password"
											value={confirmPassword}
											onChange={(e) =>
												setConfirmPassword(e.target.value)
											}
											className="w-full pl-5 pr-10 py-3 md:py-4 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-600"
											required
										/>
									</div>
								</div>
							</div>

							{/* Submit Button */}
							<div className={`flex flex-col items-center`}>
								<PrimaryButton
									type="submit"
									disabled={loading}
									style={{ height: '3.2rem' }}
									icon={
										loading ? (
											<LoadingSpinner
												text="Loading..."
												className="text-white font-semibold"
											/>
										) : null
									}
									text={loading ? '' : 'Register'}
									className={`w-full font-bold border border-transparent text-white rounded-full bg-gradient-to-br from-teal-700 to-teal-500 hover:from-teal-800 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600 ${
										loading ? 'opacity-50 cursor-not-allowed' : ''
									}`}
								/>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
