import ExcelJS from 'exceljs';
import { kv } from '@vercel/kv';
export default defineEventHandler(async event => {
	const res = await $fetch<any>('https://counter.ciderapp.workers.dev/allClubs?club=*');
	const data = new Map<string, { points: number, voters: number }>(Object.entries(res));
	const categories = await $fetch<any>('/api/v1/getAllClubs');

	const workbook = new ExcelJS.Workbook();
	workbook.creator = 'Yazninja (thru Program)'
	workbook.created = new Date();


	for (const category of categories) {
		const sheet = workbook.addWorksheet(`Winners - ` + category.name.replace('and', '&').split(' ').map((word: string) => word.charAt(0)).join(''));
		sheet.columns = [
			{ header: 'Club Name', key: 'name', width: 32 },
			{ header: 'Votes', key: 'votes', width: 32 },
			{ header: 'Total Voters', key: 'voters', width: 32 }
		];
		const cc = category.clubs.map((club: { name: string; }) => {
			return {
				name: club.name,
				votes: data.get(club.name)?.points || 0,
				voters: data.get(club.name)?.voters || 0
			};
		})
		cc.sort((a: { votes: number; }, b: { votes: number; }) => b.votes - a.votes);
		sheet.addRows(cc);
	}

	const votes = workbook.addWorksheet('Votes');

	votes.columns = [
		{ header: 'Date', key: 'date', width: 64 },
		{ header: 'ID', key: 'id', width: 28 },
		{ header: 'Club Name', key: 'contestant', width: 32 },
		{ header: 'Rating Design', key: 'ratingDesign', width: 12 },
		{ header: 'Rating Engage', key: 'ratingEngage', width: 12 }
	];
	let votesData: { id: string, contestant: string, stars: number }[] = await kv.smembers('cf25w-votes');
	votesData = votesData.sort((a, b) => {
		return a.id.localeCompare(b.id);
	});
	votes.addRows(votesData);
	const buffer = await workbook.xlsx.writeBuffer();
	return new Response(buffer, {
		headers: {
			'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			'Content-Disposition': 'attachment; filename="report.xlsx"'
		}
	});
});