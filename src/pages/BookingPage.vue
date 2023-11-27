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
  <q-page   >
    <div class="container">

    <div class="box1" style="border: 1px solid purple; grid-area: table;">
      <!-- <h1 style="font-size: 30px; font-weight: bold; margin-left: 5%; ">Time user</h1> -->
      <div>{{ this.book_from }}</div>
      <div>{{ this.options_book_to }}</div>
      <div class="q-pa-md" style="" >
        <h4 style="margin: 10px;">{{ this.storeWash.name }}</h4>
        <q-table  :rows="rows" :columns="columns" row-key="username" :pagination="paginations" bordered  style=" ">
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
              <q-chip color="green" text-color="white"  label="Finish" />
            </q-td>
          </q-tr>

        </template>
      </q-table>
      </div>
    </div>

    <div class="" style="border: 1px solid black; grid-area: book;">
      <div class="" >
        <h6 style="font-weight: bold; margin-left: 10px;text-align: center; ">Choose Time</h6>

        <div class="q-pa-md text-center" >
          <q-time
            v-model="book_from"
            format24h
            now-btn

          />
        </div>
      </div>

      <div >

        <!-- <h1 style="font-size: 30px; font-weight: bold; margin-left: 5%">Choose Option</h1> -->

        <div class="q-pa-md text-center" style="border: 1px solid red">
          <q-btn-toggle
          class="btn-toggle"

            v-model="options_book_to"
            toggle-color="primary"
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
         <q-btn color="red" icon-right="close" label="Cancel" @click="BacktoDashboard"/>
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
  setup() {
    return {

    };
  },

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
.my-custom-toggle{
  border: 1px solid #027be3

}


  .container{
    height: auto;
    width: 100%;
    border: 1px solid red;
    margin: 1px;
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
  border: 1px solid red;
  grid-area: button;
  background-color:rgb(59, 144, 255) ;
  margin: 1px;
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
  /* border: 1px solid red; */
  margin: 0;}
</style>
