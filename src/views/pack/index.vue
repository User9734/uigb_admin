<template>
    <div class="content-page">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex flex-wrap align-items-center justify-content-between mb-4">
                        <div>
                            <h4 class="mb-3">Packs list</h4>
                            
                        </div>
                        <router-link v-if="perms.includes('create-packs')" to="/create-pack" class="btn btn-primary add-list" ><i class="las la-plus mr-3"></i>Add a pack</router-link>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="table-responsive rounded mb-3">
                    <table id="example" class="data-table table mb-0 tbl-server-info">
                        <thead class="bg-white text-uppercase">
                            <tr class="ligth ligth-data">
                                <th>Title</th>
                                <th>Days</th>
                                <th>Bonus</th>
                                <th v-if="perms.includes('edit-packs') || perms.includes('delete-packs')">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="ligth-body">
                            <tr v-for="(pack,index) in packs" :key="index">
                                <td>{{pack.libelle}}</td>
                                <td>{{pack.jours}}</td> 
                                <td> {{ pack.bonus }} day(s) </td> 
                                <td v-if="perms.includes('edit-packs') || perms.includes('delete-packs')">
                                    <div class="d-flex align-items-center list-action">
                                        
                                        <router-link :to="'/show-pack/'+pack.id" v-if="perms.includes('edit-packs')"
                                                    class="badge badge-info mr-2" data-toggle="tooltip" data-placement="top" 
                                                    title="" data-original-title="View"><i class="fa fa-eye mr-0"></i>
                                        </router-link>
                                        
                                        <button v-if="perms.includes('delete-packs')" class="btn bg-warning mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete"
                                            @click="destroy(pack.id)"><i class="fa fa-trash mr-0"></i></button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
            <!-- Page end  -->
        </div>
        <!-- Modal Edit -->
        <div class="vld-parent">
                <loading :active.sync="isLoading" 
                :can-cancel="true" 
                :is-full-page="fullPage"></loading>
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
//import $ from "jquery"
export default {
    components: {
            Loading
    },
    data() {
        return {
            perms: [],
            packs:{},
            isLoading: false,
            fullPage: true,
        };
    },
    mounted(){
        this.$store.state.user.permissions.forEach(element => {
            this.perms.push(element.name)
        });
        this.getPacks()
    },
    methods:{
        getPacks(){
            let app = this
            axios.get(URL_API+'packs')
            .then(function (reponse){
                console.log(reponse);
                if (reponse.data.status == true) {
                    app.packs = reponse.data.data
                }
            })
            .then(function (error){
                console.log(error);
            })
        },
        destroy(id) {
            Swal.fire({
                title: 'Do you want to delete this pack ?',
                text: "This action is irreversible!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Oui, supprimer!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.isLoading =  true
                    axios.delete(URL_API+'packs/'+id)
                    .then(response => {
                        console.log(response.data)
                        this.isLoading =  false
                        Swal.fire(
                            'Supprimé!',
                            'The pack was deleted.',
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
    }
}
</script>