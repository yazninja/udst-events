<template>
	<div>
		<div class="qrcode">
			<svg v-html="svg" />
		</div>
	</div>

</template>
<script setup lang="ts">
import { renderSVG } from 'uqr';
const loc = useRequestURL().toString().replace('qrcode', 'vote');
const svg = renderSVG(loc);


</script>
<style lang="scss" scoped>
.qrcode {
	height: 500px;
	aspect-ratio: 1;

	svg {
		height: 100%;
		width: 100%;
	}
}
</style>