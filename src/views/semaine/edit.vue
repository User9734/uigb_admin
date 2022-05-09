<template>
    <div class="content-page">
        <div class="container-fluid add-form-list">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Edit a weekly menu</h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <a class="nav-link active" id="lundi-tab" data-toggle="tab" href="#lundi" role="tab" aria-controls="lundi" aria-selected="true">Lundi</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" id="mardi-tab" data-toggle="tab" href="#mardi" role="tab" aria-controls="mardi" aria-selected="true">Mardi</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" id="mercredi-tab" data-toggle="tab" href="#mercredi" role="tab" aria-controls="mercredi" aria-selected="true">Mercredi</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" id="jeudi-tab" data-toggle="tab" href="#jeudi" role="tab" aria-controls="jeudi" aria-selected="true">Jeudi</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" id="vendredi-tab" data-toggle="tab" href="#vendredi" role="tab" aria-controls="vendredi" aria-selected="true">Vendredi</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" id="samedi-tab" data-toggle="tab" href="#samedi" role="tab" aria-controls="samedi" aria-selected="false">Samedi</a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" id="dimanche-tab" data-toggle="tab" href="#dimanche" role="tab" aria-controls="dimanche" aria-selected="false">Dimanche</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="lundi" role="tabpanel" aria-labelledby="lundi-tab">
                                <div class="row">
                                    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Petit déjeuner *</label>
                                            <textarea v-model="weeks.jours[0].type_repas[0].pivot.libelle" name="" id="" cols="30" class="form-control" rows="2"></textarea>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Déjeuner *</label>
                                            <textarea v-model="weeks.jours[0].type_repas[1].pivot.libelle" name="" id="" cols="30" class="form-control" rows="2"></textarea>
                                        </div>
                                    </div>       
                                                          
                                </div>    
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Goûter *</label>
                                            <textarea v-model="weeks.jours[0].type_repas[2].pivot.libelle" name="" id="" cols="30" class="form-control" rows="2"></textarea>
                                        </div>
                                    </div>
                                    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Dîner *</label>
                                            <textarea v-model="weeks.jours[0].type_repas[3].pivot.libelle" name="" id="" cols="30" class="form-control" rows="2"></textarea>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>                                 
                                </div> 
                                <hr>
                            </div>
                            <div class="tab-pane fade show" id="mardi" role="tabpanel" aria-labelledby="mardi-tab">
                                <div class="row">
                                    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Petit déjeuner *</label>
                                            <textarea v-model="weeks.jours[1].type_repas[0].pivot.libelle" name="" id="" cols="30" class="form-control" rows="2"></textarea>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Déjeuner *</label>
                                            <textarea v-model="weeks.jours[1].type_repas[1].pivot.libelle" name="" id="" cols="30" class="form-control" rows="2"></textarea>
                                        </div>
                                    </div>                             
                                </div>    
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Goûter *</label>
                                            <textarea v-model="weeks.jours[1].type_repas[2].pivot.libelle" name="" id="" cols="30" class="form-control" rows="2"></textarea>
                                        </div>
                                    </div>
                                    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Dîner *</label>
                                            <textarea v-model="weeks.jours[1].type_repas[3].pivot.libelle" name="" id="" cols="30" class="form-control" rows="2"></textarea>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>                                 
                                </div> 
                                <hr>
                            </div>
                            <div class="tab-pane fade show" id="mercredi" role="tabpanel" aria-labelledby="mercredi-tab">
                                <div class="row">
                                    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Petit déjeuner *</label>
                                            <textarea v-model="weeks.jours[2].type_repas[0].pivot.libelle" name="" id="" cols="30" class="form-control" rows="2"></textarea>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Déjeuner *</label>
                                            <textarea v-model="weeks.jours[2].type_repas[1].pivot.libelle" name="" id="" cols="30" class="form-control" rows="2"></textarea>
                                        </div>
                                    </div>                             
                                </div>    
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Goûter *</label>
                                            <textarea v-model="weeks.jours[2].type_repas[2].pivot.libelle" name="" id="" cols="30" class="form-control" rows="2"></textarea>
                                        </div>
                                    </div>
                                    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Dîner *</label>
                                            <textarea v-model="weeks.jours[2].type_repas[3].pivot.libelle" name="" id="" cols="30" class="form-control" rows="2"></textarea>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>                                 
                                </div> 
                                <hr>
                            </div>
                            <div class="tab-pane fade show" id="jeudi" role="tabpanel" aria-labelledby="jeudi-tab">
                                <div class="row">
                                    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Petit déjeuner *</label>
                                            <textarea v-model="weeks.jours[3].type_repas[0].pivot.libelle" name="" id="" cols="30" class="form-control" rows="2"></textarea>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Déjeuner *</label>
                                            <textarea v-model="weeks.jours[3].type_repas[1].pivot.libelle" name="" id="" cols="30" class="form-control" rows="2"></textarea>
                                        </div>
                                    </div>                             
                                </div>    
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Goûter *</label>
                                            <textarea v-model="weeks.jours[3].type_repas[2].pivot.libelle" name="" id="" cols="30" class="form-control" rows="2"></textarea>
                                        </div>
                                    </div>
                                    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Dîner *</label>
                                            <textarea v-model="weeks.jours[3].type_repas[3].pivot.libelle" name="" id="" cols="30" class="form-control" rows="2"></textarea>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>                                 
                                </div> 
                                <hr>
                            </div>
                            <div class="tab-pane fade show" id="vendredi" role="tabpanel" aria-labelledby="vendredi-tab">
                                <div class="row">
                                    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Petit déjeuner *</label>
                                            <textarea v-model="weeks.jours[4].type_repas[0].pivot.libelle" name="" id="" cols="30" class="form-control" rows="2"></textarea>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Déjeuner *</label>
                                            <textarea v-model="weeks.jours[4].type_repas[1].pivot.libelle" name="" id="" cols="30" class="form-control" rows="2"></textarea>
                                        </div>
                                    </div>                             
                                </div>    
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Goûter *</label>
                                            <textarea v-model="weeks.jours[4].type_repas[2].pivot.libelle" name="" id="" cols="30" class="form-control" rows="2"></textarea>
                                        </div>
                                    </div>
                                    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Dîner *</label>
                                            <textarea v-model="weeks.jours[4].type_repas[3].pivot.libelle" name="" id="" cols="30" class="form-control" rows="2"></textarea>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>                                 
                                </div> 
                                <hr>
                            </div>
                            <div class="tab-pane fade show" id="samedi" role="tabpanel" aria-labelledby="samedi-tab">
                                <div class="row">
                                    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Petit déjeuner *</label>
                                            <textarea v-model="weeks.jours[5].type_repas[0].pivot.libelle" name="" id="" cols="30" class="form-control" rows="2"></textarea>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Déjeuner *</label>
                                            <textarea v-model="weeks.jours[5].type_repas[1].pivot.libelle" name="" id="" cols="30" class="form-control" rows="2"></textarea>
                                        </div>
                                    </div>                             
                                </div>    
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Goûter *</label>
                                            <textarea v-model="weeks.jours[5].type_repas[2].pivot.libelle" name="" id="" cols="30" class="form-control" rows="2"></textarea>
                                        </div>
                                    </div>
                                    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Dîner *</label>
                                            <textarea v-model="weeks.jours[5].type_repas[3].pivot.libelle" name="" id="" cols="30" class="form-control" rows="2"></textarea>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>                                 
                                </div> 
                                <hr>
                            </div>
                            <div class="tab-pane fade show" id="dimanche" role="tabpanel" aria-labelledby="dimanche-tab">
                                <div class="row">
                                    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Petit déjeuner *</label>
                                            <textarea v-model="weeks.jours[6].type_repas[0].pivot.libelle" name="" id="" cols="30" class="form-control" rows="2"></textarea>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Déjeuner *</label>
                                            <textarea v-model="weeks.jours[6].type_repas[1].pivot.libelle" name="" id="" cols="30" class="form-control" rows="2"></textarea>
                                        </div>
                                    </div>                             
                                </div>    
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Goûter *</label>
                                            <textarea v-model="weeks.jours[6].type_repas[2].pivot.libelle" name="" id="" cols="30" class="form-control" rows="2"></textarea>
                                        </div>
                                    </div>
                                    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Dîner *</label>
                                            <textarea v-model="weeks.jours[6].type_repas[3].pivot.libelle" name="" id="" cols="30" class="form-control" rows="2"></textarea>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>                                 
                                </div> 
                                <hr>
                            </div>
                            
                        </div>
                        <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>From : *</label>
                                            <input type="date" v-model="weeks.start" class="form-control" required>
                                        </div>
                                    </div>
                                    
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>To : *</label>
                                            <input type="date" v-model="weeks.end" class="form-control" required>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                    </div>                                 
                                </div>  
                        <button v-if="permissions.includes('edit-weekly-menus')" class="btn btn-primary mr-2" @click="test">Save</button>
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
export default {
    components: {
            Loading
    },
    data() {
        return {permissions: [],
            user:{},
            weeks:{
                start:null,
                end:null,
                jours:[]
            },
            isLoading: false,
            fullPage: true,
            
        };
    },
    mounted(){this.$store.state.user.permissions.forEach(element => {
            this.permissions.push(element.name)
        });
        this.getweeks()
        
    },
    methods:{
        test(){
            
            for (let i = 0; i < 7; i++) {
                for (let j = 0; j < 4; j++) {
                    var cpt = 0
                    if (this.weeks.jours[i].type_repas[j].pivot.libelle == '') {
                        cpt = cpt + 1
                       
                    }
                }
                
            }
            if (cpt > 0) {
                Swal.fire('Note', 'Fill all the fields.', 'info')
            }
            else {
                console.log('reponse', this.weeks)
                axios.put(URL_API+'semaines/'+this.$route.params.id, this.weeks)
                .then(function (reponse){
                console.log('reponse', reponse)
                if (reponse.data.status == true) {
                    Swal.fire(
                        'Done!',
                        'The weekly menu was edited successfully..',
                        'success'
                    )
                    this.$router.push('/index-semaines')
                    
                }
                
            })
            .catch(function (error){
                console.log('error', error);
            })
            }
            console.log(this.weeks.jours[0].type_repas[0].repas);
            console.log(this.weeks);
        },
        getweeks(){
            let app = this
            app.isLoading = true
            axios.get(URL_API+'semaines/'+this.$route.params.id)
            .then(function (reponse){
                console.log('reponse', reponse)
                if (reponse.data.status == true) {
                    
                    app.weeks.jours = reponse.data.data.jours
                    app.weeks.start = reponse.data.data.start
                    app.weeks.end = reponse.data.data.end
                    app.isLoading = false
                }
                
            })
            .catch(function (error){
                console.log('error', error);
            })
        },
        
    }
}
</script>