import { kv } from "@vercel/kv";
export default defineEventHandler(async (event) => {

	const date = new Date()
	const club = getRouterParam(event, 'club', { decode: true })
	const id = getQuery(event).id
	const body = await readBody(event)

	if (!id) {
		return { status: 400, body: 'Cannot Vote: Missing id' }
	} else if (!body.ratingDesign || !body.ratingEngage) {
		return { status: 400, body: 'Cannot Vote: Missing ratingDesign or ratingEngage' }
	}


	await $fetch<number>(`https://counter.ciderapp.workers.dev/increment?name=cf25w-${club}-design&stars=${body.ratingDesign}`);
	await $fetch<number>(`https://counter.ciderapp.workers.dev/increment?name=cf25w-${club}-design-voters&stars=1`);

	await $fetch<number>(`https://counter.ciderapp.workers.dev/increment?name=cf25w-${club}-engage&stars=${body.ratingEngage}`);
	await $fetch<number>(`https://counter.ciderapp.workers.dev/increment?name=cf25w-${club}-engage-voters&stars=1`);

	kv.sadd("cf25w-votes", JSON.stringify({
		date: date.toISOString(),
		id: id,
		contestant: club,
		ratingDesign: body.ratingDesign,
		ratingEngage: body.ratingEngage
	}));
	return true
})

