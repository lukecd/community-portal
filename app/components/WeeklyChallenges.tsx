"use client";

import React, { useState, useEffect } from "react";
import getThisWeeksChallenges from "../utils/getThisWeeksChallenges";
import saveChallengeProof from "../utils/saveChallengeProof";
import Spinner from "./Spinner";

interface Challenge {
	id: string;
	type: string;
	instructions: string;
	link: string;
	points: number;
	needsProof: boolean;
}

const WeeklyChallenges: React.FC = () => {
	const [challenges, setChallenges] = useState<Challenge[]>([]);
	const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>({});
	const [isLoading, setIsLoading] = useState(true);
	const [proofs, setProofs] = useState<{ [key: string]: string }>({});
	const [txActive, setTxActive] = useState<string | null>(null);
	const [message, setMessage] = useState<string | null>("");

	useEffect(() => {
		const fetchChallenges = async () => {
			const data = await getThisWeeksChallenges();

			const processedData = data.map((challenge: Challenge) => {
				const needsProofBoolean =
					typeof challenge.needsProof === "string" ? challenge.needsProof === "true" : challenge.needsProof;
				return {
					...challenge,
					needsProof: needsProofBoolean,
				};
			});

			setChallenges(processedData);
			setIsLoading(false);
		};

		fetchChallenges();
	}, []);

	const submitChallenge = async (challengeId: string) => {
		setTxActive(challengeId);
		const challengeProof = proofs[challengeId];
		await saveChallengeProof(challengeProof, challengeId);
		setTxActive(null);
		setMessage("Proof submited");
	};

	return (
		<div className="bg-white rounded-lg p-5 border w-full shadow-xl">
			{isLoading ? (
				<div className="bg-gray-700 py-5 flex justify-center">
					<Spinner />
				</div>
			) : (
				<>
					<h2 className="text-text text-3xl font-fkDisplay mb-4">This Week's Challenges</h2>
					<h2 className="text-red-500 text-xl font-fkDisplay mb-4">{message}</h2>

					<div className="flex flex-col w-full">
						{challenges.map((challenge, index) => (
							<div key={index} className="flex flex-col mb-3">
								<div className="flex justify-between items-center">
									<a
										href={challenge.link}
										target="_blank"
										rel="noopener noreferrer"
										className="text-text hover:underline flex-1 py-2"
									>
										{challenge.instructions}
									</a>
									{challenge.needsProof ? (
										<button
											onClick={() => toggleRowExpansion(index)}
											className="bg-secondary text-text px-4 py-2 rounded-lg ml-4"
										>
											Add proof
										</button>
									) : (
										<button
											onClick={() => submitChallenge(challenge.id)}
											className="bg-secondary text-text px-4 py-2 rounded-lg ml-4"
										>
											{txActive === challenge.id ? <Spinner /> : "Submit"}
										</button>
									)}
								</div>
								{expandedRows[index] && challenge.needsProof && (
									<div className="flex items-center mt-2">
										<input
											type="text"
											placeholder="Enter proof..."
											className="border px-4 py-2 rounded-lg flex-1 mr-2"
											value={proofs[challenge.id] || ""}
											onChange={(e) => setProofs({ ...proofs, [challenge.id]: e.target.value })}
										/>
										<button
											className="bg-secondary text-text px-4 py-2 rounded-lg"
											onClick={() => submitChallenge(challenge.id)}
										>
											{txActive === challenge.id ? <Spinner /> : "Submit"}
										</button>
									</div>
								)}
							</div>
						))}
					</div>
				</>
			)}
		</div>
	); // WeeklyChallenges
};

export default WeeklyChallenges;
