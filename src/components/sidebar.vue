<template>
    <div class="iq-sidebar  sidebar-default ">
          <div class="iq-sidebar-logo d-flex align-items-center justify-content-between">
              <a v-if="store.state.user.function == 'Staff'" href="/" class="header-logo">
                  <img src="/assets/images/logo.png" class="img-fluid rounded-normal light-logo" alt="logo"><h5 class="logo-title light-logo ml-3">UIGB</h5>
              </a>
              <a v-if="store.state.user.function == 'Manager'" href="/" class="header-logo">
                  <img src="/assets/images/logo.png" class="img-fluid rounded-normal light-logo" alt="logo"><h5 class="logo-title light-logo ml-3">MANAGER</h5>
              </a>
              <a v-if="store.state.user.function == 'Operator'" href="/" class="header-logo">
                  <img src="/assets/images/logo.png" class="img-fluid rounded-normal light-logo" alt="logo"><h5 class="logo-title light-logo ml-3">OPERATOR</h5>
              </a>
              <div class="iq-menu-bt-sidebar ml-0">
                  <i class="las la-bars wrapper-menu"></i>
              </div>
          </div>
          <div class="scroller data-scrollbar" data-scroll="3">
              <nav class="iq-sidebar-menu">
                    <ul id="iq-sidebar-toggle" class="iq-menu">
                      <li class="active">
                          <a href="/" class="svg-icon">                        
                              <svg  class="svg-icon" id="p-dash1" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line>
                              </svg>
                              <span class="ml-4">Home</span>
                          </a>
                      </li>
                      <!-- <li class="" :class="{active : clickMenu == 1}" @click="selectSide(1)"> -->
                        <li class="" v-if="permissions.includes('index-users')">
                          <router-link to="/index-users" class="collapsed" data-toggle="collapse" aria-expanded="">
                              
                              <!-- <svg class="svg-icon" id="p-dash2" width="20" height="20"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
                                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                              </svg> -->
                              <svg class="svg-icon" id="p-dash8" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                              </svg>
                              <span class="ml-4">Users</span>
                              
                          </router-link>
                          
                      </li>
                      <li class=" " v-if="permissions.includes('index-packs')">
                          <router-link to="/index-packs" class="collapsed" data-toggle="collapse" aria-expanded="false">
                              <svg class="svg-icon" id="p-dash3" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                              </svg>
                              <span class="ml-4">Packs</span>
                              
                          </router-link>
                          
                      </li>
                      <li class=" " v-if="permissions.includes('index-tickets')">
                          <a href="#sale" class="collapsed" data-toggle="collapse" aria-expanded="false">
                              <svg class="svg-icon" id="p-dash4" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                              </svg>
                              <span class="ml-4" >Tickets</span>
                              <svg class="svg-icon iq-arrow-right arrow-active" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <polyline points="10 15 15 20 20 15"></polyline><path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
                              </svg>
                          </a>
                          <ul id="sale" class="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                                <li class="" v-if="store.state.user.function == 'Staff'">
                                    <router-link to="/index-printed">
                                        <i class="las la-minus"></i><span>Printed</span>
                                    </router-link>
                                </li>
                                <li class="" v-if="store.state.user.function == 'Staff'">
                                    <router-link to="/index-expired">
                                        <i class="las la-minus"></i><span>Expired</span>
                                    </router-link>
                                </li>
                                <li class="" v-if="store.state.user.function == 'Manager' || store.state.user.function == 'Staff'">
                                    <router-link to="/index-paid" >
                                        <i class="las la-minus"></i><span>Consummed</span>
                                    </router-link>
                                </li>
                          </ul>
                      </li>
                      <li class=" " v-if="permissions.includes('index-meal-types')">
                          <router-link to="/index-types-repas" class="collapsed" data-toggle="collapse" aria-expanded="false">
                              <svg class="svg-icon" id="p-dash4" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                              </svg>
                              <span class="ml-4" >Meal type </span>
                              
                          </router-link>
                          
                      </li>
                      <li class=" " v-if="permissions.includes('scan-barcode')">
                          <router-link to="/restauration" class="collapsed" data-toggle="collapse" aria-expanded="false">
                              <svg class="svg-icon" id="p-dash4" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                              </svg>
                              <span class="ml-4" >Bar Code Scan</span>
                              
                          </router-link>
                          
                      </li>
                      <li class=" " v-if="permissions.includes('index-credits')">
                          <router-link to="/recharges" class="collapsed" data-toggle="collapse" aria-expanded="false">
                              <svg class="svg-icon" id="p-dash4" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                              </svg>
                              <span class="ml-4" >Reloadings</span>
                              
                          </router-link>
                          
                      </li>
                      <li class=" " v-if="permissions.includes('scan-qrcode')">
                          <router-link to="/urgence" class="collapsed" data-toggle="collapse" aria-expanded="false">
                              <svg class="svg-icon" id="p-dash4" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                              </svg>
                              <span class="ml-4" >QR Code</span>
                              
                          </router-link>
                          
                      </li>
                      <li class=" " v-if="permissions.includes('index-profiles')">
                          <router-link to="/index-roles" class="collapsed" data-toggle="collapse" aria-expanded="false">
                              <svg class="svg-icon" id="p-dash4" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                              </svg>
                              <span class="ml-4" >Profiles</span>
                              
                          </router-link>
                          
                      </li>
                      
                      <li class=" " v-if="permissions.includes('show-charts')">
                          <a href="#charts" class="collapsed" data-toggle="collapse" aria-expanded="false">
                              <svg class="svg-icon" id="p-dash37" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                              </svg>
                              <span class="ml-4" >Charts</span>
                              <svg class="svg-icon iq-arrow-right arrow-active" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <polyline points="10 15 15 20 20 15"></polyline><path d="M4 4h7a4 4 0 0 1 4 4v12"></path>
                              </svg>
                          </a>
                          <ul id="charts" class="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                                <li class="">
                                    <router-link to="/charts">
                                        <i class="las la-minus"></i><span>For Printed tickets</span>
                                    </router-link>
                                </li>
                                <li class="">
                                    <router-link to="/charts_exp">
                                        <i class="las la-minus"></i><span>For Expired tickets</span>
                                    </router-link>
                                </li>
                          </ul>
                      </li>
                      <!-- <li class=" " v-if="adm == true">
                          <a href="#people" class="collapsed" data-toggle="collapse" aria-expanded="false">
                              <svg class="svg-icon" id="p-dash8" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                              </svg>
                              <span class="ml-4">Utilisateur</span>
                              
                          </a>
                          
                      </li> -->
                      <li class=" " v-if="permissions.includes('index-weekly-menus')">
                          <router-link to="/index-semaines" href="#stat" class="collapsed" data-toggle="collapse" aria-expanded="false">
                              <svg class="svg-icon" id="p-dash7" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>
                              </svg>
                              <span class="ml-4">Weekly menus</span>
                              
                          </router-link>
                          
                      </li> 
                      <!-- <li class=" " v-if="store.state.user.function == 'Staff'">
                          <router-link to="/index-menu" class="collapsed" data-toggle="collapse" aria-expanded="false">
                              <svg class="svg-icon" id="p-dash4" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                              </svg>
                              <span class="ml-4" >Bills</span>
                              
                          </router-link>
                          
                      </li> -->
                  </ul>
              </nav>
              <div class="p-3"></div>
          </div>
        </div>
</template>
<script>
import store from '@/store'
import axios from 'axios'
import {URL_API} from '@/config'
export default {
    mounted(){
        this.$store.state.user.permissions.forEach(element => {
            this.permissions.push(element.name)
        });
        console.log(this.permissions);
        this.getUrgence()
    },
    data() {
        return {
            permissions: [],
            store: store,
            active: null
        };
    },
    methods:{
        getUrgence(){
            let app = this
            axios.get(URL_API+'urgency')
            .then(function (reponse){
                console.log(reponse);
                if (reponse.data.message.etat == 1) {
                    app.active = true
                }
            })
            .catch(function (error){
                console.log(error);
            })
            
        },
    }
}
</script>