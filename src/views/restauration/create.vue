<template>
    <div class="content-page">
        <div class="container-fluid add-form-list">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Restauration</h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <form @submit.prevent="store" data-toggle="validator">
                                <div class="row">
                                     
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Code *</label>
                                            <input v-model="product.code" id="code" type="text" class="form-control"  required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>                                 
                                </div>                            
                                <!-- <button type="submit" class="btn btn-primary mr-2">Save</button>
                                <button type="reset" class="btn btn-danger">reinitialiser</button> -->
                            </form>
                            <div class="table-responsive rounded mb-3">
                    <table id="tbl_exporttable_to_xls" class="data-table table mb-0 tbl-server-info">
                        <thead class="bg-white text-uppercase">
                            <tr class="ligth ligth-data">
                                <th>Code</th>
                                <th>Meal type </th>
                                <th>Quantity</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody class="ligth-body">
                            <tr v-for="(stock,index) in tickets" :key="index">
                                <td>{{stock.code}}</td>
                                <td>{{stock.type_repas.libelle}}</td>  
                                <td> {{ stock.qte }} </td>
                                <td v-if="stock.status == 1"> Used </td>  
                                <td v-else>Not Used</td> 
                                
                                
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        &nbsp;
                    </div>
                    <button v-if="perms.includes('export-tickets')" class="btn mt-10 btn-primary mr-2" @click="ExportToExcel('xlsx')">Export</button>
                </div>
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
import * as XLSX from 'xlsx/xlsx.mjs'
import axios from "axios";
import {URL_API} from '@/config'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Swal from 'sweetalert2'
export default {
    components: {
            Loading
    },
    data() {
        return {
            perms: [],
            product:{
                code: ''
            },
            isLoading: false,
            fullPage: true,
            tickets: {}
        };
    },
    mounted(){this.$store.state.user.permissions.forEach(element => {
            this.perms.push(element.name)
        });
        document.getElementById("code").focus();
        this.getTickets()
    },
    methods:{

        store() {
            this.isLoading = true
            axios.post(URL_API+'valider-ticket', this.product)
            .then(response => {
                console.log(response.data)
                this.isLoading = false
                
                if (response.data.status == true) {
                    Swal.fire(
                        response.data.message,
                         '',
                        'success'
                    )
                    this.product.code = ''
                    document.getElementById("code").focus();
                    this.getTickets()
                }
                else{
                    Swal.fire(
                        
                        response.data.message ,
                        '',
                        'error'
                    )
                    this.product.code = ''
                    document.getElementById("code").focus();
                }
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                this.isLoading = false
            })
        },
       getTickets(){
           axios.get(URL_API+'ticket-du-jour')
           .then(response => {
                console.log(response.data)
                this.isLoading = false
                
                if (response.data.status == true) {
                    this.tickets = response.data.data
                }
                
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                this.isLoading = false
            })
       },
       ExportToExcel(type, fn, dl) {
       var elt = document.getElementById('tbl_exporttable_to_xls');
       var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
       return dl ?
         XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }):
         XLSX.writeFile(wb, fn || ('Sells sheet - '+ new Date() +'.' + (type || 'xlsx')));
    },
    }
}
</script>