"use client";

import React, { FC } from "react";

import { EditProfile } from "../components/EditProfile";
const Page: FC = () => {
	return (
		<div className="mx-auto py-10 bg-background text-text flex flex-col-reverse gap-10 md:flex-row justify-center items-center">
			<div className="p-10 w-full md:w-2/3 md:p-0">
				{/* <FundWithdraw /> */}
				{/* <FundWithdraw node="https://node1.bundlr.network" /> */}
				<EditProfile />
			</div>
		</div>
	);
};

export default Page;
