<template>
    <div class="content-page">
        <div class="container-fluid">
            <div class="row">
                <div class="type_package" v-if="see_form == true">
                    <form  class="form" action="" @submit.prevent="importmenu">
                        Click here if you don't have a menu model <a :href="URL_API+'menu-export'" class="btn m-10 btn-primary add-list" ><i class="las la-plus mr-3"></i>Export model</a>
                        <br><br>
                        <input class="btn col-lg-9 mr-3 btn-primary add-list" type="file" name="" id="file" ref="photos" >
                        <button class="btn m-10 btn-primary add-list" type="submit">OK</button>
                    </form>
                </div>
                <div class="col-lg-12">
                    <div class="d-flex flex-wrap align-items-center justify-content-between mb-4">
                        <div>
                            <h4 class="mb-3">Weekly menus list</h4>
                            
                        </div>
                        <router-link v-if="permissions.includes('create-weekly-menus')" to="/create-semaine" class="btn btn-primary add-list" ><i class="las la-plus mr-3"></i>Add a weekly menu</router-link>
                        <a v-if="permissions.includes('create-weekly-menus')" @click="see" class="btn btn-primary add-list" ><i class="las la-plus mr-3"></i>Menu template</a>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="table-responsive rounded mb-3">
                    <table id="example" class="align data-table table mb-0 tbl-server-info">
                        <thead class="bg-white text-uppercase">
                            <tr class="ligth ligth-data">
                                <th>#</th>
                                <th>Title</th>
                                <th v-if="permissions.includes('show-weekly-menus')">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="ligth-body">
                            <tr v-for="(week,index) in weeks" :key="index">
                                <th> {{ week.numero }} </th>
                                <td>{{week.libelle}}</td>
                                <td v-if="permissions.includes('show-weekly-menus')">
                                    <div class="d-flex align-items-center list-action">
                                        
                                        <router-link :to="'/show-semaine/'+week.id" 
                                                    class="badge badge-info mr-2" data-toggle="tooltip" data-placement="top" 
                                                    title="" data-original-title="View"><i class="fa fa-eye mr-0"></i>
                                        </router-link>
                                        
                                        <!-- <button  class="btn bg-warning mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete"
                                            @click="destroy(week.id)"><i class="fa fa-trash mr-0"></i></button> -->
                                    </div>
                                </td>
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
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
import Swal from 'sweetalert2'
import $ from "jquery"
import store from '@/store'
export default {
    components: {
            Loading
    },
    data() {
        return {
            permissions: [],
            isLoading: false,
            fullPage: true,
            weeks: [],
            URL_API: URL_API,
            payload:{
                file: null
            },
            see_form: false
        };
    },
    mounted(){
        store.state.user.permissions.forEach(element => {
            this.permissions.push(element.name)
        });
        this.getweeks()
    },
    methods:{
        see(){
            this.see_form = true
        },
        importmenu(){
                    let app = this
                    var menuData = new FormData();
                    app.photos = app.$refs.photos.files
                    let file = app.photos[0];
                    if (file != null) {
                        menuData.append('file', file);
                        axios.post(URL_API+'menu-import', menuData)
                        .then(function (reponse){
                            Swal.fire('Success', 'Menu added', 'success')
                            console.log(reponse);
                        })
                        .catch(function (error){
                            Swal.fire('Failure', 'An error occured, menu not added', 'error')
                            console.log(error);
                        })
                        app.see_form = false
                    }
        },
        getweeks(){
            let app = this
            app.isLoading = true
            axios.get(URL_API+'semaines')
            .then(function (reponse){
                console.log('reponse', reponse)
                if (reponse.data.status) {
                    $(document).ready( function () {
                            $('#example').DataTable(
                                {
                                    "lengthMenu": [ 5,10, 25, 50, 75, 100 , "All"],
                                    "pageLength": 10,
                                    'order':[]
                                }
                            );
                        } );
                    app.weeks = reponse.data.data
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
<style>
.type_package{
position:fixed;
left:0;
top:0;
width:100%;
height:100%;
background:rgb(255, 255, 255);
z-index: 999;
display: flex;
padding:2em;
place-items: center;
justify-content:center;
}
.type_package form{
background: rgb(255, 255, 255);
width:500px;
height:300px;
padding:2em;
margin:0 auto;
border-radius:25px;
box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.295);
}
.align{
    text-align: center;
}
table{
    width: 100%;
}
</style>