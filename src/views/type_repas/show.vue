<template>
    <div class="content-page">
        <div class="container-fluid add-form-list">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Details of Meal type </h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <form @submit.prevent="update" data-toggle="validator">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Title*</label>
                                            <input type="text" v-model="type.libelle" class="form-control" placeholder="Enter libelle" readonly required>
                                        </div>
                                    </div>
                                    
                                                                   
                                </div> 

                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Prix de vente *</label>
                                            <input type="number" v-model="type.cout" class="form-control" placeholder="Enter coût" readonly required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>  
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Prix d'achat *</label>
                                            <input type="number" v-model="type.buy_price" class="form-control" placeholder="Enter coût" readonly required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>    
                                </div>  
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Start hour *</label>
                                            <input type="time" v-model="type.hour_start" class="form-control" placeholder="Enter libelle" required readonly>
                                        </div>
                                    </div>
                                    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>End hour *</label>
                                            <input type="time" v-model="type.hour_end" class="form-control" placeholder="Enter coût" readonly required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>                                 
                                </div>                           
                                <button class="btn btn-primary mr-2" v-if="permissions.includes('edit-meal-types')">Modifier</button>
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
            type:{},
            isLoading: false,
            fullPage: true,
            
        };
    },
    mounted(){this.$store.state.user.permissions.forEach(element => {
            this.permissions.push(element.name)
        });
        this.getType()
    },

    methods:{
        getType() {
            this.isLoading = true
            axios.get(URL_API+'types-repas/'+this.$route.params.id)
            .then(response => {
                
                console.log(response)
                
                if (response.data.status) {
                    
                    this.type = response.data.data
                this.isLoading = false
                }
            })
            .catch(error => {
                console.log(error)
                this.errored = true
                this.isLoading = false
            })
        },
        update(){
            this.$router.push('/edit-type-repas/'+this.$route.params.id)
        }
    }
}
</script>