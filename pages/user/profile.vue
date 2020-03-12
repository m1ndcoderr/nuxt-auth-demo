<template>
	<div>
		<h5 class="mb-4">Профиль</h5>
		Email: {{userData.user.email}}
		</div>
	</div>
</template>

<script>
import axios from "axios"
export default {
	layout: 'user',
	data() {
		return {
			store_title: "",
		}
	},
	computed:{
		userData(){
			return this.$store.getters['auth/userData']
		}
	},
	methods: {
		createStore() {
			axios
				.post('/api/store/add', {
					title: this.store_title
				})
				.then(response => {
					alert("Магазин успешно создан")
				})
				.catch(error => (alert(error)))
		}
	}
}
</script>
