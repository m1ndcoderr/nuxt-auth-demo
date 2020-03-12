<template>
	<footer>
		<div class="row p-4">
			<div class="col-4">
				<div class="py-1"><div @click="logout($event)" class="text-secondary fake-link">Выйти</div></div>
			</div>
		</div>
	</footer>
</template>

<script>
import axios from "axios"
export default {
	methods: {
		logout(event) {
			if(!confirm("Выйти?")) return
			event.preventDefault()
			axios
				.post('/api/auth/logout')
				.then(response =>{
					location.href="/"
					this.$store.dispatch('auth/login', false)
					this.$store.dispatch('auth/setUserData', {})
				})
				.catch(error => (alert(error)))
		}
	}
}
</script>>