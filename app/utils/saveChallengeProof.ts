import getBundlr from "./getBundlr";
import gasslessFundAndUpload from "./gasslessFundAndUpload";

interface ChallengeData {
	type: string;
	instructions: string;
	link: string;
	points: number;
	needsProof: boolean;
}

type Tag = {
	name: string;
	value: string;
};

const saveChallengeProof = async (challengeProof: string, challengeId: string) => {
	if (!challengeProof) challengeProof = "";
	console.log("saveChallengeProof challengeProof=", challengeProof);
	console.log("saveChallengeProof challengeId=", challengeId);
	const bundlr = await getBundlr();

	const tags: Tag[] = [
		{ name: "app-id", value: "community-portal" },
		{ name: "data-type", value: "weekly-challenge-proof" },
		{ name: "challengeId", value: challengeId },
		{ name: "proof", value: challengeProof },
	];

	const tagsString = JSON.stringify(tags) + challengeProof;
	const numBytes = new Blob([tagsString]).size;

	const price = await bundlr.getPrice(numBytes);
	const balance = await bundlr.getLoadedBalance();
	if (price.isGreaterThanOrEqualTo(balance)) {
		console.log("Funding node.");
		await bundlr.fund(price);
	} else {
		console.log("Funding not needed, balance sufficient.");
	}

	const tx = await bundlr.uploadWithReceipt(challengeProof, { tags });
	console.log("Challenge saved ", tx);
};
export default saveChallengeProof;
