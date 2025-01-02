import { kv } from "@vercel/kv";
export default defineEventHandler(async (event) => {

	const date = new Date()
	const club = getRouterParam(event, 'club', { decode: true })
	const stars = getQuery(event).stars
	const id = getQuery(event).id

	if (!id) {
		return { status: 400, body: 'Cannot Vote: Missing id' }
	}

	await $fetch<number>(`https://counter.ciderapp.workers.dev/increment?name=cf25w-${club}&stars=${stars}`);
	await $fetch<number>(`https://counter.ciderapp.workers.dev/increment?name=cf25w-${club}-voters&stars=1`);

	kv.sadd("cf25w-votes", JSON.stringify({ date: date.toISOString(), id: id, contestant: club, stars: stars }));
	return true
})

