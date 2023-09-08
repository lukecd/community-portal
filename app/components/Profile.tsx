import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import nftABI from "./nftABI.json";

const Profile: React.FC = () => {
	const [connected, setConnected] = useState<boolean>(false);
	const [hasNFT, setHasNFT] = useState<boolean>(false);
	const contractAddress = "0xBA620A7260CEdf3076390850a70cC1CbC411444f";

	const [nftData, setNftData] = useState<{
		image: string;
		name: string;
		description: string;
		tokenId: string;
	} | null>(null);

	useEffect(() => {
		const checkConnection = async () => {
			//@ts-ignore
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const accounts = await provider.listAccounts();
			setConnected(accounts && accounts.length > 0);
		};

		checkConnection();
	}, []);

	useEffect(() => {
		const checkHasNFT = async () => {
			await checkNFTOwnership();
		};
		if (connected) checkHasNFT();
	}, [connected]);

	const checkNFTOwnership = async () => {
		try {
			//@ts-ignore
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(contractAddress, nftABI, signer);
			const balance = await contract.balanceOf(signer.getAddress());
			console.log("balance=", balance.toString());
			if (balance.toString === "0") {
				setHasNFT(false);
				return;
			}
			const tokenId = await contract.getTokenId(signer.getAddress());
			const tokenUri = await contract.tokenURI(tokenId);
			const metaData = await fetch(tokenUri).then((response) => response.json());
			metaData.tokenId = parseInt(tokenId.toString()) + 1;
			console.log("metadata ", metaData);
			setHasNFT(true);
			setNftData(metaData);
		} catch (e) {
			setHasNFT(false);
		}
	};

	const mintNFT = async () => {
		try {
			//@ts-ignore
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(contractAddress, nftABI, signer);

			// Call safeMint function (Assuming the minting function requires the address of the minter)
			await contract.safeMint(signer.getAddress());

			// Optionally, after minting, you can refresh the NFT ownership status
			await checkNFTOwnership();
		} catch (error) {
			console.error("Failed to mint NFT:", error);
		}
	};

	const handleConnect = async () => {
		try {
			//@ts-ignore
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			await provider.send("eth_requestAccounts", []);
			setConnected(true);
		} catch (error) {
			console.error("Failed to connect:", error);
		}
	};

	return (
		<div className="flex justify-center items-center">
			{connected ? (
				hasNFT ? (
					<div className="relative bg-white p-4 m-4 transform -rotate-1 rounded shadow-lg max-w-xs w-full">
						<img className="w-full rounded mb-3" src={nftData?.image} alt={nftData?.name} />
						<h3 className="font-bold text-lg mb-1">{nftData?.name}</h3>
						<p className="text-sm mb-1">{nftData?.description}</p>
						<p className="text-xs text-gray-600">NFT#: {nftData?.tokenId}</p>
					</div>
				) : (
					<>
						<button className="bg-green-600 text-white px-4 py-2 rounded" onClick={mintNFT}>
							Mint NFT
						</button>
					</>
				)
			) : (
				<button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleConnect}>
					Connect Wallet
				</button>
			)}
		</div>
	); // Profile
};

export default Profile;
