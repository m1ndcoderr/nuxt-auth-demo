<template>
	<div class="row my-5 py-5">
		<div class="col-12 m-auto" style="max-width: 300px">
			<h3 class="mb-4">Регистрация</h3>
			<b-form @submit="onSubmit" class="w-100">
				<b-form-group >
					<b-form-input v-model="email" type="email" required placeholder="Email"></b-form-input>
				</b-form-group>

				<b-form-group >
					<b-form-input type="password" v-model="password" required placeholder="Пароль"></b-form-input>
				</b-form-group>

				<b-form-group >
					<b-form-input type="password" v-model="repeat" required placeholder="Повторите пароль"></b-form-input>
					<small v-if="password!=repeat" class="text-danger">Пароли не совпадают</small>
				</b-form-group>

				<b-button type="submit" variant="primary" class="mt-2">Зарегистрироваться</b-button>
			</b-form>

			<div class="mt-4 text-secondary">
				Или все-таки <nuxt-link to="/">войти</nuxt-link>?
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
			password: "",
			repeat: ""
		}
	},
	methods: {
		onSubmit(evt) {
			evt.preventDefault()
			axios
				.post('/api/auth/register', {
					email: this.email,
					password: this.password,
					repeat: this.repeat,
				})
				.then(response => {
					axios.get("http://localhost:3000/api/user/get-authorized")
					.then(res => {
						this.$store.dispatch("auth/setAuth", true)
						this.$store.dispatch("auth/setUserData", res.data)
						this.$router.push("/user/profile")
					})
				})
				.catch(error => (alert(error)))
		}
	}
}
</script>
