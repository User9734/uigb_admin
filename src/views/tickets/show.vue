<template>
    <div class="content-page">
        <div class="container-fluid add-form-list">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Tickets details</h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <form @submit.prevent="update" data-toggle="validator">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Code</label>
                                            <input class="form-control" v-model="ticket.code" type="text" name="" id="" readonly>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Meal type </label>
                                            <input class="form-control" v-model="ticket.type_repas.libelle" type="text" name="" id="" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Amount</label>
                                            <input class="form-control" v-model="ticket.type_repas.cout" type="text" name="" id="" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Quantity</label>
                                            <input class="form-control" v-model="ticket.qte" type="text" name="" id="" readonly>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Payment status</label>
                                            <input v-if="ticket.paye == 1" class="form-control" value="Paid" type="text" name="" id="" readonly>
                                            <input v-if="ticket.paye == 0" class="form-control" value="Not Paid" type="text" name="" id="" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>   
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Consumption status</label>
                                            <input v-if="ticket.paye == 1" class="form-control" value="Utlisié" type="text" name="" id="" readonly>
                                            <input v-if="ticket.paye == 0" class="form-control" value="Not Used" type="text" name="" id="" readonly>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Validité</label>
                                            <input class="form-control" :value="'Jusqu\'au '+ticket.validite" type="text" name="" id="" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Auteur</label>
                                            <input class="form-control" :value="ticket.user.nom+' '+ticket.user.prenoms" type="text" name="" id="" readonly>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>                             
                                </div>                            
                                <a class="btn btn-primary mr-2" @click="$router.go(-1)">Retour</a>
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
import moment from 'moment'
moment.locale('fr')


export default {
    components: {
            Loading
    },
    data() {
        return {permissions: [],
            isLoading: false,
            fullPage: true,
            ticket: {}
        };
    },
    mounted(){this.$store.state.user.permissions.forEach(element => {
            this.permissions.push(element.name)
        });
        this.getTicket()
        
    },

    methods:{
        getTicket() {
            this.isLoading =  true
            axios.get(URL_API+'ticket/'+this.$route.params.id)
            .then(reponse => {
                console.log(reponse)
                
                if (reponse.data.status == true) {
                    this.ticket = reponse.data.data
                    this.ticket.validite = moment(this.ticket.validite).format('DD-MM-YYYY')
                    
                }
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
        update(){
            this.$router.push('/index-tickets/')
        }
    }
}
</script>