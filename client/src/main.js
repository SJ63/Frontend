import Vue from 'vue'
import App from './App.vue'


import HomeDashboardDev from './components/HomeDashboardDev'
import Transaction from './components/Transaction'
import EmpAbsent from './components/EmpAbsent_copy'
import TrendEmp from './components/TrendEmp'
import EmpInCompany from './components/EmpInCompany'
import EmpInCleanroom from './components/EmpInCleanroom'

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
			component: HomeDashboardDev
		},
		{
			path: '/EmpInCompany',
			component: EmpInCompany
		},
		{
			path: '/EmpInCleanroom',
			component: EmpInCleanroom
		},
		{
			path: '/EmpNotInCleanroom',
			component: Transaction
		},
		{
			path: '/EmpAbsent',
			component: EmpAbsent
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
    render: h => h(App)
}).$mount('#app')
