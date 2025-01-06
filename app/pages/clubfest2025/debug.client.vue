<script setup lang="ts">
const userAgent = navigator.userAgent;
const pixelRatio = window.devicePixelRatio;
const innerWidth = window.innerWidth;
const innerHeight = window.innerHeight;
const outerWidth = window.outerWidth;
const outerHeight = window.outerHeight;
const localStorage = window.localStorage;
const sessionStorage = window.sessionStorage;
</script>

<template>
	<UContainer>
		<p class="text-bold">Device</p>
		User Agent: {{ userAgent }}
		<p class="text-bold">Screen</p>
		Pixel Ratio: {{ pixelRatio }}
		Inner Width: {{ innerWidth }}
		Inner Height: {{ innerHeight }}
		Outer Width: {{ outerWidth }}
		Outer Height: {{ outerHeight }}
		<p class="text-bold">Storage</p>
		<p>Local Storage: {{ localStorage }}</p>
		<p>Session Storage: {{ sessionStorage }}</p>
	</UContainer>
</template>
