<template>
    <div class="content-page">
        <div class="container-fluid add-form-list">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Details de profile</h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <form action="page-list-category.html" @submit.prevent="update" data-toggle="validator">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Title*</label>
                                            <input type="text" v-model="role.name" class="form-control" placeholder="Enter libelle" readonly>
                                        </div>
                                    </div>
                                    
                                                                    
                                </div>                              
                                <button v-if="permissions.includes('edit-profiles')" class="btn btn-primary mr-2">Modifier</button>
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


export default {
    components: {
            Loading
    },
    data() {
        return {permissions: [],
            role:{},
            isLoading: false,
            fullPage: true,
        };
    },
    mounted(){this.$store.state.user.permissions.forEach(element => {
            this.permissions.push(element.name)
        });
        
        this.getrole()
    },

    methods:{
        getrole() {
            let app = this
            this.isLoading = true
            axios.get(URL_API+'roles/'+this.$route.params.id)
            .then(reponse => {
                
                console.log(reponse.data)
                if (reponse.data.status == true) {
                    app.role = reponse.data.data
                    this.isLoading = false
                }
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                
            })
        },
        update(){
            this.$router.push('/edit-role/'+this.$route.params.id)
        }
    }
}
</script>