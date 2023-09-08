import React, { FC, useState } from "react";

import WeeklyChallenges from "../components/WeeklyChallenges";
const Page: FC = () => {
	return (
		<div className="mx-auto py-10 bg-background text-text flex flex-col-reverse gap-10 md:flex-row justify-center items-start">
			<div className="p-10 w-full md:w-2/3 md:p-0">
				<WeeklyChallenges />
			</div>
		</div>
	);
};

export default Page;
