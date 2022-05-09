<template>
    <div class="content-page">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12">
                    <div class="d-flex flex-wrap align-items-center justify-content-between mb-4">
                        <div>
                            <h4 class="mb-3">Expired tickets list</h4>
                        </div>
                        <div class="row" v-if="permissions.includes('filter-tickets')">
                            From : <input class="form-control col-lg-4" @change="first" type="date" v-model="payload.from" name="" id="">
                            To : <input class="form-control col-lg-4" @change="second" type="date" v-model="payload.to" name="" id="">
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="table-responsive rounded mb-3" v-if="payload.from != '' && payload.to != ''">
                        <table id="tbl_exporttable_to_xls"  class="data-table table mb-0 tbl-server-info">
                            <thead class="bg-white text-uppercase">
                                <tr class="ligth ligth-data">
                                    <th>Meal type </th>
                                    <th>Quantity</th>
                                    <th>Unit price</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody class="ligth-body">
                                <tr v-for="(bail,index) in bails" :key="index">
                                    <td>{{bail.libelle}}</td>
                                    <td>{{bail.qteTotal}}</td>
                                    <td>{{bail.buy_price}}</td>
                                    <td>{{bail.coutTotal}} FCFA</td>  
                                </tr>
                                <tr>
                                    <td>Total amount : </td>
                                    <td></td>
                                    <td></td>
                                    <td> {{ this.cout }} FCFA</td>
                                </tr>
                            </tbody>
                        </table>
                        <button v-if="permissions.includes('export-tickets')" @click="ExportToExcel('xlsx')" class="btn mt-10 btn-primary mr-2">Export</button>
                    </div>
                    <div class="table-responsive rounded mb-3" v-else>
                        <table id="tbl_exporttable_to_xls1"  class="data-table table mb-0 tbl-server-info">
                            <thead class="bg-white text-uppercase">
                                <tr class="ligth ligth-data">
                                    <th>Code</th>
                                    <th>Quantity</th>
                                    <th>Valid until</th>
                                </tr>
                            </thead>
                            <tbody class="ligth-body">
                                <tr v-for="(bail,index) in tickets" :key="index">
                                    <td>{{bail.code}}</td>
                                    <td>{{bail.qte}}</td>
                                    <td>{{bail.validite}}</td>
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
import * as XLSX from 'xlsx/xlsx.mjs'
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
import Swal from 'sweetalert2'
import $ from "jquery"
import moment from 'moment';
moment.locale('fr')
export default {
    components: {
            Loading
    },
    data() {
        return {permissions: [],
            tickets:{},
            bails:[],
            payload:{
                from: '',
                to: '',
                expired: 1,
                valid: 0,
            },
            cout: 0,
            isLoading: false,
            fullPage: true,
            types: null
        };
    },
    mounted(){this.$store.state.user.permissions.forEach(element => {
            this.permissions.push(element.name)
        });
        this.getTickets('tiket-expired')
    },
    methods:{
         ExportToExcel(type, fn, dl) {
       var elt = document.getElementById('tbl_exporttable_to_xls');
       var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
       return dl ?
         XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }):
         XLSX.writeFile(wb, fn || ('Sells sheet - '+ this.payload.from +'-'+ this.payload.to +'.' + (type || 'xlsx')));
    },
    ExportToExcel1(type, fn, dl) {
       var elt = document.getElementById('tbl_exporttable_to_xls1');
       var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
       return dl ?
         XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }):
         XLSX.writeFile(wb, fn || ('Sells sheet - '+ this.payload.from +'-'+ this.payload.to +'.' + (type || 'xlsx')));
    },
        getBails() {
            this.isLoading =  true
            axios.post(URL_API+'calcul-ticket', this.payload)
            .then(reponse => {
                console.log('bails', reponse)
                if (reponse.data.status == true) {
                    /* $(document).ready( function () {
                            $('#tbl_exporttable_to_xls').DataTable(
                                {
                                    "lengthMenu": [ 5,10, 25, 50, 75, 100 , "All"],
                                    "pageLength": 3,
                                    'order':[],
                                    'retrieve': true,
                                }
                            );
                        } ); */
                    this.bails = reponse.data.data
                    this.cout = reponse.data.cout
                    if (this.bails.length == 0) {
                        Swal.fire('Note', 'Pas de ticket expiré dans cette période!', 'info')
                    }
                }
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                
            })
            this.isLoading = false
        },
        first() {
            if (this.payload.from != '') {
                if (this.payload.to != '') {
                    this.getBails()
                } else {
                    Swal.fire('Note', 'Enter end date.', 'info')
                }
            } else {
                Swal.fire('Note', 'Enter begin date.', 'info')
            }
        },
        second() {
            if (this.payload.to != '') {
                if (this.payload.from != '') {
                    this.getBails()
                } else {
                    Swal.fire('Note', 'Enter begin date.', 'info')
                }
            } else {
                Swal.fire('Note', 'Enter end date.', 'info')
            }
        },
        getTickets(arg) {
            this.isLoading =  true
            axios.get(URL_API+arg)
            .then(response => {
                console.log(response)
                $(document).ready( function () {
                            $('#tbl_exporttable_to_xls1').DataTable(
                                {
                                    "lengthMenu": [ 3, 5,10, 25, 50, 75, 100 ],
                                    "pageLength": 3,
                                    'order':[],
                                    'retrieve': true,
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
                axios.delete(URL_API+'tiket-expired/'+id)
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