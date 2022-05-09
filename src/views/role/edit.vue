<template>
    <div class="content-page">
        <div class="container-fluid add-form-list">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Edit a profile</h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <form action="page-list-category.html" @submit.prevent="store" data-toggle="validator">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Title*</label>
                                            <input type="text" v-model="role.name" class="form-control" placeholder="Enter libelle" required>
                                        </div>
                                    </div>
                                    
                                                                    
                                </div>                          
                                <button type="submit" class="btn btn-primary mr-2" v-if="permissions.includes('edit-profiles')">Save</button>
                                <button type="reset" class="btn btn-danger" v-if="permissions.includes('edit-profiles')">reinitialiser</button>
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
            role:{},
            isLoading: false,
            fullPage: true
        };
    },
    mounted(){this.$store.state.user.permissions.forEach(element => {
            this.permissions.push(element.name)
        });
        this.getrole()
    },

    methods:{
        store() {
            this.isLoading = true
            axios.put(URL_API+'roles/'+this.$route.params.id, this.role)
            .then(response => {
                console.log(response.data)
                this.role = response.data
                this.isLoading = false
                if (response.data.status) {
                    Swal.fire(
                        'Modifié!',
                        'The profile was edited successfully..',
                        'success'
                    )
                    this.$router.push('/index-roles')
                     
                }
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                this.isLoading = false
            })
        },
        getrole() {
            // this.isLoading = true
            let app = this
            console.log(this.$route.params.id)
            axios.get(URL_API+'roles/'+this.$route.params.id)
            .then(response => {
                console.log(response)
                
                if (response.data.status) {
                    app.role = response.data.data
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