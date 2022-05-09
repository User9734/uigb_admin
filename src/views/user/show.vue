<template>
    <div class="content-page">
        <div class="container-fluid add-form-list">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        
                        <div class="card-body">
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Details</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false" v-if="perms.includes('edit-users') && (user.id != stored.state.user.id)">Credit account</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" id="other-tab" data-toggle="tab" href="#other" role="tab" aria-controls="other" aria-selected="false" v-if="perms.includes('index-credits')">Credits</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" id="another-tab" data-toggle="tab" href="#another" role="tab" aria-controls="another" aria-selected="false" v-if="perms.includes('edit-users') && (user.id != stored.state.user.id)" >Assign permissions</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div class="col-lg-12">
                                    <div class="row">
                                        <div class="col-md-6">
                                        <div class="form-group">
                                            <label>First name *</label>
                                            <input type="text" v-model="user.prenoms" class="form-control" placeholder="Enter libelle" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Last name *</label>
                                            <input type="text" v-model="user.nom" class="form-control" placeholder="Enter libelle" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>First name *</label>
                                            <input type="text" v-model="user.prenoms" class="form-control" placeholder="Enter libelle" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Card number *</label>
                                            <input type="text" v-model="user.num_carte" class="form-control" placeholder="Enter card number" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Phone *</label>
                                                <input type="text" v-model="user.phone" class="form-control" placeholder="Enter libelle" readonly>                        
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>E-mail *</label>
                                                <input type="email" v-model="user.email" class="form-control" placeholder="Enter libelle" readonly>                        
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Solde *</label>
                                            <input type="text" v-model="user.solde" class="form-control" readonly>
                                            
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Code *</label>
                                            <input type="text" v-model="user.code_qr" class="form-control" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                     <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Profile *</label>
                                            <input type="text" v-model="user.function" class="form-control" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6" >
                                        <div class="form-group">
                                            <label>Status *</label>
                                            <input v-if="user.status == 1" class="form-control" value="Interne" type="text" name="" id="" readonly>
                                            <input v-else class="form-control" value="Externe" type="text" name="" id="" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div> 
                                                           
                                </div>                            
                                <button v-if="perms.includes('edit-users')"  type="submit" @click="store" class="btn btn-primary mr-2">Edit</button>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div class="col-lg-12">
                                    <div class="row">
                                    <div class="col-md-6 " v-if="user.function == 'Etudiant' && user.status == 1">
                                        <div class="form-group">
                                            <label>Pack *</label>
                                            <select name="" id="" v-model="payload.pack_id" class="form-control">
                                                <option v-for="(pack, index) in packs" :key="index" :value="pack.id"> {{ pack.libelle }} </option>
                                            </select>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                            
                                    <div class="col-md-6" v-if="user.status != 1">
                                        <div class="form-group">
                                            <label>Amount *</label>
                                                <input type="text" v-model="payload.montant" class="form-control" placeholder="Enter libelle">                        
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                
                                       
                                </div>  
                                    <button v-if="perms.includes('credit-account')" @click="recharger" class="btn btn-danger">Reload</button>
                                </div>                        
                            </div>
                            <div  class="tab-pane fade" id="other" role="tabpanel" aria-labelledby="other-tab">
                                <div class="col-lg-12">
                                    <table id="example" class="data-table table mb-0 tbl-server-info">
                                        <thead class="bg-white text-uppercase">
                                            <tr class="ligth ligth-data">
                                                <th>#</th>
                                                <th>Amount</th>
                                                <th>Pack</th>
                                                <th v-if="perms.includes('edit-users') || perms.includes('delete-credits')">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody class="ligth-body">
                                            <tr v-for="(recharge,index) in user.recharges" :key="index">
                                                <td>{{ index + 1 }}</td>
                                                <td>{{ recharge.montant }} FCFA</td>  
                                                <td v-if="recharge.pack_id != null"> {{ recharge.pack_id }} </td>   
                                                <td v-else> Aucun </td>
                                                <td v-if="perms.includes('edit-users') || perms.includes('delete-credits')">
                                                    <div class="d-flex align-items-center list-action">
                                                        
                                                    
                                                        
                                                        <button v-if="perms.includes('delete-credits')"  class="btn bg-warning mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete"
                                                            @click="destroy(recharge.id)"><i class="fa fa-trash mr-0"></i></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>                
                            </div>
                            <div  class="tab-pane fade" id="another" role="tabpanel" aria-labelledby="another-tab">
                                <form @submit.prevent="assign" data-toggle="validator">
                                    
                                    <div class="row">
                                            <div>
                                                <input type="text" min="0" v-model="user.function"  class="form-control" placeholder="" readonly>
                                                <div class="help-block with-errors">
                                                </div>
                                                <div class="ml-5 row" v-if="user.permissions != null">
                                                    <div v-for="(init, index) in initials" :key="index" class="col-md-4">
                                                        <div v-if="perms.includes(init.name) == true">
                                                            <input type="checkbox" checked name="perms" :value="init.name" > {{ init.name }}
                                                        </div>
                                                        <div v-else>
                                                            <input type="checkbox" name="perms" :value="init.name" > {{ init.name }}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>                       
                                    </div>                            
                                    <button class="btn btn-primary mr-2"><i class="las la-plus mr-3"></i>Assigner</button> 

                                </form>
                            </div>
                        </div>
                            
                            <!-- <form  action="#" data-toggle="validator"> -->
                                
                                 
                                
                                
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
// Import stheet
import 'vue-loading-overlay/dist/vue-loading.css';
import Swal from 'sweetalert2'
import store  from '@/store'
export default {
    components: {
            Loading
    },
    data() {
        return {
            perms: [],
            user_perms: [],
            permissions: [],
            user:{},
            stored: store,
            packs:{},
            isLoading: false,
            fullPage: true,
            payload:{
                pack_id : null,
                montant : 0,
                user_id: this.$route.params.id
            },
            payload2:{
                permissions:[],
                user_id:null
            },
            initials: []
        };
    },
    mounted(){
        this.$store.state.user.permissions.forEach(element => {
            this.perms.push(element.name)
        });
        this.getPermissions()
        this.getUser()
        this.getPacks()
        this.permissions = document.getElementsByName("perms")
    },
    methods:{
        assign(){
            this.permissions = document.getElementsByName("perms")
            console.log('perms',this.permissions.value)
            this.payload2.user_id = this.user.id
            for (let i = 0; i < this.permissions.length; i++) {
                if (this.permissions[i].checked == true) {
                    this.payload2.permissions.push(this.permissions[i].value)
                }
            }
            console.log(this.payload2.permissions);
            axios.post(URL_API+'assignPermission', this.payload2)
            .then(response => {
                console.log('rep_perms',response.data)
                if(response.data.status){
                    Swal.fire(
                        'Operation Effectuée!',
                        'Permission assignée avec succès.',
                        'success'
                    )
                }
                })
            .catch(error => {
                console.log(error)
                this.errored = true
                this.isLoading = false
            })
        },
        store() {
            this.$router.push('/edit-user/'+this.$route.params.id)
        },
        destroy(id) {
            Swal.fire({
                title: 'Do you want to delete this reloading ?',
                text: "This action is irreversible!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Oui, supprimer!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.isLoading =  true
                    axios.delete(URL_API+'recharge/'+id)
                    .then(response => {
                        console.log(response.data)
                        this.isLoading =  false
                        Swal.fire(
                            'Supprimé!',
                            'The reloading was deleted.',
                            'success'
                        )
                        location.reload()
                    })
                    .catch(error => {
                        console.log(error)
                        this.errored = true
                        this.isLoading =  false
                    })
                    
                }
            })
            
        },
        recharger() {
            axios.post(URL_API+'recharge', this.payload)
            .then(function (reponse){
                console.log(reponse);
                if (reponse.data.status == true) {
                    Swal.fire('Réussi', '', 'success')
                }                
            })
            .catch(function (error){
                Swal.fire('Echec', 'Une erreur s\'est produite lors du rechargement', 'error')
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
                    response.data.data.permissions.forEach(element => {
                        this.perms.push(element.name)
                    });
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
        getPermissions() {
            this.isLoading = true
            
            axios.get(URL_API+'getPermissions')
            .then(response => {
                console.log(response.data)
                if (response.data.status == true) {
                    this.initials = response.data.data
                console.log('initials', this.initials);
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
        
        getPacks(){
            let app = this
            axios.get(URL_API+'packs')
            .then(function (reponse){
                console.log(reponse);
                if (reponse.data.status == true) {
                    app.packs = reponse.data.data
                }
            })
            .catch(function (error){
                console.log(error);
            })
        },
    }
}
</script>