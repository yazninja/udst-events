<template>
	<UContainer>
		<div class="flex justify-center flex-col md:flex-row gap-5 align-middle h-screen">
			<div class="flex flex-col qrcode h-auto md:w-1/2 items-center justify-center">
				<!-- eslint-disable-next-line vue/no-v-html -->
				<svg class="w-[80%] md:w-[80%] md:h-auto aspect-square" v-html="svgVote" />
				<p class="text-center text-lg mt-5">Scan to vote for <b>{{ clubName }}</b></p>
			</div>
			<div class="flex flex-col qrcode h-auto md:w-1/2 items-center justify-center">
				<!-- eslint-disable-next-line vue/no-v-html -->
				<svg class="w-[80%] md:w-[80%] md:h-auto aspect-square" v-html="svgRegister" />
				<p class="text-center text-lg mt-5">Scan to join <b>{{ clubName }}</b></p>
			</div>
		</div>

	</UContainer>

</template>
<script setup lang="ts">
import { renderSVG } from 'uqr';
const clubName = useRoute().params.club as string;
const voteURL = useRequestURL().toString().replace('qrcode', 'vote');
const registerURL = useRequestURL().toString().replace('qrcode', 'register');
const svgVote = renderSVG(voteURL);
const svgRegister = renderSVG(registerURL);
</script>
