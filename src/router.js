import VueRouter from "vue-router";
import store from '@/store'

import Home from "./views/home.vue";
import Login from "./views/auth/login.vue";
import PageNotFound from "./views/notFound.vue";
import PageDeniedAccess from "./views/unauthorized.vue";
import Recharge from './views/recharges.vue'
//import store from './store'




    // * User

import UserCreate from "./views/user/create.vue"
import UserIndex from "./views/user/index.vue"
import UserShow from "./views/user/show.vue"
import UserEdit from "./views/user/edit.vue"

    // * Ticket 

import IndexTicketExp from "./views/tickets/index_expired.vue"
import IndexTicketPrint from "./views/tickets/index_printed.vue"
import IndexTicketPaid from "./views/tickets/index_use_paye.vue"
import IndexTicketUnpaid from "./views/tickets/index_use_no_paye.vue"

    // * Pack 

import PackCreate from "./views/pack/create.vue"
import PackIndex from "./views/pack/index.vue"
import PackEdit from "./views/pack/edit.vue"
import PackShow from "./views/pack/show.vue"

    // * Pack 

import RoleCreate from "./views/role/create.vue"
import RoleIndex from "./views/role/index.vue"
import RoleEdit from "./views/role/edit.vue"
import RoleShow from "./views/role/show.vue"

    // * Restauration 

import MenuCreate from "./views/restauration/create.vue"
import Urgence from "./views/restauration/urgence.vue"
import Charts from "./views/restauration/charts.vue"
import ChartsExp from "./views/restauration/charts_exp.vue"

    // * Type 

import TypeRepasCreate from "./views/type_repas/create.vue"
import TypeRepasIndex from "./views/type_repas/index.vue"
import TypeRepasEdit from "./views/type_repas/edit.vue"
import TypeRepasShow from "./views/type_repas/show.vue"

// * Type 

import WeekCreate from "./views/semaine/create.vue"
import WeekIndex from "./views/semaine/index.vue"
import WeekEdit from "./views/semaine/edit.vue"
import WeekShow from "./views/semaine/show.vue"


