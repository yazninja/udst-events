<template>
	<UContainer>
		<div>Club Fest Page</div>
		<template v-for="category in clubData" :key="category.name">
			<h1>{{ category.name }}</h1>
			<UCarousel v-slot="{ item }" class-names arrows :items="category.clubs" :ui="{
				viewport: 'mt-15',
				container: 'transition-[height]',
				controls: 'absolute -top-8 inset-x-12',
				dots: 'first:-top-7 -top-1',
				dot: 'w-6 h-1',
				item: 'basis-1/2 basis=1/4 mx-5'
			}" :autoplay="{ delay: 2000 + (Math.random() * 500) }" dots loop>
				<div class="flex flex-col items-center h-[234px] aspect-square rounded-lg">
					<img :src="item.img" alt="club image" class=" object-cover h-40 rounded-lg">
					<h2>{{ item.name }}</h2>
					<NuxtLink :to="`/clubfest2025/${category.name}/${item.name}/vote`">Vote</NuxtLink>
				</div>
			</UCarousel>
		</template>

	</UContainer>
</template>

<script setup lang="ts">

const { data: clubData } = await useFetch('/api/v1/getAllClubs');
</script>