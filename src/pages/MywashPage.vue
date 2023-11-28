<template >

  <q-page class="page" padding>
    <div class="box">

    <div class="boxmain q-pa-md " flat bordered v-if="this.wash.length !== 0">
      <!-- box0 -->
      <!-- <h3 id="current-time"></h3> -->
      <div class="boxshowStatus wait" v-if="this.wash[0].Status == 'wait'">
        <div class="temp" >
          <h2 class="font">Wait</h2>
        </div>
      </div>
      <div class="boxshowStatus inuse" v-if="this.wash[0].Status == 'inuse'">
        <div class="temp" >
          <h2 class="font">Using</h2>
        </div>
      </div>

      <div class="boxshowStatus finish" v-if="this.wash[0].Status == 'finish'">
        <div class="temp" >
          <h2 class="font">Finish</h2>
        </div>
     </div>
      <!-- box1 -->
      <div class="boxShowtime" v-if="this.wash[0].Status == 'wait'">
        <h4 class="text-center" style="font-size: 30px; font-weight: bold; color: #2196F3;"> Until</h4>
        <h1 class="text-center" style="font-size: 100px; font-weight: bold;" >{{ this.wash[0].show_from }}</h1>
      </div>
      <div class="boxShowtime" v-if="this.wash[0].Status == 'inuse'">
        <h4 class="text-center" style="font-size: 30px; font-weight: bold; color: orange;"> Until</h4>
        <h1 class="text-center" style="font-size: 100px; font-weight: bold;" >{{ this.wash[0].show_to }}</h1>
      </div>
      <div class="boxShowtime" v-if="this.wash[0].Status == 'finish'">
        <h4 class="text-center" style="font-size: 30px; font-weight: bold; color: greenyellow;"> Until</h4>

        <h6 class="text-center" style="font-size: 100px; font-weight: bold;" >{{ this.wash[0].show_deadline  }}</h6>
      </div>
      <!-- box2 -->
      <div class="boxButton">
        <div class="item2 text-right" v-if="this.wash[0].Status == 'wait'">
          <q-btn push color="red" label="Cancel Book" style="margin-right: 20px;" @click="cancelWash"/>
            <q-btn push color="primary" label="Confirm Wash" v-if="this.time >= this.wash[0].show_from"  @click.once="onConfirmWash"/>
        </div>
        <div class="item2 text-right" v-else-if="this.wash[0].Status == 'finish'">
            <q-btn push color="primary" label="Confirm Finish" v-if="this.time >= this.wash[0].show_to"   @click.once="onConfirmFinish"/>
        </div>
      </div>
    </div>
    <!-- table else -->
    <div class="boxmain  " flat bordered v-else>
      <div class="box1" >
        <h1 class="text-center" style="font-weight: bold;" >Empty</h1>
      </div>

      <div class="box2">
        <div class="item1">

        </div>
        <div class="item2 text-right">

        </div>
      </div>
    </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useLoginUserStore } from '../stores/LoginUser'
import { ErrorHandle } from "src/utils/ErrorHandle";
import { Notify } from "quasar";

export default defineComponent({
  name: "MywashPage",
   data(){
    return {
      wash: [],
      dataready: false,

      paginations: { rowsPerPage: 10 },
      form_delete: false,
      storeLogUser: useLoginUserStore(),
      time: null
    }
  },
  methods: {
    mywash(){
      const headers = {
        "x-access-token": this.storeLogUser.accessToken
      }
      this.$api
      .get("/dashboard/mywash/"+this.storeLogUser.userid,{headers})
      .then((res)=>{
        if(res.status == 200){
          this.wash = res.data
          const event = new Date();
          this.time = event.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" ,hour12: false })
        }
      })
      .catch((err) => {
        ErrorHandle(err.response.status,err,this.$router)
      });
    },

    onConfirmWash() {
      const headers = {
        "x-access-token": this.storeLogUser.accessToken
      }
      this.$api
      .put("/dashboard/comfirmwash/"+this.storeLogUser.userid+"/"+this.storeLogUser.email+"/"+this.wash[0].book_to)
      .then((res)=>{
        Notify.create({
              type: "positive",
              message: "Confirm Wash sucessfully",
            });
        this.mywash()
      })
      .catch((err) => {
        console.log(this.storeLogUser.accessToken);
        console.log(err);
        ErrorHandle(err.response.status,err,this.$router)
      });
    },
    onConfirmFinish(){
      const headers = {
        "x-access-token": this.storeLogUser.accessToken
      }
      this.$api
      .delete("/dashboard",{headers})
      .then((res)=>{
        Notify.create({
              type: "positive",
              message: "Confirm Finish sucessfully",
            });
      })
      this.mywash()
      .catch((err) => {
        ErrorHandle(err.response.status,err,this.$router)
      });
    },
    cancelWash() {
      const headers = {
        "x-access-token": this.storeLogUser.accessToken
      }
      this.$api
      .delete("/dashboard",{headers})
      .then((res)=>{
        Notify.create({
              type: "positive",
              message: "Delete sucessfully",
            });
          this.mywash();
      })
      .catch((err) => {
        ErrorHandle(err.response.status,err,this.$router)
      });
    },
  },
  async mounted() {
    await this.mywash();

  },
  async beforeMount(){

  },
  watch:{
   mywash(){
    this.time
   }
  }
});
</script>

<style scoped>

#current-time{
  position: absolute;
  right: 5%;
}
.page{
  background-color: #74dde4;
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.font{
    font-weight: bold;
}

  .boxmain{
    background-color: #ffffff;
    border: 1px solid #ffffff;
    border-radius: 60px;
    display: block;
    position: relative;
    text-align: center;
  }

  .boxshowStatus{
    /* border: 1px solid green; */
    width: 20%;
    text-align: center;

  }
  .boxshowStatus.wait{
    background-color:  #2196F3;
  }
  .boxshowStatus.inuse{
    background-color:  orange;
  }
  .boxshowStatus.finish{
    background-color:  green;
  }
  .boxShowtime{
    /* border: 1px solid red; */
    background-color: #ffffff;
    text-align: center;
    width: 50%;
    /* display: flex; */

  }
  .box2{
    /* border: 1px solid; */
    top: 50%;
    left: 50%;
    display: grid;
    /* transform: translate(-50%, -50%); */

    grid-template-columns: 700px 250px;
    /* grid-template-rows: 470px 100px; */
    gap: 0px;
    /* background-color: #2196F3; */
    padding: 10px;
  }



</style>
