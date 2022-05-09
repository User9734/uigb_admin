<template>
    <div class="content-page">
        <div class="container-fluid add-form-list">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Create a pack</h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <form action="page-list-category.html" @submit.prevent="store" data-toggle="validator">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Title*</label>
                                            <input type="text" v-model="pack.libelle" class="form-control" placeholder="Enter libelle" required>
                                        </div>
                                    </div>
                                    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Nombre de jours *</label>
                                            <input type="number" v-model="pack.jours" class="form-control" placeholder="Enter nombre de jours" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>                                 
                                </div>     
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Bonus *</label>
                                            <input type="number" v-model="pack.bonus" class="form-control" placeholder="Enter nombre de jours" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>    
                                </div>                     
                                <button type="submit" class="btn btn-primary mr-2">Save</button>
                                <button type="reset" class="btn btn-danger">reinitialiser</button>
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
export default {
    components: {
            Loading
    },
    data() {
        return {permissions: [],
            pack:{},
            isLoading: false,
            fullPage: true
        };
    },
    mounted(){this.$store.state.user.permissions.forEach(element => {
            this.permissions.push(element.name)
        });
    },

    methods:{
        store() {
            this.isLoading = true
            axios.post(URL_API+'packs', this.pack)
            .then(response => {
                console.log(response.data)
                this.pack = response.data
                this.isLoading = false
                if (response.data.status) {
                    Swal.fire(
                        'Ajouté!',
                        'The pack was created successfully..',
                        'success'
                    )
                    this.$router.push('/index-packs')
                     
                }
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                this.isLoading = false
            })
        },
        
    }
}
</script>