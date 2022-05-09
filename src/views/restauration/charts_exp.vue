<template>
    <div class="content-page">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-5">
                    <div class="card card-transparent card-block card-stretch card-height border-none">
                        <div class="card-body p-0 mt-lg-2 mt-0">
                            <h3 class="mb-3">Bonjour {{ this.$store.state.user.nom }},</h3>
                        </div>
                    </div>
                </div>
                
                <div class="col-lg-12">
                    
                </div>

                <div class="col-lg-12">
                    <button class="btn btn-primary add-list col-lg-2 ml-5" @click="jour">Day</button>
                    <button class="btn btn-primary add-list col-lg-2 ml-5" @click="semaine">Custom</button>
                    <button class="btn btn-primary add-list col-lg-2 ml-5" @click="mois">Month</button>
                    <button class="btn btn-primary add-list col-lg-2 ml-5" @click="annee">Year</button>
                    <div class="card card-block card-stretch card-height">
                        
                        <div class="card-header d-flex align-items-center justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Tickets expirés</h4>
                            </div>
                                <div class="col-lg-3 header-title" v-if="state == 'jour'">
                                    Date : <input type="date" v-model="payload.jour" @change="getSells" class="form-control" >
                                </div>
                                <div class="col-lg-3 header-title" v-if="state == 'mois'">
                                    Month : <input type="month" v-model="payload.mois" @change="getSells" class="form-control" >
                                </div>
                                <div class="col-lg-3 header-title" v-if="state == 'annee'">
                                    Year : <input type="number" v-model="payload.annee" @change="getSells" class="form-control" placeholder="YYYY" min="2015" max="2100">
                                </div>
                                <div class="col-lg-3 header-title" v-if="state == 'semaine'">
                                    Debut : <input type="date" v-model="payload.from" class="form-control" >
                                </div>
                                <div class="col-lg-3 header-title" v-if="state == 'semaine'">
                                    Fin : <input type="date" v-model="payload.to" :min="payload.from"  @change="periode" name="" class="form-control">
                                </div>
                            
                        </div>
                        <div class="card-body">
                            <!-- <column-chart :data="data"></column-chart> -->
                            <column-chart :data="data"  xtitle="Temps" ytitle="Nombre"></column-chart> 
                        </div>
                        
                    </div>
                </div>       
            </div>
        </div>
      </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
//import store from '@/store'
import {URL_API} from '@/config'
export default {
    data(){
        return{
            state: null,
            data:[],
            payload: {
                jour: null,
                mois: null,
                annee: null,
                from: null,
                to: null,
                semaine: 0
            },
            today: null,
        }
    },
    computed: {
       
    },
    methods: {
        jour(){
            this.state = 'jour'
            this.payload.from = null
            this.payload.jour = null
            this.payload.mois = null
            this.payload.to = null
        },
        mois(){
            this.state = 'mois'
            this.payload.from = null
            this.payload.jour = null
            this.payload.mois = null
            this.payload.to = null
        },
        annee(){
            this.state = 'annee'
            this.payload.from = null
            this.payload.jour = null
            this.payload.mois = null
            this.payload.to = null
        },
        semaine(){
            this.state = 'semaine'
            this.payload.from = null
            this.payload.jour = null
            this.payload.mois = null
            this.payload.to = null
        },
        periode(){
            console.log(this.payload.from);
            if (this.payload.from != null) {
                if (this.payload.to != null) {
                    this.payload.jour = null
                    this.payload.mois = null
                    this.payload.annee = null
                    this.payload.semaine = 1
                    this.getSells()
                } else {
                    Swal.fire('Avertissement !', 'Entrez la date de fin')
                }
            } else {
                Swal.fire('Avertissement !', 'Entrez la date de debut')
            }
        },
        getSells(){
            let app = this
            axios.post(URL_API+'statistiqueExpired', app.payload)
            .then(function (reponse){
                console.log('reponse', reponse);
                if (reponse.data.status == true) {
                    app.data = reponse.data.data
                }
            })
            .catch(function (error){
                console.log('error', error);
            })
        }
        
    },
    mounted(){this.$store.state.user.permissions.forEach(element => {
            this.permissions.push(element.name)
        });
        
    },
}
</script>
