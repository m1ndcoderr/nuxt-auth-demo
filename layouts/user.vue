<template>
	<b-container class="">
		<Header/>
		<div class="content rounded" style="padding: 1.75rem 2rem">
			<div class="row">
				<div class="col-3">
					<h5>
						Личный кабинет
					</h5>
					<div class="mt-3">
						<div class="mb-1"><nuxt-link to="/user/profile">Профиль</nuxt-link></div>
					</div>
				</div>
				<div class="col">
					<nuxt/>
				</div>
			</div>
		</div>
		<Footer/>
	</b-container>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
	components: {
		Header,
		Footer,
	},
	computed:{
		userData(){ return this.$store.getters['auth/userData'] },
	},
};
</script>