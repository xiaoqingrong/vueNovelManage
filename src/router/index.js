import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import AllBooks from '../components/AllBooks';
import BoyBooks from '../components/BoyBooks';
import GirlBooks from '../components/GirlBooks';
import PublishBooks from '../components/PublishBooks';
import Manage from '../components/Manage';
import User from '../components/User';
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children:[{
      path:'allBooks',
      component:AllBooks
    },{
      path:'boyBooks',
      component:BoyBooks
    },{
      path:'girlbooks',
      component:GirlBooks
    },{
      path:'publishbooks',
      component:PublishBooks
    },{
      path:'manage',
      component:Manage
    },{
      path:'user',
      component:User
    }],
    redirect:'allBooks'
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to,from,next)=>{
  if(to.path == '/login'){
    
    if(localStorage.getItem('login') !== ""){
      next('/allBooks')
    }else{
      next();
    }
  }else if(localStorage.getItem('login') !== ""){
    next();
  }else{
    next('/login')
  }
})
export default router;
