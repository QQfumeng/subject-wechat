import Vue from 'vue'
import App from './App'
import { Request } from './static/module/request'
let baseUrl = 'http://127.0.0.1:8010/api'
Vue.prototype.baseUrl = baseUrl
Vue.prototype.$http = new Request().request
Vue.prototype.href = (url, type) => {
  switch (type) {
    case 'redirectTo':
      uni.redirectTo({
        url
      })
      break;
  }
}
Vue.config.productionTip = false
const app = new Vue({
  ...App
})
app.$mount()
