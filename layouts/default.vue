<template>
	<b-container class="">
		<Header/>
		<div class="content rounded" style="padding: 1.75rem 2rem">
			<nuxt/>
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
	}
};
</script>