<template>
 <!-- <img
    src="../image/backgound v.2.png"
    alt=""
    style="
      pointer-events: none;
      position: absolute;
      width: 100%;
      height: 100%;
      filter: blur(5px);
      margin-left: -2px;
    "
  /> -->
<q-page class="page"  padding>

  <div class="q-pa-md row items-start q-gutter-md">
    <!-- card1 -->

    <q-card class="my-card" flat bordered v-bind="WashMachine" v-for="WashMachine in this.Datawash" :key="WashMachine">
      <q-img src="../image/animation03.gif" v-if="WashMachine.Status == 'inuse'" :key="WashMachine.Status"/>
      <q-img src="../image/Logo laundry 03.png" v-else/>

      <q-card-section :key="WashMachine.Status">
        <div class="text-overline text-red-9" v-if="WashMachine.Status == 'inuse'" >In use</div>
        <div class="text-overline text-green-9" v-else>Not use</div>

        <div class="text-h5 q-mt-sm q-mb-xs">{{ WashMachine.name }}</div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat color="primary" label="Report" @click="onReport(WashMachine.id,WashMachine.name)"/>
        <q-btn flat color="secondary" label="Book" @click="onBook(WashMachine.id,WashMachine.name)"/>

        <q-space />

        <q-btn
          :key="WashMachine.id"
          color="grey"
          round
          flat
          dense
          :icon="WashMachine.id ? 'keyboard_arrow_down' : 'keyboard_arrow_up'"
          @click="WashMachine.id =! WashMachine.id"
        />
      </q-card-actions>

      <q-slide-transition>
        <div v-show="!WashMachine.id" style="background-color: rgb(251,236,204);">
          <q-separator />
          <q-card-section class="text-subtitle2" >
            <span>User :</span>
            {{ WashMachine.username }}
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>

  </div>

</q-page>

</template>

<script>
import { defineComponent } from "vue";
import { useLoginUserStore } from "src/stores/LoginUser";
import {useWashingMachineStore} from "src/stores/WashingMachine"
import {ErrorHandle} from '../utils/ErrorHandle'

export default defineComponent({
  name: "DashbordPage",
  data() {
    return {
      expanded: false,
      Datawash: [],
      storeLogUser: useLoginUserStore(),
      storeWash : useWashingMachineStore()
    };
  },
  methods:{

    ShowWash(){
      const headers = {
        "x-access-token": this.storeLogUser.accessToken
      }
      this.$api
      .get('/dashboard/allwash',{headers})
      .then((res)=>{
        this.Datawash = res.data
      })
      .catch((err)=>{
        ErrorHandle(err.response.status,err,this.$router)

      }

      )
    },
    onBook(id,name){

      this.storeWash.washid = id
      this.storeWash.name = name
      this.$router.push('/laundry/booking')

    },
    onReport(id,name){
      this.storeWash.washid = id
      this.storeWash.name = name
      this.$router.push('/laundry/report')
    },
  },
  async mounted(){
    await this.ShowWash()
  },
});
</script>
<style lang="scss" scoped>
.page{
  background-color: #74dde4;
}
</style>

