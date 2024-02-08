import Vue from 'vue'
import App from './App.vue'

import HomeDashboard from './components/HomeDashboard'
import HomeDashboardDev from './components/HomeDashboardDev'
import EmpAllocate from './components/EmpAllocate'
import EmpSelect from './components/EmpSelect'
import TrendEmp from './components/TrendEmp'

import VueRouter from 'vue-router'

import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-icons/font/bootstrap-icons.css'
import "bootstrap"

import VueApexCharts from 'vue-apexcharts'
// import '@/plugins/apexcharts'

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

Vue.use(VueRouter)

const router = new VueRouter({
	routes: [
		{
			path: '/',
			component: HomeDashboard
		},
		{
			path: '/HomeDev',
			component: HomeDashboardDev
		},
		{
			path: '/EmpNotInCleanroom',
			component: EmpSelect
		},
		{
			path: '/EmpAllocate',
			component: EmpAllocate
		},
		{
			path: '/TrendEmp',
			component: TrendEmp
		},
	],
	mode:'history'
})

Vue.config.productionTip = false

new Vue({
	router,
  render: h => h(App),
}).$mount('#app')
