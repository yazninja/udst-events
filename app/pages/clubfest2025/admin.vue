<template>
	<UContainer>
		<h1>Admin</h1>
		<p>Enter the passcode to generate report</p>
		<UForm :validate="validate" :state="state" @submit="onSubmitButton()">
			<UFormField label="Passcode" name="passcode" required size="xl">
				<UInput v-model="state.passcode" placeholder="Enter passcode" />
			</UFormField>
			<UButton type="submit" size="lg">Generate Report</UButton>
		</UForm>
	</UContainer>
</template>

<script setup lang="ts">
const state = reactive({
	passcode: undefined,
})

const validate = (state: any): FormError[] => {
	const errors = []
	if (!state.passcode) {
		errors.push({ name: 'passcode', message: 'Passcode is required' })
	} else if (state.passcode !== 'SE@2025ClubsFest!') {
		errors.push({ name: 'passcode', message: 'Invalid passcode' })
	}
	return errors
}
async function onSubmitButton() {
	await navigateTo('/api/v1/generateReport', { open: { target: '_blank' } });
}
</script>