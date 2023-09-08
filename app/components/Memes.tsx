"use client";

import React from "react";

interface MemeProps {
	imageUrl: string;
}

const Meme: React.FC<MemeProps> = ({ imageUrl }) => {
	const shareOnTwitter = (image: string) => {
		const baseURL = "https://twitter.com/intent/tweet";
		const text = encodeURIComponent("Check out this meme!");
		const url = `${baseURL}?text=${text}&url=${window.location.origin}/${image}`;
		window.open(url, "_blank");
	};

	return (
		<div className="bg-white p-2 rounded-lg shadow-sm inline-block m-2 w-64 h-80">
			<div
				className="h-56 w-full bg-center bg-cover rounded-t-lg"
				style={{ backgroundImage: `url(${imageUrl})` }}
			></div>
			<button
				className="bg-secondary text-text rounded-b-lg w-full py-2 mt-4"
				onClick={() => shareOnTwitter(imageUrl)}
			>
				Share On X
			</button>
		</div>
	);
}; // Meme

const Memes: React.FC = () => {
	const memeImages = ["jack.jpeg", "KOALA.jpeg", "strong-proveanance.jpeg", "waldo.jpeg"];

	return (
		<div className="flex flex-col items-center">
			<h1 className="text-text font-fkDisplay mb-4 w-full text-center">Share memes to earn points</h1>
			<div className="flex flex-row flex-wrap justify-center gap-4 w-full max-w-4xl">
				{memeImages.map((image, index) => (
					<Meme key={index} imageUrl={image} />
				))}
			</div>
		</div>
	);
}; // Memes

export { Meme, Memes };
