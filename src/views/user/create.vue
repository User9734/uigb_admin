<template>
    <div class="content-page">
        <div class="container-fluid add-form-list">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Add a user</h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <form action="page-list-category.html" @submit.prevent="store" data-toggle="validator">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>First name *</label>
                                            <input type="text" v-model="user.prenoms" class="form-control" placeholder="Enter first name">
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Last name *</label>
                                            <input type="text" v-model="user.nom" class="form-control" placeholder="Enter last name">
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
                                            <label>Profile *</label>
                                            <select class="form-control" v-model="user.function" name="" id="">
                                                <option v-for="(role, index) in roles" :key="index" :value="role.name" > {{ role.name }} </option>
                                            </select>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div> 
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Phone *</label>
                                                <input type="text" pattern="[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}" v-model="user.phone" class="form-control" placeholder="Enterphone number">                        
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Activé *</label>
                                            <select class="form-control" v-model="user.active" name="" id="">
                                                <option :value="1">Oui</option>
                                                <option :value="0">Non</option>
                                            </select>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Solde *</label>
                                            <input type="number" v-model="user.solde" class="form-control" placeholder="Enter solde">
                                            
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>E-mail *</label>
                                            <input type="email" v-model="user.email" class="form-control" placeholder="Enter e-mail">
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Status *</label>
                                            <select class="form-control" v-model="user.status" name="" id="">
                                                <option :value="1">Intern</option>
                                                <option :value="0">Extern</option>
                                            </select>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div> 
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Mot de passe *</label>
                                            <input type="password" v-model="user.password" class="form-control" placeholder="Enter le mot de passe">
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Confirmation de mot de passe *</label>
                                            <input type="password" v-model="user.password_confirmation" class="form-control" placeholder="Enter la confirmation">
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>    
                                </div>                             
                                <button type="submit" class="btn btn-primary mr-2">Save</button>
                                <button type="reset" class="btn btn-danger">reinitialiser</button>
                            </form>
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
        this.getroles()
    },
    methods:{
        store() {
            if (this.user.password == this.user.password_confirmation) {
                    this.isLoading = true
                axios.post(URL_API+'users', this.user)
                .then(response => {
                    
                    console.log(response.data)
                    this.isLoading = false
                    
                    if (response.data.status) {
                        Swal.fire(
                            'Done!',
                            'This user was created successfully.',
                            'success'
                        )
                        this.$router.push('/index-users')
                    }
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                    this.isLoading = false
                })
            }
            else{
                Swal.fire('Erreur', 'The password and its confiramtion are not identical. \nTry again.','error')
            }
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
    }
}
</script>