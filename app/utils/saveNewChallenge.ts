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

const saveNewChallenge = async (data: ChallengeData) => {
	const bundlr = await getBundlr();

	console.log("request to save ", JSON.stringify(data));

	const tags: Tag[] = [
		{ name: "app-id", value: "community-portal" },
		{ name: "data-type", value: "weekly-challenge" },
		{ name: "type", value: data.type },
		{ name: "instructions", value: data.instructions },
		{ name: "link", value: data.link },
		{ name: "points", value: data.points.toString() },
		{ name: "needsProof", value: String(data.needsProof) },
	];
	const tagsString = JSON.stringify(tags) + "new challenge proof";
	const numBytes = new Blob([tagsString]).size;

	const price = await bundlr.getPrice(numBytes);
	const balance = await bundlr.getLoadedBalance();
	if (price.isGreaterThanOrEqualTo(balance)) {
		console.log("Funding node.");
		await bundlr.fund(price);
	} else {
		console.log("Funding not needed, balance sufficient.");
	}
	const tx = await bundlr.uploadWithReceipt("new challenge proof", { tags });
	console.log("Challenge saved ", tx);
};
export default saveNewChallenge;
