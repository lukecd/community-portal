function getStartAndEndOfWeek(date: Date) {
	const startOfWeek = new Date(date);
	startOfWeek.setDate(date.getDate() - (date.getDay() === 0 ? 6 : date.getDay() - 1)); // Adjust for Monday
	startOfWeek.setHours(0, 0, 0, 0);

	const endOfWeek = new Date(startOfWeek);
	endOfWeek.setDate(startOfWeek.getDate() + 6); // Sunday
	endOfWeek.setHours(23, 59, 59, 999);

	return { start: startOfWeek, end: endOfWeek };
}
const getThisWeeksChallenges = async () => {
	const endpoint = "https://devnet.bundlr.network/graphql";

	const { start, end } = getStartAndEndOfWeek(new Date());

	const query = {
		query: `
        query getWeeklyChallenge {
          transactions(
            tags: [
              { name: "app-id", values: ["community-portal"] }
              { name: "data-type", values: ["weekly-challenge"] }
            ]
            timestamp: { from: ${start.getTime()}, to: ${end.getTime()} }
          ) {
            edges {
              node {
                id
                tags {
                  name
                  value
                }
              }
            }
          }
        }
        `,
	};

	const response = await fetch(endpoint, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(query),
	});

	const data = await response.json();

	const challenges = data.data.transactions.edges
		.map((edge: any) => {
			const tags: { [key: string]: string } = {};
			edge.node.tags.forEach((tag: { name: string; value: string }) => {
				tags[tag.name] = tag.value;
			});

			return {
				id: edge.node.id, // Add the id value here
				...tags,
			};
		})
		.filter((item) => {
			// Ensure all required tags are present
			const { type, instructions, link, points, needsProof } = item;
			return type && instructions && link && points && needsProof;
		})
		.map((item) => ({
			id: item.id, // Include the id value in the final mapping
			type: item.type,
			instructions: item.instructions,
			link: item.link,
			points: parseInt(item.points, 10),
			needsProof: item.needsProof,
		}));

	return challenges;
};

export default getThisWeeksChallenges;
