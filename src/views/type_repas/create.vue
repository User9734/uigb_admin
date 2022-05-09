<template>
    <div class="content-page">
        <div class="container-fluid add-form-list">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Add a Meal type </h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <form @submit.prevent="store" data-toggle="validator">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Title*</label>
                                            <input type="text" v-model="type.libelle" class="form-control" placeholder="Enter libelle" required>
                                        </div>
                                    </div>
                                    
                                                                   
                                </div> 

                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Prix de vente *</label>
                                            <input type="number" v-model="type.cout" class="form-control" placeholder="Enter coût" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>  
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Prix d'achat *</label>
                                            <input type="number" v-model="type.buy_price" class="form-control" placeholder="Enter coût" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>    
                                </div>   

                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Start hour *</label>
                                            <input type="time" v-model="type.hour_start" class="form-control" placeholder="Enter libelle" required>
                                        </div>
                                    </div>
                                    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>End hour *</label>
                                            <input type="time" v-model="type.hour_end" class="form-control" placeholder="Enter coût" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>                                 
                                </div> 
                                <!-- <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Start hour *</label>
                                            <input type="time" v-model="type.db" class="form-control" placeholder="Enter libelle" required>
                                        </div>
                                    </div>
                                    
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>End hour *</label>
                                            <input type="time" v-model="type.fn" class="form-control" placeholder="Enter coût" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>                                 
                                </div> -->                        
                                <button type="submit" class="btn btn-primary mr-2">Save</button>
                                <button type="reset" class="btn btn-danger">reinitialiser</button>
                            </form>
                        </div>
                    </div>
                    <div class="vld-parent">
                        <loading :active.sync="isLoading" 
                        :can-cancel="true" 
                        :on-cancel="onCancel"
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
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Swal from 'sweetalert2'
export default {
    components: {
            Loading
    },
    data() {
        return {permissions: [],
            type:{},
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
            axios.post(URL_API+'types-repas', this.type)
            .then(response => {
                
                console.log(response.data)
                this.isLoading = false
                
                if (response.data.status) {
                    Swal.fire(
                        'Done!',
                        'The Meal type  was created successfully..',
                        'success'
                    )
                    this.$router.push('/index-types-repas')
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