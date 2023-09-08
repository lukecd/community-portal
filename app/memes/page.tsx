import React, { FC } from "react";

import { Memes } from "../components/Memes";
const Page: FC = () => {
	return (
		<div className="mx-auto py-10 bg-background text-text flex flex-col-reverse gap-10 md:flex-row justify-center items-start">
			<div className="p-10 w-full md:w-5/6 md:p-0">
				<Memes />{" "}
			</div>
		</div>
	);
};

export default Page;
