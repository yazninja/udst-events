export default defineEventHandler(async (event) => {
	const club = getRouterParam(event, 'club', { decode: true })
	console.log('Looking for club:', club)
	return [
		{ name: 'Astronomy Club', img: 'https://www.udst.edu.qa/sites/default/files/styles/d05_traditional/public/2024-09/dsc04322.webp' },
		{ name: 'Cybersecurity Club', img: 'https://www.udst.edu.qa/sites/default/files/styles/d05_traditional/public/2024-09/cybsec.webp' },
		{ name: 'English Debate Club', img: 'https://www.udst.edu.qa/sites/default/files/styles/d05_traditional/public/2024-10/dsc09465.webp' },
		{ name: 'Healing Hands', img: 'https://www.udst.edu.qa/sites/default/files/styles/d05_traditional/public/2024-10/healinghands.webp' },
		{ name: 'MUN (Model United Nations)', img: 'https://www.ivint.org/wp-content/uploads/2018/12/28827357_1790129171032990_5187772539109178120_o.jpg' },
		{ name: 'Paramedicine Society Club', img: 'https://www.udst.edu.qa/sites/default/files/styles/d05_traditional/public/2024-10/paramedicine_ah_9726_www.ahco_.productions.webp' },
		{ name: 'Toastmasters Club', img: 'https://www.udst.edu.qa/sites/default/files/styles/d05_traditional/public/2024-10/toast.webp' },
		{ name: 'Wolves Engineer Club', img: 'https://www.udst.edu.qa/sites/default/files/styles/d05_traditional/public/2024-10/dsc04267.webp' },
		{ name: 'Al-Quds Club', img: 'https://www.udst.edu.qa/sites/default/files/styles/d05_traditional/public/2024-09/dsc04709.webp' },
		{ name: 'Anime Club', img: 'https://www.udst.edu.qa/sites/default/files/styles/d05_traditional/public/2024-09/anime.webp' },
		{ name: 'Board Game Club', img: 'https://www.udst.edu.qa/sites/default/files/styles/d05_traditional/public/2024-09/dsc_1447.webp' },
		{ name: 'Deen Club', img: 'https://www.udst.edu.qa/sites/default/files/styles/d05_traditional/public/2024-09/dsc04412.webp' },
		{ name: 'Environment Club', img: 'https://www.udst.edu.qa/sites/default/files/styles/d05_traditional/public/2023-09/img_3929.webp' },
		{ name: 'Forever Friends Club', img: 'https://www.udst.edu.qa/sites/default/files/styles/d05_traditional/public/2024-10/dsc04286.webp' },
		{ name: 'PAWS Club', img: 'https://www.udst.edu.qa/sites/default/files/styles/d05_traditional/public/2024-10/dsc_1193.webp' },
		{ name: 'Qatar Student Association Club', img: 'https://www.udst.edu.qa/sites/default/files/styles/d05_traditional/public/2024-10/dsc_0718.webp' },
		{ name: 'Seoul Waves Club', img: 'https://wallpapercave.com/wp/wp1915186.jpg' },
		{ name: 'Volunteer Club', img: 'https://www.udst.edu.qa/sites/default/files/styles/d05_traditional/public/2024-10/volunteeeer.webp' },
		{ name: 'Art Club', img: 'https://www.udst.edu.qa/sites/default/files/styles/d05_traditional/public/2024-09/dsc_0496.webp' },
		{ name: 'Automotive Club', img: 'https://www.udst.edu.qa/sites/default/files/styles/d05_traditional/public/2024-09/dsc_0920.webp' },
		{ name: 'Boardgames Club', img: 'https://www.udst.edu.qa/sites/default/files/styles/d05_traditional/public/2024-09/dsc_1447.webp' },
		{ name: 'Cooking Club', img: 'https://www.udst.edu.qa/sites/default/files/styles/d05_traditional/public/2024-09/dsc_1405.webp' },
		{ name: 'Fashion Club', img: 'https://www.udst.edu.qa/sites/default/files/styles/d05_traditional/public/2024-10/dsc04866_0.webp' },
		{ name: 'Filmmaker Club', img: 'https://www.udst.edu.qa/sites/default/files/styles/d05_traditional/public/2024-10/dsc04828.webp' },
		{ name: 'F1 Club', img: 'https://www.udst.edu.qa/sites/default/files/styles/d05_traditional/public/2024-10/dsc_1318.webp' },
		{ name: 'Music Club', img: 'https://www.udst.edu.qa/sites/default/files/styles/d05_traditional/public/2024-10/dsc_1024.webp' },
		{ name: 'Photography Club', img: 'https://www.udst.edu.qa/sites/default/files/styles/d05_traditional/public/2024-10/dsc04316_0.webp' },
		{ name: 'Rhythm Club', img: 'https://www.udst.edu.qa/sites/default/files/styles/d05_traditional/public/2024-10/dsc_1024.webp' },
	].filter(c => c.name == club).map(c => c.img)[0] || null

})

