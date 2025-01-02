<!-- eslint-disable vue/first-attribute-linebreak -->
<template>
	<UContainer class="flex flex-col items-center justify-center text-center h-screen">
		<div class="actions">
			<UButton to="/clubfest2025" icon="i-lucide-chevron-left" variant="link">Back (Club
				Info)</Ubutton>
		</div>
		<NuxtImg v-if="img" :src="img" class="bg-image" />
		<h1 class="text-xl font-bold text-[var(--ui-primary)] leading-loose mb-2">Cast your votes for</h1>
		<h2 class="text-4xl font-black">{{ name }}</h2>
		<h3 class="text-lg opacity-50 mb-10">{{ category }}</h3>
		<NuxtRating class="rating" :read-only="false" :rating-value="0" :rating-step="1" :rating-size="60"
			@rating-selected="logRating" />
		<UButton v-if="rating > 0" size="xl" :loading="isLoading" class="mt-5" :disabled="isDisabled"
			@click="submitRating">Submit Vote
		</UButton>
	</UContainer>
</template>

<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid';
const $route = useRoute();
const name = ref($route.params.club as string);
const category = ref($route.params.category as string);

const { data: img } = await useFetch<string>(`/api/v1/getImage/${encodeURIComponent(name.value)}`);

const rating = ref(0);
const isLoading = ref(false);
const isDisabled = ref(false);
const voterId = useCookie('voterId', {
	expires: new Date(Date.now() + 86400000),
});
if (!voterId.value) navigateTo(`/login-student?from=${$route.fullPath}`);
const isVoted = useCookie(`voted-${name.value.replace(' ', '')}`, {
	expires: new Date(Date.now() + 86400000),
	default: () => false,
	watch: 'shallow'
});

const logRating = (event: number) => {
	rating.value = event;
}


const submitRating = async () => {
	isLoading.value = true;
	if (isVoted.value) {
		isDisabled.value = true;
		useToast().add({
			title: 'Vote Already Submitted',
			description: `You have already voted for ${name.value}`,
			color: 'error',
		});
	} else {
		isVoted.value = true;
		let res = await $fetch(`/api/v1/vote/${encodeURIComponent($route.params.name as string)}?stars=${rating.value}&id=${voterId.value}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: name.value,
				rating: rating.value
			})
		});
		useToast().add({
			title: 'Vote Submitted',
			description: `You have voted ${rating.value} stars for ${name.value}`,
			color: 'success',
		});

	}
	isLoading.value = false;
}
</script>
<style lang="css" scoped>
.bg-image {
	z-index: -1;
	position: absolute;
	top: 0;
	margin: auto;
	width: min(100vw, 600px);
	object-fit: contain;
	opacity: 0.5;
	-webkit-mask-image: linear-gradient(to bottom, transparent 15%, black 50%, transparent 85%);
}

.actions {
	position: absolute;
	top: 0;
	left: 0;
	padding: 1rem;
}
</style>