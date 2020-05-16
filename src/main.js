import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Button, Layout, Menu, Breadcrumb, Icon, Table, Popconfirm, Input } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';


Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Breadcrumb);
Vue.use(Icon);
Vue.use(Table);
Vue.use(Popconfirm);
Vue.use(Input);
Vue.use(Button);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
