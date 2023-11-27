<template>
  <q-page padding class="text-center">
    <div >
      <q-icon name="account_circle" size="100px"/>
    </div>
    <br>
    <div style="display: inline-block; justify-content: center;">
      <q-input standout v-model="this.storeLogUser.username" :dense="dense" style="width: 300px;"/>
      <br>
      <q-input standout v-model="this.storeLogUser.email" hint="" :dense="dense" disable readonly style="width: 300px;" />
      <q-input standout v-model="this.storeLogUser.phone" :dense="dense" style="width: 300px;"/>
    </div>
    <br>
    <div class="q-pa-sm">
      <q-btn color="primary" label="save change"  @click="onEdit(this.storeLogUser.userid,this.storeLogUser.username,this.storeLogUser.phone)"/>
      <!-- this.storeLogUser.userid,this.storeLogUser.email,this.storeLogUser.phone -->
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
      storeLogUser: useLoginUserStore()
    }

  },
  methods:{

    onEdit(id,username,phone){
      const headers = {
        "x-access-token": this.storeLogUser.accessToken
      }
      this.$api
      .put('/dashboard/profile/'+id,{username,phone},{headers})
      .then((res)=>{
        if (res.status == 200) {

          console.log(id+username+phone);
            Notify.create({
              type: "positive",
              message: "Updated user ID: " + id,
            });
            if (this.storeLogUser.userid == res.data.id) {
              this.storeLogUser.username = res.data.username;
              this.storeLogUser.phone = res.data.phone;
            }

          }
      })
      .catch((err)=>{
        Notify.create({
              type: "negative",
              message: "Error Updated user ID: " + err.message,
            });
            console.log(id+username+phone);

      })
    },


  },
  async mounted(){

  }

})
</script>
<style lang="scss" scoped>

</style>
