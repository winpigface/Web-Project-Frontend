<template class="temp">
   <img
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
  />
  <q-page>
    <h1 id="current-time"></h1>
    <div class="boxmain q-pa-md " flat bordered v-if="this.wash.length !== 0">
      <!-- box0 -->
      <div class="box0" >
        <div class="temp" v-if="this.wash[0].Status == 'wait'">
          <h1 class="font">wait</h1>
        </div>
        <div class="temp" v-if="this.wash[0].Status == 'inuse'">
          <h1 class="font">using</h1>
        </div>
        <div class="temp" v-if="this.wash[0].Status == 'finish'">
          <h1 class="font">finish</h1>
        </div>
      </div>
      <!-- box1 -->
      <div class="box1" v-if="this.wash[0].Status == 'wait'">
        <h1 class="text-center" style="font-size: 100px; font-weight: bold;" >{{ this.wash[0].show_from }}</h1>
      </div>
      <div class="box1" v-if="this.wash[0].Status == 'inuse'">
        <h1 class="text-center" style="font-size: 100px; font-weight: bold;" >{{ this.wash[0].show_to }}</h1>
      </div>
      <div class="box1" v-if="this.wash[0].Status == 'finish'">
        <h1 class="text-center" style="font-size: 100px; font-weight: bold;" >finish</h1>
      </div>
      <!-- box2 -->
      <div class="box2">
        <div class="item1">

        </div>
        <div class="item2 text-right" v-if="this.wash[0].Status == 'wait' && this.wash[0].book_from == this.wash[0].book_from">
          <q-btn push color="red" label="cacel" style="margin-right: 20px;"/>
          <q-btn push color="primary" label="confirm" />
        </div>
        <div class="item2 text-right" v-else-if="this.wash[0].Status == 'inuse'">

        </div>
        <div class="item2 text-right" v-else-if="this.wash[0].Status == 'finish' && this.wash[0].book_to == this.wash[0].book_to">
          <q-btn push color="primary" label="finish" />
        </div>
      </div>
    </div>

    <!-- table else -->
    <div class="boxmain q-pa-md " flat bordered v-else>
      <div class="box0" >
        <div>

        </div>
      </div>

      <div class="box1" >
        <h1 class="text-center" style="font-size: 100px; font-weight: bold;" >Empty</h1>
      </div>

      <div class="box2">
        <div class="item1">

        </div>
        <div class="item2 text-right">

        </div>
      </div>
    </div>

  </q-page>




</template>

<script>
import { defineComponent } from "vue";
import { Notify } from "quasar";
import { useLoginUserStore } from '../stores/LoginUser'

setInterval(()=>{
let time = document.getElementById("current-time");

  let d = new Date();
  time.innerHTML = d.toLocaleTimeString([], { hour12: false });
});

export default defineComponent({
  name: "MywashPage",
   data(){
    return {
      wash: [],
      dataready: false,

      paginations: { rowsPerPage: 10 },
      form_delete: false,
      storeLogUser: useLoginUserStore(),
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
          console.log(event.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" ,hour12: false }));
          //console.log(this.wash[0].book_from);

          //console.log(d.toLocaleTimeString());
        }
      })
      .catch((err) => {
          console.log(err);
          Notify.create({
            type: "negative",
            message: "Unauthorized",
          });
          this.$router.push('/')
      });
    },

    onSubmit() {

    },
    onReset() {
      this.email = null;
      this.password = null;
    },
  },
  async mounted() {
    await this.mywash();
    //console.log("token@mount:"+this.storeLogUser.accessToken)
    this.dataready = true;
  },
});
</script>

<style scoped>
  .temp{
    margin-top: -65px;

    display: flex;
    justify-content: center;
  }

  .font{
    font-weight: bold;
  }

  .boxmain{
    width: 1000px;
    height: 600px;
    /* border: 1px solid; */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    grid-template-columns: auto;
    grid-template-rows: 100px 370px 100px;
    gap: 0px;
    /* background-color: #2196F3; */
    /* padding: 10px; */
    display: grid;
    padding: 10px;

  }

  .box0{
    /* border: 1px solid green; */
    background-color:  #2196F3;


  }
  .box1{
    /* border: 1px solid red; */
    background-color: #ffffff;

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

  .item1 {

    /* border: 1px solid black; */
  }
  .item2 {

    /* border: 1px solid black; */
  }

  *{
    /* border: 1px solid black; */
  }

</style>
