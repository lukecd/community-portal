"use client";

import React, { useState } from "react";
import saveNewChallenge from "../utils/saveNewChallenge";
import Spinner from "./Spinner";
import { SP } from "next/dist/shared/lib/utils";

interface ChallengeData {
	type: string;
	instructions: string;
	link: string;
	points: number;
	needsProof: boolean;
}

const AddChallenge: React.FC = () => {
	const [challengeType, setChallengeType] = useState<string>("Profile");
	const [instructions, setInstructions] = useState<string>("");
	const [needsProof, setNeedsProof] = useState<boolean>(true);
	const [link, setLink] = useState<string>("");
	const [points, setPoints] = useState<number>(0);
	const [txActive, setTxActive] = useState<boolean>(false);
	const [message, setMessage] = useState<string | null>("");

	const handleSave = async () => {
		setTxActive(true);
		const challengeData: ChallengeData = {
			type: challengeType,
			instructions: instructions,
			link: link,
			points: points,
			needsProof: needsProof,
		};

		await saveNewChallenge(challengeData);
		setTxActive(false);
	};

	return (
		<div className="flex flex-col bg-white p-5 rounded-lg shadow-xl">
			<label className="text-center text-xl mb-4">Add new challenge (admin):</label>
			<div className="flex justify-between mb-4">
				<div className="mr-2 w-1/3">
					<label className="block text-gray-700 mb-2">Type:</label>
					<select
						value={challengeType}
						onChange={(e) => setChallengeType(e.target.value)}
						className="border p-2 rounded-md w-full"
					>
						<option value="profile">Profile</option>
						<option value="meme">Meme</option>
						<option value="github">Github</option>
						<option value="x">X</option>
						<option value="quest">Quest</option>
					</select>
				</div>
				<div className="mx-2 w-1/3">
					<label className="block text-gray-700 mb-2">Points:</label>
					<input
						type="number"
						value={points}
						onChange={(e) => setPoints(Number(e.target.value))}
						className="border p-2 rounded-md w-full"
					/>
				</div>
				<div className="ml-2 w-1/3">
					<label className="block text-gray-700 mb-2">Needs proof:</label>
					<select
						value={needsProof.toString()}
						onChange={(e) => setNeedsProof(e.target.value === "true")}
						className="border p-2 rounded-md w-full"
					>
						<option value="true">True</option>
						<option value="false">False</option>
					</select>
				</div>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 mb-2">Instructions:</label>
				<input
					type="text"
					value={instructions}
					onChange={(e) => setInstructions(e.target.value)}
					className="border p-2 rounded-md w-full"
				/>
			</div>
			<div className="mb-4">
				<label className="block text-gray-700 mb-2">Link:</label>
				<input
					type="text"
					value={link}
					onChange={(e) => setLink(e.target.value)}
					className="border p-2 rounded-md w-full"
				/>
			</div>

			<button onClick={handleSave} className="bg-blue-500 text-white rounded-md p-3 w-full text-center">
				{txActive && (
					<div className="flex justify-center items-center">
						<Spinner />
					</div>
				)}
				{!txActive && "Save"}
			</button>
		</div>
	);
}; // AddChallenge

export default AddChallenge;
