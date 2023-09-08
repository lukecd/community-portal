"use client";

import Image from "next/image";
import Profile from "./components/Profile";
export default function Home() {
	return (
		<div className="py-10 bg-background text-text flex flex-col justify-center items-center p-8">
			<Profile />
		</div>
	); // Home
}
