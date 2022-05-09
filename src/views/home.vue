<template>
    <div class="content-page home">
        <div class="container-fluid ">
            <div class="row ">
                <div class="col-lg-7 ">
                    <div class="card card-transparent card-block card-stretch card-height border-none">
                        <div class="card-body pt-30 mt-lg-2 mt-0">
                            <h3 class="mb-3">Hi , Mr. {{ this.nom }}</h3>
                            <!-- <h5 class="mb-0 mr-4" v-if="this.$store.state.user.function == 'Operator'">Bienvenue sur la page de contrôle de la restauration.</h5>
                            <h5 class="mb-0 mr-4" v-if="this.$store.state.user.function == 'Manager'">Bienvenue sur la page d'administration de la restauration.</h5>
                            <h5 class="mb-0 mr-4" v-if="this.$store.state.user.function == 'Staff'">Bienvenue sur la page d'administration de UIGB ...</h5> -->
                            <div class="row">
                                <img class="img" src="/assets/images/doigt.png" alt="" > <h4>Choose your actions here.</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
</template>

<script>

import store from '@/store'

export default {
    data(){
        return{
            nom: store.state.user.nom+' '+store.state.user.prenoms,
            
        }
    },
    
    methods: {
        
    },
    mounted(){
        this.today = new Date().toJSON().slice(0,10);
    },
}
</script>
<style>
.home{
    background-image: url('/assets/images/logo.png');
    background-size: cover;
    background-position: center;
    height: 300px;
}
.img{
    height: 100px;
    width: 100px;
}
h4{
    margin-top: auto;
}
</style>