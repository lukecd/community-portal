import React, { FC } from "react";

import Leaderboard from "../components/Leaderboard";
const Page: FC = () => {
	return (
		<div className="py-10 bg-background text-text flex justify-center items-start">
			<Leaderboard />
		</div>
	);
};

export default Page;
