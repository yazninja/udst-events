<template>
	<UContainer>
		<div
			class="text-3xl sm:text-4xl mt-10 text-pretty font-black py-4 border-b border-[var(--ui-border-muted)] justify-between flex">
			Student Login
		</div>
		<UForm class="mt-10 flex flex-col items-start gap-4" :validate="validate" :state="state"
			@submit="onSubmitButton()">
			<div class="text-current/75">In order to keep a fair and just voting system, we need to verify the voters
				with
				their Student ID
			</div>
			<UFormField label="UDST Student/ Staff ID" name="id" required size="xl">
				<UInput v-model="state.id" placeholder="60xxxxxx" />
			</UFormField>
			<UButton type="submit" size="lg">Login</UButton>
		</UForm>
	</UContainer>
</template>
<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '#ui/types'

const redirected = useRoute().query.from as string | undefined

const state = reactive({
	id: undefined,
})

const voterID = useCookie('voterId', {
	expires: new Date(Date.now() + 86400000),
	watch: 'shallow',
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validate = (state: any): FormError[] => {
	const errors = []
	if (!state.id) {
		errors.push({ name: 'id', message: 'ID is required' })
	}
	// ID must start with 600, 601 or 603
	else if (!['600', '601', '603'].includes(state.id.slice(0, 3))) {
		errors.push({ name: 'id', message: 'Invalid UDST ID' })
	} else if (state.id.length < 7 || state.id.length > 8) {
		errors.push({ name: 'id', message: 'Invalid UDST ID Length' })
	}
	return errors
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function onSubmitButton() {
	voterID.value = state.id
	await navigateTo(redirected?.replaceAll(' ', '%20') || '/clubfest2025')
}
</script>