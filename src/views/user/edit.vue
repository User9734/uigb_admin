<template>
    <div class="content-page">
        <div class="container-fluid add-form-list">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Edit a user</h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <!-- <form  action="#" data-toggle="validator"> -->
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>First name *</label>
                                            <input type="text" v-model="user.prenoms" class="form-control" placeholder="Enter libelle">
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Last name *</label>
                                            <input type="text" v-model="user.nom" class="form-control" placeholder="Enter libelle">
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Card number *</label>
                                            <input type="text" v-model="user.num_carte" class="form-control" placeholder="Enter card number">
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Phone *</label>
                                                <input type="text" v-model="user.phone" class="form-control" placeholder="Enter libelle">                        
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>E-mail *</label>
                                                <input type="email" v-model="user.email" class="form-control" placeholder="Enter libelle">                        
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Solde *</label>
                                            <input type="text" v-model="user.solde" class="form-control" placeholder="Enter adresse">
                                            
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Code *</label>
                                            <input type="text" v-model="user.code_qr" class="form-control" placeholder="Enter adresse">
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Status *</label>
                                            <select name="" id="" v-model="user.status" class="form-control">
                                                <option :value="0">Extern</option>
                                                <option :value="1">Intern</option>
                                            </select>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div> 
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Mot de passe *</label>
                                            <input type="password" v-model="user.password" class="form-control" placeholder="Enter mot de passe">
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>   
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Profile *</label>
                                            <select class="form-control" v-model="user.role" name="" id="">
                                                <option v-for="(role, index) in roles" :key="index" :value="role.name" > {{ role.name }} </option>
                                            </select>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>                     
                                </div>                            
                                <button  type="submit" @click="store" class="btn btn-primary mr-2">Save</button>
                                
                            <!-- </form> -->
                        </div>
                    </div>
                    <div class="vld-parent">
                        <loading :active.sync="isLoading" 
                        :can-cancel="true" 
                        :is-full-page="fullPage"></loading>
                    </div>
                </div>
            </div>
            <!-- Page end  -->
        </div>
    </div>
</template>
<script>
import axios from "axios";
import {URL_API} from '@/config'
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
import Swal from 'sweetalert2'
export default {
    components: {
            Loading
    },
    data() {
        return {permissions: [],
            user:{},
            roles:{},
            isLoading: false,
            fullPage: true,
            
        };
    },
    mounted(){this.$store.state.user.permissions.forEach(element => {
            this.permissions.push(element.name)
        });
        
        this.getUser()
        this.getroles()
    },
    methods:{
        store() {
            axios.put(URL_API+'users/'+this.$route.params.id, this.user)
            .then(function (reponse) {
                console.log(reponse);
                if (reponse.data.status == true) {
                    Swal.fire('Réussi', 'Utilisateur modifié avec succès', 'success')
                    location.href = '/index-users'
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        },
        getroles(){
            let app = this
            axios.get(URL_API+'roles')
            .then(function (reponse){
                console.log(reponse);
                if (reponse.data.status == true) {
                   
                    app.roles = reponse.data.data
                }
            })
            .then(function (error){
                console.log(error);
                
            })
        },
        getUser() {
            this.isLoading = true
            
            axios.get(URL_API+'users/'+this.$route.params.id)
            .then(response => {
                console.log(response.data)
                if (response.data.status == true) {
                    this.user = response.data.data
                
                this.isLoading = false
                }
            })
            .catch(error => {
                Swal.fire('Echec de récupération', 'Une erreur s\'est produite lors de la récupération des données', 'error')
                console.log(error)
                this.errored = true
                this.isLoading = false
            })
        },
        
    }
}
</script>