<template>
    <div class="content-page">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex flex-wrap align-items-center justify-content-between mb-4">
                        <div>
                            <h4 class="mb-3">Liste des tickets Not Paids</h4>
                            
                        </div>
                        
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="table-responsive rounded mb-3">
                    <table id="example" class="data-table table mb-0 tbl-server-info">
                        <thead class="bg-white text-uppercase">
                            <tr class="ligth ligth-data">
                                <th>Code</th>
                                <th>Meal Quantity</th><th>Print date</th>
                                <th v-if="store.state.user.function == 'Personnel'">Status</th>
                                <th v-if="store.state.user.function == 'Personnel'">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="ligth-body">
                            <tr v-for="(ticket,index) in tickets" :key="index">
                                <td>{{ticket.code}}</td>
                                <td>{{ticket.qte}}</td><td>{{ticket.created_at}}</td>  
                                <td class="row" v-if="store.state.user.function == 'Personnel'">
                                    <p v-if="ticket.status == 1">Used, </p><p v-else> Not Used, </p><p v-if="ticket.paye == 1">Paid</p><p v-else> Not Paid</p>
                                </td>
                                <td v-if="store.state.user.function == 'Personnel'">
                                    <div class="d-flex align-items-center list-action">
                                        
                                        <router-link :to="'/show-ticket/'+ticket.id" 
                                                    class="badge badge-info mr-2" data-toggle="tooltip" data-placement="top" 
                                                    title="" data-original-title="View"><i class="fa fa-eye mr-0"></i>
                                        </router-link>
                                        
                                        
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
import store from '@/store'
import $ from "jquery"
import moment from 'moment'
moment.locale('fr')
export default {
    components: {
            Loading
    },
    data() {
        return {permissions: [],
            tickets:{},
            isLoading: false,
            fullPage: true,
            types: null,
            store: store
        };
    },
    mounted(){this.$store.state.user.permissions.forEach(element => {
            this.permissions.push(element.name)
        });
        this.getTickets('ticket-use-no-paye')
    },
    methods:{
        
        
        getTickets(arg) {
            this.isLoading =  true
            axios.get(URL_API+arg)
            .then(response => {
                console.log(response)
                $(document).ready( function () {
                            $('#example').DataTable(
                                {
                                    "lengthMenu": [ 5,10, 25, 50, 75, 100 , "All"],
                                    "pageLength": 10,
                                    'order':[],
                                    
                                }
                            );
                        } );
                        response.data.data.forEach(element => {
                    element.created_at = moment(element.created_at).format('DD/MM/YYYY')
                });
                this.tickets = response.data.data
                this.isLoading =  false
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
                title: 'Do you want to delete this ticket ?',
                text: "This action is irreversible!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Oui, supprimer!'
            }).then((result) => {
            if (result.isConfirmed) {
                this.isLoading =  true
                axios.delete(URL_API+'ticket-use-no-paye/'+id)
                .then(response => {
                    console.log(response.data)
                    this.tickets = response.data
                    this.isLoading =  false
                    Swal.fire(
                        'Supprimé!',
                        'The ticket was deleted.',
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
<style>
table{
    text-align: center;
}
</style>