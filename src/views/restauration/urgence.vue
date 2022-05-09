<template>
    <div class="content-page">
        <div class="container-fluid add-form-list">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between">
                            <div class="header-title">
                                <h4 class="card-title">Scanner un code</h4>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="qr pt-10">
                                <qrcode-stream @decode="onDecode"></qrcode-stream>
                            </div> 
                        </div>
                    </div>
                    
                </div>
            </div>
            <!-- Page end  -->
        </div>
    </div>
      
</template>
<script>
import axios from 'axios'
import {URL_API} from '@/config'
import Swal from 'sweetalert2'
export default {
    
    data(){
        return{
            payload: {
                code : ''
            },
            
        }
    },
    methods: {
  onDecode (decodedString) {
    this.payload.code = decodedString
    console.log('code', this.payload.code);
    axios.post(URL_API+'urgency-ticket', this.payload)
    .then(function (reponse){
        console.log('reponse', reponse);
        if (reponse.data.status == true) {
            Swal.fire('Réussi', reponse.data.message, 'success')
        }
        else{
            Swal.fire('Echec', reponse.data.message, 'error')
        }
    })
    .catch(function (error){
        console.log('error', error);
    })
  }
}
}
</script>
<style>
.qr{
    height: 150px;
    width: 150px;
    margin: auto;
}
</style>