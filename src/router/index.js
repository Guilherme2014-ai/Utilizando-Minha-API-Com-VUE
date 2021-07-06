import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'
import Home from '../views/Home.vue'
import About from "../views/About.vue"
import Register from "../views/Register.vue"
import Login from "../views/Login.vue"
import Users from "../views/Users.vue"
import Edit from "../views/Edit.vue"

function authAdmin(to,from,next){


  const token = localStorage.getItem('token')
      if(token == undefined){
        next('/login');
        return;
      }

      const req = { token: `Bearer ${token}` }

      axios.post('http://localhost/auth',req).then(data => {
        
        const isValid = data.data["isValid"];

        if(isValid == true){
          const isAdmin = data.data["isAdmin"]
          if(isAdmin == 1){
            next()
          }else{
            console.log("Voce Nao tem Autorizacao !")
            next("/home")
          }
          return
        }

        console.log('O Token Nao e valido')
        next("/login")

      }).catch(err => {console.error(err)});


}


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin/users',
    name: 'Users',
    component: Users,
    beforeEnter: authAdmin
  },
  {
    path: '/admins/edit/:id',
    name: 'Users_Edit',
    component: Edit,
    beforeEnter: authAdmin
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
