<template>
    <div class="content-page">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex flex-wrap align-items-center justify-content-between mb-4">
                        <div>
                            <h4 class="mb-3">Liste des types de repas</h4>
                            
                        </div>
                        <router-link v-if="permissions.includes('create-meal-types')" to="/create-type-repas" class="btn btn-primary add-list" ><i class="las la-plus mr-3"></i>Add a Meal type </router-link>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="table-responsive rounded mb-3">
                    <table id="example" class="data-table table mb-0 tbl-server-info">
                        <thead class="bg-white text-uppercase">
                            <tr class="ligth ligth-data">
                                <th>Title</th>
                                <th>Price</th>
                                <th>Start hour</th>
                                <th>End hour</th>
                                <th v-if="permissions.includes('show-meal-types') || permissions.includes('delete-meal-types')">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="ligth-body">
                            <tr v-for="(type,index) in types" :key="index">
                                <td>{{type.libelle}}</td>
                                <td>{{type.cout}} FCFA</td> 
                                <td>{{type.hour_start}} </td> 
                                <td>{{type.hour_end}} </td>  
                                <td v-if="permissions.includes('show-meal-types') || permissions.includes('delete-meal-types')">
                                    <div class="d-flex align-items-center list-action">
                                        
                                        <router-link :to="'/show-type-repas/'+type.id" v-if="permissions.includes('show-meal-types')"
                                                    class="badge badge-info mr-2" data-toggle="tooltip" data-placement="top" 
                                                    title="" data-original-title="View"><i class="fa fa-eye mr-0"></i>
                                        </router-link>
                                        
                                        <button v-if="permissions.includes('delete-meal-types')" class="btn bg-warning mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete"
                                            @click="destroy(type.id)"><i class="fa fa-trash mr-0"></i></button>
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
import $ from "jquery"
export default {
    components: {
            Loading
    },
    data() {
        return {permissions: [],
            isLoading: false,
            fullPage: true,
            types: []
        };
    },
    mounted(){this.$store.state.user.permissions.forEach(element => {
            this.permissions.push(element.name)
        });
        this.getTypes()
    },
    methods:{
        getTypes(){
            let app = this
            app.isLoading = true
            axios.get(URL_API+'types-repas')
            .then(function (reponse){
                console.log('reponse', reponse)
                if (reponse.data.status) {
                    $(document).ready( function () {
                            $('#example').DataTable(
                                {
                                    "lengthMenu": [ 5,10, 25, 50, 75, 100 , "All"],
                                    "pageLength": 10,
                                    'order':[]
                                }
                            );
                        } );
                    app.types = reponse.data.data
                    app.isLoading = false
                }
                
            })
            .catch(function (error){
                console.log('error', error);
            })
        },
        destroy(id) {
            Swal.fire({
                title: 'Do you want to delete this Meal type ?',
                text: "This action is irreversible!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Oui, supprimer!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.isLoading =  true
                    axios.delete(URL_API+'types-repas/'+id)
                    .then(response => {
                        console.log(response)
                        if (response.data.status == true) {
                            this.isLoading =  false
                        Swal.fire(
                            'Supprimé!',
                            'The Meal type  was deleted.',
                            'success'
                        )
                        
                        }
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