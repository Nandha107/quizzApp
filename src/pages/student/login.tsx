import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { LoginImg } from '../../assets/icons/login';
import { PrimaryButton } from '../../component/buttons/primaryButton';
import { LoadingSpinner } from '../../component/spinner/loadingSpinner';
import toast from 'react-hot-toast';
import { Config } from '../../config';

// Function to parse JWT
function parseJwt(token: any) {
	var base64Url = token.split('.')[1];
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	var jsonPayload = decodeURIComponent(
		window
			.atob(base64)
			.split('')
			.map(function (c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join(''),
	);

	return JSON.parse(jsonPayload);
}

const StudentLogin: React.FC = () => {
	const [registerNo, setRegisterNo] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [passwordShow, setPasswordShow] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const validatePhoneNumber = (phone: string) => {
		return phone.length >= 10; // Simple phone number validation
	};

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		// Validate phone number
		if (!validatePhoneNumber(phone)) {
			setError('Phone number must be at least 10 digits.');
			setLoading(false);
			return;
		}

		try {
			await axios
				.post('/auth/login', {
					registerNo,
					phone,
					password,
				})
				.then((res) => {
					toast.success('Student login successfully...');
					// Store token in localStorage
					localStorage.setItem(
						Config.localStorageKeys.access_token,
						res.data.access_token,
					);
					const decodedToken = parseJwt(res.data.access_token);
					console.log('Decoded token:', decodedToken);

					// Navigate based on the user role from the decoded token
					navigate('/student-dashboard?tab=assessments');
				})
				.catch((err) => toast.error(err));
		} catch (error: any) {
			setError('Login failed. Please check your credentials and try again.');
			setLoading(false);
			console.error('Login error:', error?.message);
		}
	};

	const handleSignUpRedirect = () => {
		navigate('/student-signup'); // Navigate to the sign-up page
	};

	return (
		<div className="w-full h-full bg-white">
			<div className="flex w-full h-full">
				{/* Left Side */}
				<div className="hidden lg:flex lg:items-center rounded-r-3xl lg:justify-center h-full w-[50%] bg-gradient-to-br from-teal-600/60 via-teal-600/20 to-teal-600/60 border-r">
					<LoginImg />
				</div>

				{/* Right Side */}
				<div className="flex items-center justify-center h-full w-full lg:w-[50%] bg-white">
					<div className=" w-[60%] md:w-[50%] flex flex-col gap-8 items-center">
						{/* Header */}
						<div className="flex flex-col gap-3 items-center justify-center w-full">
							<p className="text-2xl font-semibold md:text-3xl text-headingPrimary">
								Login
							</p>
							<p className="text-md font-normal text-gray-400">
								Don't have an account?{' '}
								<span
									className="font-semibold text-primary hover:cursor-pointer hover:underline"
									onClick={handleSignUpRedirect}
								>
									Sign Up
								</span>
							</p>
						</div>
						{/* Form */}
						<form className="flex flex-col w-full gap-5" onSubmit={handleLogin}>
							{/* Register number Input */}
							<div className="flex flex-col w-full gap-2">
								<label
									className="text-base text-secondary md:text-md"
									htmlFor="registerNumber"
								>
									Register Number <span className="text-red-600">*</span>
								</label>
								<input
									type="text"
									id="registerNumber"
									minLength={4}
									maxLength={10}
									placeholder="Enter Register Number"
									value={registerNo}
									onChange={(e) => setRegisterNo(e.target.value)}
									className="w-full px-5 py-3 md:py-4 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-600"
									required
								/>
							</div>
							{/* Phone Input */}
							<div className="flex flex-col w-full gap-2">
								<label
									className="text-base text-secondary md:text-md"
									htmlFor="phone"
								>
									Phone Number <span className="text-red-600">*</span>
								</label>
								<input
									type="text"
									id="phone"
									minLength={10}
									maxLength={10}
									placeholder="Enter Phone Number"
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									className="w-full px-5 py-3 md:py-4 text-sm border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-1 focus:ring-teal-600"
									required
								/>
							</div>

							{/* Password Input */}
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

							{/* Error */}
							{error && <div className="text-red-600 text-sm">{error}</div>}

							{/* Submit Button */}
							<PrimaryButton
								type="submit"
								disabled={loading}
								icon={
									loading ? (
										<LoadingSpinner
											text="Loading..."
											className="text-white font-semibold"
										/>
									) : null
								}
								text={loading ? '' : 'Sign In'}
								className={`${error ? '' : 'mt-5'} w-full font-bold md:h-[3rem] md:max-h-[3rem] md:text-lg border border-transparent text-white rounded-full bg-gradient-to-br from-teal-700 to-teal-500 hover:from-teal-800 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600 ${
									loading ? 'opacity-50 cursor-not-allowed' : ''
								}`}
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudentLogin;
