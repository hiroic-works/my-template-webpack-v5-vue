<template>
	<header class="header">
		<h1>{{ title }}</h1>
	</header>
</template>

<script>

export default {
	// プロパティdata
	data() {
		// 各データの初期値
		return {
			title: "サイトタイトル"
		}
	},

	// 関数
	methods: {}
}
</script>

<style lang="scss" scoped>
	.header {
		background: #00d0ff;
		padding: 10px;
		h1 {
			font-size: 1rem;
			color: #fff;
		}
	}

</style>