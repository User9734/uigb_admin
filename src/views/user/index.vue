<template>
    <div class="content-page">
        <div class="container-fluid">
            <div class="row" v-if="permissions">
                <div class="col-lg-12">
                    <div class="d-flex flex-wrap align-items-center justify-content-between mb-4">
                        <div>
                            <h4 class="mb-3">Users list</h4>
                            
                        </div>
                        <a href="/create-user" v-if="permissions.includes('create-users')" class="btn btn-primary add-list" ><i class="las la-plus mr-3"></i>Add a user</a>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="table-responsive rounded mb-3">
                    <table id="example" class="data-table table mb-0 tbl-server-info">
                        <thead class="bg-white text-uppercase">
                            <tr class="ligth ligth-data">
                                <th>Last name</th>
                                <th>First name</th>
                                <th>Phone</th>
                                <th>Profile</th>
                                <th v-if="permissions.includes('show-users') || permissions.includes('delete-users')">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="ligth-body">
                            <tr v-for="(user,index) in users" :key="index">
                                <td>{{user.nom}}</td>
                                <td>{{user.prenoms}}</td>  
                                <td>{{user.phone}}</td> 
                                
                                <td> {{ user.function }} </td>
                                <td v-if="permissions.includes('show-users') || permissions.includes('delete-users')">
                                    <div class="d-flex align-items-center list-action">
                                        <router-link :to="'/show-user/'+user.id" v-if="permissions.includes('show-users')"
                                                    class="badge badge-info mr-2" data-toggle="tooltip" data-placement="top" 
                                                    title="" data-original-title="View"><i class="fa fa-eye mr-0"></i>
                                        </router-link>
                                        
                                        <button v-if="permissions.includes('delete-users')"  class="badge bg-warning mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete"
                                            @click="destroy(user.id)"><i class="fa fa-trash mr-0"></i></button>
                                    </div>
                                </td>
                            </tr>
                            
                            
                        </tbody>
                    </table>
                </div>
                <div class="vld-parent">
                    <loading :active.sync="isLoading" 
                    :can-cancel="true" 
                    :is-full-page="fullPage"></loading>
                </div>
            </div>
        </div>
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
            permissions: [],
            users:{},
            isLoading: false,
            fullPage: true,
            
        };
    },
    mounted(){
        this.$store.state.user.permissions.forEach(element => {
            this.permissions.push(element.name)
        });
        this.getusers()
    },
    methods:{
        getusers() {
            this.isLoading =  true
            axios.get(URL_API+'users')
            .then(response => {
                console.log(response)
                if (response.data.status == true) {
                    $(document).ready( function () {
                            $('#example').DataTable(
                                {
                                    "lengthMenu": [ 5,10, 25, 50, 75, 100 , "All"],
                                    "pageLength": 10,
                                    'order':[]
                                }
                            );
                        } );
                this.users = response.data.data
                this.isLoading =  false
                }
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                Swal.fire(
                        'Erreur!',
                        'An error occured while fetching datas',
                        'error'
                )
                this.isLoading =  false
            })
        },
        destroy(id) {
            Swal.fire({
                title: 'Do you want to delete this user?',
                text: "This action is irreversible!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Oui, supprimer!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.isLoading =  true
                    axios.delete(URL_API+'users/'+id)
                    .then(response => {
                        console.log(response.data)
                        this.users = response.data
                        this.isLoading =  false
                        Swal.fire(
                            'Supprimé!',
                            'The user was deleted.',
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