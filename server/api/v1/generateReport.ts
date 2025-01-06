import ExcelJS from 'exceljs';
import { kv } from '@vercel/kv';

type VoteType = {
	date: Date;
	id: string;
	contestant: string;
	ratingDesign: number;
	ratingEngage: number;
}

export default defineEventHandler(async event => {

	const allVotes = await kv.smembers<VoteType[]>('cf25w-votes');
	const categories = await $fetch<any>('/api/v1/getAllClubs');
	const criteria = ['Design', 'Engage'];

	const workbook = new ExcelJS.Workbook();
	workbook.creator = 'Yazninja (thru Program)';
	workbook.created = new Date();

	let voteTallies: any = {
		'Design': { data: JSON.parse(JSON.stringify(categories)) },
		'Engage': { data: JSON.parse(JSON.stringify(categories)) }
	}

	for (const vote of allVotes) {
		voteTallies['Design'].data = voteTallies['Design'].data.map((category: { clubs: { name: string; }[] }) => {
			category.clubs = category.clubs.map((club: { name: string; }) => {
				if (club.name === vote.contestant) {
					club.value = (club.value || 0) + vote.ratingDesign;
					club.voters = (club.voters || 0) + 1;
				}
				return club;
			});
			return category;
		});
		voteTallies['Engage'].data = voteTallies['Engage'].data.map((category: { clubs: { name: string; }[] }) => {
			category.clubs = category.clubs.map((club: { name: string; }) => {
				if (club.name === vote.contestant) {
					club.value = (club.value || 0) + vote.ratingEngage;
					club.voters = (club.voters || 0) + 1;
				}
				return club;
			});
			return category;
		});
	}

	// console.log(JSON.stringify(voteTallies, null, 2));

	// const workbook = new ExcelJS.Workbook();
	// workbook.creator = 'Yazninja (thru Program)'
	// workbook.created = new Date();
	for (const key of Object.keys(voteTallies)) {
		for (const category of voteTallies[key].data) {
			const sheet = workbook.addWorksheet(`${key} - ` + category.name.replace('and', '&').split(' ').map((word: string) => word.charAt(0)).join(''));
			sheet.columns = [
				{ header: 'Club Name', key: 'name', width: 32 },
				{ header: 'Votes', key: 'value', width: 12 },
				{ header: 'Voters', key: 'voters', width: 12 }
			];
			const cc = category.clubs.sort((a: { value: number; }, b: { value: number; }) => (b.value || 0) - (a.value || 0));
			sheet.addRows(cc);
		}
	}
	console.log('KEYSSS::',);




	// const res = await $fetch<any>('https://counter.ciderapp.workers.dev/allClubs?name=*');
	// const data = new Map<string, { points: number, voters: number }>(Object.entries(res));
	// const categories = await $fetch<any>('/api/v1/getAllClubs');




	// for (const category of categories) {
	// 	const sheet = workbook.addWorksheet(`Winners - ` + category.name.replace('and', '&').split(' ').map((word: string) => word.charAt(0)).join(''));
	// 	sheet.columns = [
	// 		{ header: 'Club Name', key: 'name', width: 32 },
	// 		{ header: 'Votes', key: 'votes', width: 32 },
	// 		{ header: 'Total Voters', key: 'voters', width: 32 }
	// 	];
	// 	const cc = category.clubs.map((club: { name: string; }) => {
	// 		return {
	// 			name: club.name,
	// 			votes: data.get(club.name)?.points || 0,
	// 			voters: data.get(club.name)?.voters || 0
	// 		};
	// 	})
	// 	cc.sort((a: { votes: number; }, b: { votes: number; }) => b.votes - a.votes);
	// 	sheet.addRows(cc);
	// }

	// const votes = workbook.addWorksheet('Votes');

	// votes.columns = [
	// 	{ header: 'Date', key: 'date', width: 64 },
	// 	{ header: 'ID', key: 'id', width: 28 },
	// 	{ header: 'Club Name', key: 'contestant', width: 32 },
	// 	{ header: 'Rating Design', key: 'ratingDesign', width: 12 },
	// 	{ header: 'Rating Engage', key: 'ratingEngage', width: 12 }
	// ];
	// let votesData: { id: string, contestant: string, stars: number }[] = await kv.smembers('cf25w-votes');
	// votesData = votesData.sort((a, b) => {
	// 	return a.id.localeCompare(b.id);
	// });
	// votes.addRows(votesData);
	const buffer = await workbook.xlsx.writeBuffer();
	return new Response(buffer, {
		headers: {
			'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			'Content-Disposition': 'attachment; filename="report.xlsx"'
		}
	});
});