<script>
import CmnHeader from './components/CmnHeader'
import CmnFooter from './components/CmnFooter'

export default {
	el: '#index-vue-area',
	// プロパティdata
	data() {
		// 各データの初期値
		return {
			msg: "indexです",
			env: process.env.APP_ENV
		}
	},
	components: {
		CmnHeader,
		CmnFooter,
	},
	created() {
		console.log(this.msg)
	},

	// 関数
	methods: {}
}
</script>

<style lang="scss" scoped>

</style>