const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        meta: {
          layout: "Default",
          requiredAuth: true,
          perm: null
        }
      },
      {
        path: "/recharges",
        name: "recharge",
        component: Recharge,
        meta: {
          layout: "Default",
          requiredAuth: true,
          perm: 'index-credits'
        }
      },
    {   path: "*", 
        component: PageNotFound ,
        meta: {
            layout: "Auth",
            
          }
        
    },
    {   path: "/denied", 
        component: PageDeniedAccess ,
        meta: {
            layout: "Auth",
            
          }
        
    },

      {
        path: "/connexion",
        name: "connexion",
        component: Login,
        meta: {
          layout: "Auth",
          
        }
      },
      
      
      
    

      //  

          // * USER
      {
        path: "/create-user",
        name: "UserCreate",
        component: UserCreate,
        meta: {
          layout: "Default",
          perm: 'create-users'
        }
      },
      {
        path: "/index-users",
        name: "UserIndex",
        component: UserIndex,
        meta: {
          layout: "Default",
          perm: 'index-users'
        }
      },
      {
        path: "/show-user/:id",
        name: "UserShow",
        component: UserShow,
        meta: {
          layout: "Default",
          perm: 'show-users'
        }
      },
      {
        path: "/edit-user/:id",
        name: "Edit",
        component: UserEdit,
        meta: {
          layout: "Default",
          perm: 'edit-users'
        }
      },
          // *  TICKETS
      
      {
        path: "/index-expired",
        name: "TicketExp",
        component: IndexTicketExp,
        meta: {
          layout: "Default",
          perm: 'index-tickets'
        }
      },
      {
        path: "/index-printed",
        name: "TicketPrint",
        component: IndexTicketPrint,
        meta: {
          layout: "Default",
          perm: 'index-tickets'
        }
      },
      {
        path: "/index-paid",
        name: "TicketPaid",
        component: IndexTicketPaid,
        meta: {
          layout: "Default",
          perm: 'index-tickets'
        }
      },
      {
        path: "/index-unpaid",
        name: "TicketUnaid",
        component: IndexTicketUnpaid,
        meta: {
          layout: "Default",
          perm: 'index-tickets'
        }
      },


        // *  Pack
      {
        path: "/create-pack",
        name: "PackCreate",
        component: PackCreate,
        meta: {
          layout: "Default",
          perm: 'create-packs'
        }
      },
      {
        path: "/edit-pack/:id",
        name: "PackEdit",
        component: PackEdit,
        meta: {
          layout: "Default",
          perm: 'edit-packs'
        }
      },
      {
        path: "/show-pack/:id",
        name: "PackShow",
        component: PackShow,
        meta: {
          layout: "Default",
          perm: 'show-packs'
        }
      },
      {
        path: "/index-packs",
        name: "PackIndex",
        component: PackIndex,
        meta: {
          layout: "Default",
          perm: 'index-packs'
        }
      },

      // * Roles
      {
        path: "/create-role",
        name: "RoleCreate",
        component: RoleCreate,
        meta: {
          layout: "Default",
          perm: 'create-profiles'
        }
      },
      {
        path: "/edit-role/:id",
        name: "RoleEdit",
        component: RoleEdit,
        meta: {
          layout: "Default",
          perm: 'edit-profiles'
        }
      },
      {
        path: "/show-role/:id",
        name: "RoleShow",
        component: RoleShow,
        meta: {
          layout: "Default",
          perm: 'show-profiles'
        }
      },
      {
        path: "/index-roles",
        name: "RoleIndex",
        component: RoleIndex,
        meta: {
          layout: "Default",
          perm: 'show-charts'
        }
      },
      // *  Menus
      {
        path: "/restauration",
        name: "MenuCreate",
        component: MenuCreate,
        meta: {
          layout: "Default",
          perm: 'scan-barcode'
        }
      },
      {
        path: "/charts",
        name: "Charts",
        component: Charts,
        meta: {
          layout: "Default",
          perm: 'show-charts'
        }
      },
      {
        path: "/charts_exp",
        name: "ChartsExp",
        component: ChartsExp,
        meta: {
          layout: "Default",
          perm: 'show-charts'
        }
      },
      {
        path: "/urgence",
        name: "Urgence",
        component: Urgence,
        meta: {
          layout: "Default",
          perm: 'scan-qrcode'
        }
      },


      // *  Type repas
      {
        path: "/create-type-repas",
        name: "TypeRepasCreate",
        component: TypeRepasCreate,
        meta: {
          layout: "Default",
          perm: 'create-meal-types'
        }
      },
      {
        path: "/edit-type-repas/:id",
        name: "TypeRepasEdit",
        component: TypeRepasEdit,
        meta: {
          layout: "Default",
          perm: 'edit-meal-types'
        }
      },
      {
        path: "/show-type-repas/:id",
        name: "TypeRepasShow",
        component: TypeRepasShow,
        meta: {
          layout: "Default",
          perm: 'show-meal-types'
        }
      },
      {
        path: "/index-types-repas",
        name: "TypeRepasIndex",
        component: TypeRepasIndex,
        meta: {
          layout: "Default",
          perm: 'index-meal-types'
        }
      },

      // *  Type repas
      {
        path: "/create-semaine",
        name: "WeekCreate",
        component: WeekCreate,
        meta: {
          layout: "Default",
          perm: 'create-weekly-menus'
        }
      },
      {
        path: "/edit-semaine/:id",
        name: "WeekEdit",
        component: WeekEdit,
        meta: {
          layout: "Default",
          perm: 'edit-weekly-menus'
        }
      },
      {
        path: "/show-semaine/:id",
        name: "WeekShow",
        component: WeekShow,
        meta: {
          layout: "Default",
          perm: 'show-weekly-menus'
        }
      },
      {
        path: "/index-semaines",
        name: "WeekIndex",
        component: WeekIndex,
        meta: {
          layout: "Default",
          perm: 'index-weekly-menus'
        }
      },
          
          
         
          
         
    
          
];



const router = new VueRouter({
    history: true,
    mode: "history",
    routes,
});

var perms = store.state.perms.split('911');

 router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiredAuth)) {
    console.log('required')
    if (store.state.token) {
      if (to.meta.perm) {
        if (perms.includes(to.meta.perm)) {
          next()
        } else {
          next("/denied")
        }
      } else {
        next()
      }
    } else {
      next("/connexion")
    }
  } else {
    console.log('non required')
    if (to.meta.perm) {
      if (perms.includes(to.meta.perm)) {
        next()
      } else {
        next("/denied")
      }
    } else {
      next()
    }
  }
}) 

export default router;