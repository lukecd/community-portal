import "./globals.css";
import "@fontsource/roboto-mono";
import "@fontsource/roboto-mono/600.css";
import "@fontsource/roboto-mono/700.css";

import { Inter, Roboto } from "next/font/google";

import type { Metadata } from "next";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
	title: "Community portal",
	description: "Join and jam",
};

const roboto = Roboto({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
});

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${roboto.className} bg-background relative`}>
			<body className={roboto.className}>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
