<template>
	<footer class="footer">
		<small>&copy; {{year}}</small>
	</footer>
</template>

<script>
export default {
	data() {
		// 各データの初期値
		return {
			year: ""
		}
	},
	mounted() {
		this.year = new Date().getFullYear()
	}
}
</script>

<style lang="scss" scoped>
	.footer {
		background: #00d0ff;
		padding: 10px;
		small {
			color: #fff;
		}
	}
</style>