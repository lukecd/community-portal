"use client";
import React, { useState, useEffect } from "react";
import getLeaderboard from "../utils/getLeaderboard";
type LeaderboardEntry = {
	wallet: string;
	points: number;
};

const Leaderboard = () => {
	const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);

	useEffect(() => {
		async function fetchData() {
			const data = await getLeaderboard();
			setLeaderboardData(data);
		}
		fetchData();
	}, []);

	return (
		<div className="bg-background p-5 rounded-lg shadow-lg">
			<h1 className="font-fkDisplay text-2xl mb-5 text-text">
				Top 10 Wallets as of {new Date().toLocaleDateString()}
			</h1>
			<table className="w-full border-collapse">
				<thead>
					<tr className="bg-background-contrast text-white">
						<th className="font-robotoMono p-3 border-b border-primary">Wallet Address</th>
						<th className="font-robotoMono p-3 border-b border-primary">Points</th>
					</tr>
				</thead>
				<tbody>
					{leaderboardData.map((entry, index) => (
						<tr key={index} className={index % 2 === 0 ? "bg-primary" : "bg-secondary"}>
							<td className="font-robotoMono p-3 border-b border-primary text-text">{entry.wallet}</td>
							<td className="font-robotoMono p-3 border-b border-primary text-text">{entry.points}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}; // Leaderboard

export default Leaderboard;
