<template>
	<UContainer>
		<div
			class="text-3xl sm:text-4xl mt-10 text-pretty font-black py-4 border-b border-[var(--ui-border-muted)] justify-between flex">
			Clubs Festival
			<UChip :color="voterID ? 'success' : 'error'">
				<UButton icon="i-lucide-user" size="xl" color="neutral" variant="solid" to="/login-student"
					:disabled="voterID != undefined" />
			</UChip>
		</div>
		<UInput v-model="search" placeholder="Search..." class="mt-5 w-full" icon="i-lucide-search" highlight
			variant="soft" @update:model-value="searchFunc()" />
		<UAccordion v-model="accordionShii" type="multiple" :items="clubData" class="mt-10">
			<template #body="{ item }">
				<div class="flex flex-col items-center justify-center gap-5">
					<template v-for="club in item.clubs" :key="club.name">
						<NuxtLink
							:to="`/clubfest2025/${encodeURIComponent(item.name)}/${encodeURIComponent(club.name)}/vote`"
							class="relative h-16 max-w-screen-sm w-full flex flex-col items-center justify-center">
							<img :src="club.img" alt="club image"
								class="object-cover h-16 max-w-screen-sm w-full rounded-lg brightness-30">
							<h2 class="absolute text-xl font-bold text-white">{{ club.name }}</h2>
						</NuxtLink>

					</template>
				</div>
			</template>
		</UAccordion>
		<FooterFC />
	</UContainer>
</template>
<script setup lang="ts">
import 'vue3-carousel/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';
const { data: clubData } = await useFetch('/api/v1/getAllClubs');
clubData.value = clubData.value?.map((category: any) => {
	category.label = category.name;
	category.clubs = category.clubs.map((club: any) => {
		club.label = club.name;
		return club;
	});
	return category;
});
const clubDataBackup = JSON.parse(JSON.stringify(clubData.value));
const accordionShii = ref([]);
const search = ref('');

function searchFunc() {
	const searchValue = search.value.toLowerCase();
	clubData.value = clubData.value?.map((category: any) => {
		category.clubs = category.clubs.filter((club: any) => {
			return club.name.toLowerCase().includes(searchValue);
		});
		return category;
	});

	accordionShii.value = ['0', '1', '2'];
	if (searchValue === '') {
		clubData.value = JSON.parse(JSON.stringify(clubDataBackup));
		accordionShii.value = [];
	}
}

const voterID = useCookie('voterId', {
	expires: new Date(Date.now() + 86400000),
});
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
<style lang="scss">
:root {
	--carousel-transition: 300ms;
	--carousel-opacity-inactive: 0.1;
	--carousel-opacity-active: 1;
	--carousel-opacity-near: 0.3;
	--vc-nav-color: var(--ui-text-primary);
}

.carousel__viewport {
	perspective: 500px;
}

.carousel__track {
	transform-style: preserve-3d;
}

.carousel__slide--sliding {
	transition: opacity var(--carousel-transition),
		transform var(--carousel-transition);
}

.carousel.is-dragging .carousel__slide {
	transition: opacity var(--carousel-transition),
		transform var(--carousel-transition);
}

.carousel__slide {
	opacity: var(--carousel-opacity-inactive);
	transform: translateX(10px) rotateY(-12deg) scale(0.7);
}

.carousel__slide--prev {
	opacity: var(--carousel-opacity-near);
	transform: rotateY(-10deg) scale(0.8);
}

.carousel__slide--active {
	opacity: var(--carousel-opacity-active);
	transform: rotateY(0) scale(1);
}

.carousel__slide--next {
	opacity: var(--carousel-opacity-near);
	transform: rotateY(10deg) scale(0.8);
}

.carousel__slide--next~.carousel__slide {
	opacity: var(--carousel-opacity-inactive);
	transform: translateX(-10px) rotateY(12deg) scale(0.7);
}
</style>