<template>
	<header>
		<div class="row d-flex justify-content-between align-items-center py-4">
			<div class="col-2">
				<nuxt-link to="/" class="h2 text-decoration-none text-dark">
					Главная
				</nuxt-link>
			</div>
			<div class="col">
			</div>
			<div class="col text-right">
				<nuxt-link v-if="userAuth" to="/user/profile" class="ml-3">{{userData.user.email}}</nuxt-link>
			</div>
		</div>
	</header>
</template>

<script>
export default {
	data(){
		return{
		}
	},
	computed:{
		userData(){ return this.$store.getters['auth/userData'] },
		userAuth(){ return this.$store.getters['auth/isAuthenticated'] }
	}
}
</script>
