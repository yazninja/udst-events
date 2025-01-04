<template>
	<UContainer>
		<div
			class="text-3xl sm:text-4xl mt-10 text-pretty font-black py-4 border-b border-[var(--ui-border-muted)] justify-between flex">
			Clubfest 2025
			<UChip color="success">
				<UButton icon="i-lucide-user" size="xl" color="primary" variant="solid" />
			</UChip>
		</div>

		<div v-for="category in clubData" :key="category.name" class="my-10">
			<h1 class="text-xl font-bold">{{ category.name }}</h1>
			<Carousel v-bind="carouselConfig">
				<Slide v-for="club in category.clubs" :key="club.name">
					<UContextMenu :items="makeContextMenuItems(category.name, club.name)"
						class="flex flex-col items-center">
						<NuxtLink :to="`/clubfest2025/${category.name}/${club.name}/vote`"
							class="flex flex-col items-start">
							<img :src="club.img" alt="club image" class=" object-cover h-[80%] rounded-lg">
							<h2>{{ club.name }}</h2>
						</NuxtLink>
					</UContextMenu>

				</Slide>
				<template #addons>
					<Navigation />
				</template>
			</Carousel>
		</div>
		<FooterFC />
	</UContainer>
</template>
<script setup lang="ts">
import 'vue3-carousel/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
const { data: clubData } = await useFetch('/api/v1/getAllClubs');

const carouselConfig = {

	snapAlign: 'center',
	breakpointMode: 'carousel',
	breakpoints: {
		// 300px and up
		300: {
			itemsToShow: 2,
			snapAlign: 'center',
			autoplay: 5000,
			pauseAutoPlayOnHover: true,
		},
		// 400px and up
		400: {
			itemsToShow: 3,
			snapAlign: 'center',
			autoplay: 3000,
			pauseAutoPlayOnHover: true,
		},
		// 500px and up
		500: {
			itemsToShow: 4.5,
			snapAlign: 'center',
			autoplay: 2000,
			pauseAutoPlayOnHover: true,

		},
	},

	wrapAround: true
}

const makeContextMenuItems = (category: string, club: string) => {
	return [
		{
			label: 'Vote',
			icon: 'i-lucide-star',
			onSelect: () => {
				navigateTo(`/clubfest2025/${category}/${club}/vote`);
			}

		}, {
			label: 'Register',
			icon: 'i-lucide-user',
			onSelect: () => {
				navigateTo(`/clubfest2025/${category}/${club}/register`);
			}
		}, {
			label: 'Show QR Code',
			icon: 'i-lucide-eye',
			onSelect: () => {
				navigateTo(`/clubfest2025/${category}/${club}/qrcode`);
			}
		}
	]
}
</script>