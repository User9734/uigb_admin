<template>
    <div class="content-page">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex flex-wrap align-items-center justify-content-between mb-4">
                        <div>
                            <h4 class="mb-3">Profiles list</h4>
                            
                        </div>
                        <router-link v-if="perms.includes('create-profiles')" to="/create-role" class="btn btn-primary add-list" ><i class="las la-plus mr-3"></i>Add a profile</router-link>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="table-responsive rounded mb-3">
                    <table id="example" class="data-table table mb-0 tbl-server-info">
                        <thead class="bg-white text-uppercase">
                            <tr class="ligth ligth-data">
                                <th>Title</th>
                                <th colspan="2" v-if="perms.includes('edit-profiles') || perms.includes('delete-profiles')">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="ligth-body">
                            <tr v-for="(role,index) in roles" :key="index">
                                <td class="norm">{{role.name}}</td>
                                        
                                        <td v-if="perms.includes('show-profiles') || perms.includes('delete-profiles')">
                                            <router-link :to="'/show-role/'+role.id" v-if="perms.includes('show-profiles')"
                                                    class="badge badge-info mr-2" data-toggle="tooltip" data-placement="top" 
                                                    title="" data-original-title="View"><i class="fa fa-eye mr-0"></i>
                                        </router-link>
                                        <button v-if="perms.includes('delete-profiles')"  class="btn bg-warning mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" 
                                            @click="destroy(role.id)"><i class="fa fa-trash mr-0"></i></button>
                                        <button  v-else class="btn bg-warning mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" disabled="disabled"><i class="fa fa-trash mr-0"></i></button>
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
        return {
            perms: [],
            roles:{},
            isLoading: false,
            fullPage: true,
        };
    },
    mounted(){this.$store.state.user.permissions.forEach(element => {
            this.perms.push(element.name)
        });
        this.getroles()
    },
    methods:{
        getroles(){
            let app = this
            axios.get(URL_API+'roles')
            .then(function (reponse){
                console.log(reponse);
                if (reponse.data.status == true) {
                    $(document).ready( function () {
                            $('#example').DataTable(
                                {
                                    "lengthMenu": [ 5,10, 25, 50, 75, 100 , "All"],
                                    "pageLength": 10,
                                    'order':[]
                                }
                            );
                        } );
                    app.roles = reponse.data.data
                }
            })
            .then(function (error){
                console.log(error);
            })
        },
        destroy(id) {
            Swal.fire({
                title: 'Do you want to delete this profile ?',
                text: "This action is irreversible!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Oui, supprimer!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.isLoading =  true
                    axios.delete(URL_API+'roles/'+id)
                    .then(response => {
                        console.log(response.data)
                        this.isLoading =  false
                        Swal.fire(
                            'Supprimé!',
                            'The profile was deleted.',
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
