<template>
  <q-page padding>
    <div >
asdsa
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useLoginUserStore } from 'src/stores/LoginUser';
import { Notify } from 'quasar';
export default defineComponent({
  name: 'UserProfilePage',
  data(){
    return{
      Myprofile: useLoginUserStore()
    }

  },
  methods:{
    updateMyData(id,data){
      const headers = {
        "x-access-token": this.storeLogUser.accessToken
      }
      this.$api
      .put('/dashboard/'+id,data,{headers})
      .then((res)=>{
        Notify.create({
              type: "positive",
              message: "Updated successfull" ,
            });
      })
      .catch((err)=>{
        Notify.create({
              type: "negative",
              message: err.message,
            });
      })
    }


  },
  async mounted(){

  }

})
</script>
<style lang="scss" scoped>

</style>
