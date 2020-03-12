<template>
	<div class="row my-5 py-5">
		<div class="col-12 m-auto" style="max-width: 300px">
			<h3 class="mb-4">Вход</h3>
			<b-form @submit="onSubmit" class="w-100">
				<b-form-group >
					<b-form-input v-model="email" type="email" required placeholder="Имя пользователя или email"></b-form-input>
				</b-form-group>

				<b-form-group >
					<b-form-input type="password" v-model="password" required placeholder="Пароль"></b-form-input>
				</b-form-group>

				<b-button type="submit" variant="primary" class="mt-2">Войти</b-button>
			</b-form>

			<div class="mt-4 text-secondary">
				Впервые на сайте? <nuxt-link to="registration">Регистрация</nuxt-link>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios"
export default {
	data() {
		return {
			email: "",
			password: ""
		}
	},
	methods: {
		onSubmit(evt) {
			evt.preventDefault()
			axios
				.post("/api/auth/login", {
					email: this.email,
					password: this.password
				})
				.then(response => {
					axios.get("http://localhost:3000/api/user/get-authorized")
					.then(res => {
						this.$store.dispatch("auth/setAuth", true)
						this.$store.dispatch("auth/setUserData", res.data)
						this.$router.push("/user/profile")
					})
				})
				.catch(error => {
					this.$bvToast.toast('Пожалуйста, проверьте правильность написания логина и пароля.', {
						title: "Ошибка!",
						variant: "danger",
					})
				})
		}
	}
}
</script>
