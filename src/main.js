import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import {LayoutPlugin, ModalPlugin, BVToastPlugin} from 'bootstrap-vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BootstrapVue)
Vue.use(LayoutPlugin)
Vue.use(ModalPlugin)
Vue.use(BVToastPlugin)
 
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
