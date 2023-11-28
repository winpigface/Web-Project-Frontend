<template >
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
  <!-- table -->
  <q-page style="background-color: aquamarine;">
    <div class="container">

    <div class="box1" style="grid-area: table;  background-color: rgb(251,236,204);">
      <div class="q-pa-md" style="" >
        <h4 style="margin: 10px; font-weight: bold;">{{ this.storeWash.name }}</h4>
        <q-table  :rows="rows" :columns="columns" row-key="username" :pagination="paginations" bordered>
        <template #body="props">
          <q-tr :props="props">
            <q-td key="username" :props="props"> {{ props.row.username }}</q-td>
            <q-td key="book_from" :props="props"> {{ props.row.book_from }}</q-td>
            <q-td key="book_to" :props="props"> {{ props.row.book_to }}</q-td>
            <q-td key="Status" :props="props" v-if="props.row.Status == 'wait'">
              <q-chip color="orange" text-color="white"  label="Wait" />
            </q-td>
             <q-td key="Status" :props="props" v-if="props.row.Status == 'inuse'">
              <q-chip color="red" text-color="white"  label="Inuse" />
            </q-td>
            <q-td key="Status" :props="props" v-if="props.row.Status == 'finish'">
              <q-chip color="green" text-color="white"  label="Finish"/>
            </q-td>
          </q-tr>
        </template>
      </q-table>
      </div>

    </div>

    <div class="" style="grid-area: book; background-color: rgb(59, 144, 255);">
      <div class="" >
        <h4 style="font-weight: bold; margin-left: 10px; margin-top: 6px; text-align: center; ">Choose Time</h4>

        <div class="q-pa-md text-center" >
          <q-time
            v-model="book_from"
            format24h
            now-btn
            color="secondary"

          />
        </div>
      </div>

      <div >

        <div class="q-pa-md text-center" style="">
          <q-btn-toggle
          class="btn-toggle"

            v-model="options_book_to"
            color="info"
            toggle-color="secondary"
            no-caps
            :options="[
              {label: '30min', value: 1},
              {label: '1hr', value: 2},
              {label: '1hr 30min', value: 3},
              {label: '2hr', value: 4}
            ]"
          />
        </div>
      </div>


    </div>
      <div class="btn">
         <q-btn color="red" icon-right="close" label="Cancel"  @click="BacktoDashboard"/>
          <q-btn color="secondary"  icon-right="send" label="Confirm" @click="ConfirmBook"/>
      </div>
  </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useLoginUserStore } from "src/stores/LoginUser";
import {useWashingMachineStore} from "src/stores/WashingMachine"
import {ErrorHandle} from '../utils/ErrorHandle'
import { Notify } from "quasar";
export default defineComponent({
  name: "BookingPage",
  data() {
    return {
      dataready: false,
      rows: [],
      columns:[
      {
          name: "username",
          label: "Username",
          field: "username",
          align: "center",
          sortable: true,
        },
        {
          name: "book_from",
          label: "From",
          field: "book_from",
          align: "left",
          sortable: true,
        },
        {
          name: "book_to",
          label: "To",
          field: "book_to",
          align: "left",
          sortable: true,
        },
        {
          name: "Status",
          label: "Status",
          field: "Status",
          align: "left",
          sortable: true,
        }
    ],
      paginations: { rowsPerPage: 4 },
      model: "one",
      secondModel: "one",
      storeLogUser: useLoginUserStore(),
      storeWash : useWashingMachineStore(),
      book_from: null,
      options_book_to: null

    };
  },
  methods:{
    getEachBook(){
      const headers = {
        "x-access-token": this.storeLogUser.accessToken
      }
        this.$api
        .get('/dashboard/'+this.storeWash.washid,{headers})
        .then((res)=>{
          if(res.status == 200){
            console.log(res.data);
            console.log(this.storeWash.washid);
          this.rows = res.data
        }
        })
        .catch((err)=>{
        ErrorHandle(err.response.status,err,this.$router)
        })
    },
    ConfirmBook(){
      const headers = {
        "x-access-token": this.storeLogUser.accessToken
      }
      const data = {
          email: this.storeLogUser.email,
          washing_machine_id : this.storeWash.washid,
          book_from : this.book_from,
          option: this.options_book_to,
      }
      this.$api
    .post('/dashboard',data,{headers})
      .then((res)=>{
        if(res.status == 200){
          Notify.create({
            type: "positive",
            message: "Create sucessfully",
          })
          this.getEachBook();
        }
      })
      .catch((err)=>{
        ErrorHandle(err.response.status,err,this.$router)
      })

    },
    BacktoDashboard(){
      this.$router.push('/laundry/dashbord')
    }
  },
  async mounted() {
    await this.getEachBook();
    this.dataready = true;
  },
  async beforeRouteLeave(){
    useWashingMachineStore().clearStorage()
  },

});




</script>

<style scoped>
  .container{
    height: auto;
    width: 100%;
    margin: 0px;
  display: block;
}
.container{
  height: auto;
  display: grid;
  grid-template-areas: 'table book'
                        'table  button';
}
.btn-toggle{
  scale: 1.5;
}
.btn{
  display: flex;
  justify-content: center;
  grid-area: button;
  background-color:rgb(59, 144, 255) ;
  margin: 0px;
}
@media screen and (min-width: 340px) and (max-width: 1200px){
  .container{
    display: block;
  }
  .btn-toggle{
  scale: 1.2;
}
}
*{
  margin: 0;}
</style>
