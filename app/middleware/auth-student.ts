export default defineNuxtRouteMiddleware((to, _from) => {
	if (useState('student-id') === null) {
		return navigateTo(`/login-student?to=${to.path}`);
	}

});