// vue読み込み
import Vue from 'vue'
// コンポーネント読み込み
import IndexComponent from './vue-components/Index'

// scssのインポート
import "@scss/index.scss";

// jsのインポート
import { log, Sample, SampleExtend } from "@js/modules/utils";

// 実行
document.addEventListener('DOMContentLoaded', () => {
	// 初期化
	const Index = new Vue(IndexComponent)

	const es = new Sample();
	es.counter();
	Sample.version();
	const esEx = new SampleExtend();
	esEx.counterExtend();
});