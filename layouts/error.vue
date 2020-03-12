<template>
		<div class="content rounded text-center" style="padding: 1.75rem 2rem">
			<div class="py-5">
				<h3>Ошибка {{error.statusCode}}</h3>
			</div>
		</div>
</template>

<script>
export default {
	props: ['error']
}
</script>