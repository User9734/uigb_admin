<template>
    <div>
        <div class="iq-top-navbar">
            <div class="iq-navbar-custom">
                <nav class="navbar navbar-expand-lg navbar-light p-0">
                    <div class="iq-navbar-logo d-flex align-items-center justify-content-between">
                        <i class="ri-menu-line wrapper-menu"></i>
                        <a href="/" class="header-logo">
                            <img src="/assets/images/logo.png" class="img-fluid rounded-normal" alt="logo">
                            <h5 class="logo-title ml-3">UIGB - Dining</h5>
        
                        </a>
                    </div>
                    <div class="iq-search-bar device-search">
                        
                    </div>
                    <div class="d-flex align-items-center">
                        <button class="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-label="Toggle navigation">
                            <i class="ri-menu-3-line"></i>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav ml-auto navbar-list align-items-center">
                               
                                <li @click="activeUrgence()" v-if="this.store.state.user.function == 'Staff'">
                                    <a id="urgency" href="#" class="btn border add-btn shadow-none mx-2 d-none d-md-block"
                                        data-toggle="modal" data-target="#new-order"><i class="las la-plus mr-2"></i>Urgency mode / {{ this.state }} </a>
                                </li>
                                <!-- <li v-if="this.store.state.user.function == 'Staff'">
                                    <a href="#" class="btn border add-btn shadow-none mx-2 d-none d-md-block"
                                        ><i class="las la-plus mr-2"></i> {{ this.state }} </a>
                                </li> -->
                                <li class="nav-item nav-icon dropdown caption-content">
                                    <a href="#" class="search-toggle dropdown-toggle" id="dropdownMenuButton4"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <img src="/assets/images/user/1.png" class="img-fluid rounded" alt="user">
                                    </a>
                                    <div class="iq-sub-dropdown dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <div v-if="user" class="card shadow-none m-0">
                                            <div class="card-body p-0 text-center">
                                                <div class="media-body profile-detail text-center">
                                                    <img src="/assets/images/page-img/profile-bg.jpg" alt="profile-bg"
                                                        class="rounded-top img-fluid mb-4">
                                                    <img src="/assets/images/user/1.png" alt="profile-img"
                                                        class="rounded profile-img img-fluid avatar-70">
                                                </div>
                                                <div class="p-3">
                                                    <h5 class="mb-1">{{user.prenoms}} {{user.nom}}</h5>
                                                    <div class="d-flex align-items-center justify-content-center mt-3">
                                                        <a @click="deconnexion" class="btn border">Log out</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        
    </div>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import {URL_AUTH_API, URL_API} from '@/config'
import store from '@/store'
export default {
    name: 'Header', 
    data(){
        return{
            store: store,
            user:null,
            state: ''
        }
    },
    mounted(){
        
        this.user = JSON.parse(localStorage.getItem('user'))
        console.log(this.user);
        this.checkUrgency()
    },
    methods:{
        deconnexion(){
            //let url = 'https://igp-auth.lce-ci.com/api/auth/logout'
            let url = URL_AUTH_API+'logout'
           
            axios.get(url)
            .then(res =>{
                if (res.data.status) {
                    localStorage.removeItem('token')
                    localStorage.setItem('user',null)
                        Swal.fire({
                            icon: 'success',
                            title: 'Log out',
                            text: 'Successfully logged out !',
                            showConfirmButton: false,
                            timer: 2000
                        }) 
                    window.location.href = '/connexion';
                }
            })
            this.user = JSON.parse(localStorage.getItem('user'))
        },
        activeUrgence(){
            let app = this
            axios.get(URL_API+'urgency')
            .then(function (reponse){
                    console.log(reponse);
                    if (reponse.data.message.etat == 0) {
                        axios.post(URL_API+'urgency', {etat: 1})
                        .then(function (reponse){
                            console.log(reponse);
                            Swal.fire('Note', 'Urgency mode enabled', 'info')
                            app.state = 'Activé'
                            document.getElementById("urgency").style.background = 'lightgreen'
                        })
                        .catch(function (error){
                            console.log(error);
                        })
                    }
                    else{
                        axios.post(URL_API+'urgency', {etat: 0})
                        .then(function (reponse){
                            console.log(reponse);
                            Swal.fire('Note', 'Urgency mode disabled', 'info')
                            app.state = 'Désactivé'
                            document.getElementById("urgency").style.background = 'tomato'
                        })
                        .catch(function (error){
                            console.log(error);
                        })
                    }
            })
            .catch(function (error){
                console.log(error);
            })
        },

        checkUrgency(){
            let app = this
            axios.get(URL_API+'urgency')
            .then(function (reponse){
                    console.log(reponse);
                    if (reponse.data.message.etat == 0) {
                        app.state = 'Disabled'
                        document.getElementById("urgency").style.background = 'tomato'
                    }
                    else{
                        app.state = 'Enabled'
                        document.getElementById("urgency").style.background = 'lightgreen'
                    }
            })
            .catch(function (error){
                console.log(error);
            })
        },
    }
}

</script>