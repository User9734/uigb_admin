<template>
    <div class="content-page">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex flex-wrap align-items-center justify-content-between mb-4">
                        <div>
                            <h4 class="mb-3">Reloadings list</h4>
                            
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="table-responsive rounded mb-3">
                    <table id="example" class="data-table table mb-0 tbl-server-info">
                        <thead class="bg-white text-uppercase">
                            <tr class="ligth ligth-data">
                                <th>#</th>
                                <th>Amount</th>
                                <th>Beneficiary</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody class="ligth-body">
                            <tr v-for="(recharge,index) in recharge" :key="index">
                                <td>{{ index + 1 }}</td>
                                <td>{{ recharge.montant }} FCFA</td>  
                                <td>{{ recharge.user.nom +' '+recharge.user.prenoms }}</td> 
                                <td v-if="recharge.pack != null"> Intern </td>   
                                <td v-else> Extern </td>
                                
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
        return {permissions: [],
            recharge:{},
            isLoading: false,
            fullPage: true,
        };
    },
    mounted(){this.$store.state.user.permissions.forEach(element => {
            this.permissions.push(element.name)
        });
        this.getPacks()
    },
    methods:{
        getPacks(){
            let app = this
            app.isLoading = true
            axios.get(URL_API+'recharge')
            .then(function (reponse){
                console.log(reponse);
                if (reponse.data.status == true) {
                    app.recharge = reponse.data.data
                }
            })
            .catch(function (error){
                console.log(error);
            })
            app.isLoading = false
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
    }
}
</script>