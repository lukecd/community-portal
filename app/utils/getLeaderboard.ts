import data from "./leaderboardData.json";

interface LeaderboardEntry {
	wallet: string;
	points: number;
}

const getLeaderboard = (): LeaderboardEntry[] => {
	return data.sort((a, b) => b.points - a.points).slice(0, 10);
};

export default getLeaderboard;
