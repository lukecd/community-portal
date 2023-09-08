"use client";

import { useState } from "react";

interface EditProfileProps {
	initialName?: string;
	initialEmail?: string;
	initialTelegram?: string;
	initialDiscord?: string;
	initialTwitter?: string;
	initialGithub?: string;
}

export const EditProfile: React.FC<EditProfileProps> = ({
	initialName = "",
	initialEmail = "",
	initialTelegram = "",
	initialDiscord = "",
	initialTwitter = "",
	initialGitHub = "",
}) => {
	const [name, setName] = useState<string>(initialName);
	const [email, setEmail] = useState<string>(initialEmail);
	const [telegram, setTelegram] = useState<string>(initialTelegram);
	const [discord, setDiscord] = useState<string>(initialDiscord);
	const [twitter, setTwitter] = useState<string>(initialTwitter);
	const [gitHub, setGitHub] = useState<string>(initialGitHub);

	const [message, setMessage] = useState<string>("");

	const walletAddress = "0xBcb812C6e26F4F0F78Bd7B6222461FF24F2942AE";

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
	const handleTelegramChange = (e: React.ChangeEvent<HTMLInputElement>) => setTelegram(e.target.value);
	const handleDiscordChange = (e: React.ChangeEvent<HTMLInputElement>) => setDiscord(e.target.value);
	const handleTwitterChange = (e: React.ChangeEvent<HTMLInputElement>) => setTwitter(e.target.value);
	const handleGitHubChange = (e: React.ChangeEvent<HTMLInputElement>) => setGitHub(e.target.value);

	const handleSave = () => {
		// Implement the logic to save/update the profile.
		setMessage("Profile updated successfully!");
	};

	return (
		<div className="bg-white rounded-lg p-5 border w-full shadow-xl">
			<div className="mb-4">
				<label className="block text-gray-700">Wallet Address:</label>
				<span className="block p-3 bg-gray-100 rounded-md">{walletAddress}</span>
			</div>
			<input
				type="text"
				className="block w-full mb-4 bg-transparent text-text rounded-md p-3 border border-gray-300 shadow-sm"
				value={name}
				onChange={handleNameChange}
				placeholder="Name"
			/>
			<input
				type="email"
				className="block w-full mb-4 bg-transparent text-text rounded-md p-3 border border-gray-300 shadow-sm"
				value={email}
				onChange={handleEmailChange}
				placeholder="Email Address"
			/>
			<input
				type="text"
				className="block w-full mb-4 bg-transparent text-text rounded-md p-3 border border-gray-300 shadow-sm"
				value={telegram}
				onChange={handleTelegramChange}
				placeholder="Telegram"
			/>
			<input
				type="text"
				className="block w-full mb-4 bg-transparent text-text rounded-md p-3 border border-gray-300 shadow-sm"
				value={discord}
				onChange={handleDiscordChange}
				placeholder="Discord"
			/>
			<input
				type="text"
				className="block w-full mb-4 bg-transparent text-text rounded-md p-3 border border-gray-300 shadow-sm"
				value={twitter}
				onChange={handleTwitterChange}
				placeholder="Twitter"
			/>
			<input
				type="text"
				className="block w-full mb-4 bg-transparent text-text rounded-md p-3 border border-gray-300 shadow-sm"
				value={gitHub}
				onChange={handleGitHubChange}
				placeholder="Github"
			/>
			{message && <div className="text-green-500 mb-4">{message}</div>}
			<button onClick={handleSave} className="bg-blue-500 text-white rounded-md p-3">
				Save
			</button>
		</div>
	);
}; // EditProfile
