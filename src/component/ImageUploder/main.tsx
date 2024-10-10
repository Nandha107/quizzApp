import React from 'react';
import { BsLink, BsX } from 'react-icons/bs';

interface ImageUploaderProps {
	imageUrl: string | null;
	handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
	handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
	handleDragLeave: () => void;
	handleRemoveImage: () => void; // New prop for removing the image
	dragging: boolean;
	loading: boolean;
	uploaded: boolean;
	handleUpdateImage: (e: React.ChangeEvent<HTMLInputElement>) => void; // New prop for updating the image
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
	imageUrl,
	handleImageChange,
	handleDrop,
	handleDragOver,
	handleDragLeave,
	handleRemoveImage,
	dragging,
	loading,
	uploaded,
	handleUpdateImage,
}) => {
	return (
		<div
			className={`border-2 border-dashed ${
				dragging ? 'border-teal-500' : 'border-gray-300'
			} p-8 rounded-lg flex flex-col gap-4 text-center w-full md:w-[80%] lg:w-[70%]`}
			onDrop={handleDrop}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
		>
			{/* Conditionally render upload instructions or preview image */}
			{!uploaded ? (
				<div className="flex flex-col items-center gap-2">
					<img
						src={imageUrl || ''} // Use empty string if imageUrl is undefined
						alt="Preview"
						className={`h-40 w-40 object-cover rounded ${loading ? 'animate-pulse' : ''}`}
					/>
					<div className="flex flex-col items-center gap-2">
						<p className="text-gray-700">Drag & Drop image here</p>
						<p className="text-gray-700 text-lg">or</p>
					</div>
				</div>
			) : imageUrl ? (
				<div className="flex flex-col items-center gap-2">
					<div className="relative w-[100%] h-[250px] bg-gray-600/10 rounded-lg border border-gray-300">
						<img
							src={imageUrl}
							alt="Preview"
							className={`absolute inset-0 w-full h-full object-contain rounded ${loading ? 'animate-pulse' : ''}`}
						/>
					</div>
					<div className="flex justify-center gap-2 mt-2">
						<button
							type='button'
							onClick={handleRemoveImage}
							className="bg-red-600 text-white py-1 px-3 rounded flex items-center gap-1"
						>
							<BsX className="h-5 w-5" /> Remove Image
						</button>
						<label className="bg-teal-600 text-white py-2 px-7 rounded cursor-pointer inline-block">
							<span className="flex items-center gap-2">
								<BsLink className="h-5 w-5" /> update image
							</span>
							<input
								type="file"
								className="hidden"
								accept=".png, .jpeg, .jpg"
								onChange={handleUpdateImage}
							/>
						</label>
					</div>
				</div>
			) : (
				<div className="flex flex-col items-center gap-2">
					<p className="text-gray-700">Drag & Drop image here</p>
					<p className="text-gray-700">or</p>
				</div>
			)}

			{uploaded ? null : (
				<div>
					<label className="bg-teal-600 text-white py-2 px-7 rounded cursor-pointer inline-block">
						<span className="flex items-center gap-2">
							<BsLink className="h-5 w-5" /> Choose file
						</span>
						<input
							type="file"
							className="hidden"
							accept=".png, .jpeg, .jpg"
							onChange={handleImageChange}
						/>
					</label>
				</div>
			)}

			<p className="text-gray-900 mt-4">Supported formats: PNG, JPEG, JPG, up to 1 MB</p>
		</div>
	);
};

export default ImageUploader;
