<template>
      <div  class="text-center" style="font-size:30px" >{{ this.washing.name}}</div>
<br/>
      <!-- <div class="text2" style="max-width: 200px">

        <q-select filled v-model="model" :options="options" label="Filled" />
    </div> -->


      <!-- <textarea class="textarea"
      >


      </textarea> -->
      <textarea class="textarea"
      v-model="textarea"
  name="textarea"
  rows="5"
  cols="30"
  placeholder="type someyhing..."
  :rules="[requiredValidate]"
  >

</textarea>
        <!-- <div class="input-box" style="max-width: 300px">
    <q-input
      v-model="text"
      filled
      type="textarea2"
    />
  </div> -->



<br/>
    <!-- <div class="text-center " >
    <q-btn label="Submit report" color="primary" @click="seamless = true" />
    <q-dialog v-model="seamless" seamless position="bottom">
    </q-dialog>

  </div> -->


<q-form
  @submit="onSubmit"
  @reset="onReset"
  class="text-center"
>
  <div class=" text-center">
    <q-btn label="Submit Report" type="submit" color="primary"/>
  </div>
</q-form>

   <div class="absolute-top-right">
     <!-- <div class="text-h2">Test Dark mode</div> -->
     <!-- <div class="q-pa-xl">
       <button @click="changetheme">Change The theme </button>
     </div> -->
   </div>
   <div class="row flex-center">
     <div class="myownifdark">
       <!-- <h3>THIS CUSTOME IF DARK MODE</h3> -->
     </div>
   </div>
   <!-- <div class="row">
     {{$q.dark.isActive ? " Dark" : "LIGHT"}}
   </div> -->


   <!-- <q-toggle

    v-model="selection"
    label ="orange"
    false-value ="off"
    true-value ="true"
   /> -->




  </template>

  <script>
  import { defineComponent } from 'vue'
  import { useWashingMachineStore  } from "../stores/WashingMachine"
  import { Notify } from 'quasar'
  import{useLoginUserStore} from "../stores/LoginUser"
  export default defineComponent({
    name: 'ReportPage',
    data(){
      return{
        storeLogUser:useLoginUserStore(),
        washing:useWashingMachineStore(),
        textarea: null
      }
    },
    methods:{
      onSubmit(){
        const headers = {
        "x-access-token": this.storeLogUser.accessToken
      }
        const data = {
          user_id: this.storeLogUser.userid,
          washing_machine_id: this.washing.washid,
          report_log: this.textarea,
        }
        this.$api
        .post("/dashboard/report",data,{headers})
        .then((res)=>{
          if(res.status == 200){
            Notify.create({
              type: "positive",
              message: "Report sucessfully"
            });

            this.$router.push("/laundry/dashboard");
          }
        })
        .catch((err)=>{
          console.log(err);
          Notify.create({
            type: "negative",
            message: err.message
          });
        });

      }
    }
  })
  </script>


<!-- SET YOU STYLE IF DARK OR LIGHT THEME ACTIVE -->

<style>
  /* .body--light{
   SET YOU THEME IF LIGHT MODE HERE
  } */

  .body--dark{
    background-color: white;
    color: black;
  }
 .textarea{
  display: flex;
  position: center;
  justify-content: center;
  margin: auto;
  background-color:#d8d9e6;
  /* border: 1px solid blue; */
  width: 500px;
  height: 500px;
 }
 /* .text2{
  display: flex;
  position: center;
  justify-content: center;
  margin-right: 80%;
 }
  */


</style>













<!-- <script
  setup>


  import {watch} from 'vue'
  import {useQuasar} from 'quasar'
  import { ref } from 'vue'

  const $q = useQuasar()

  function changetheme(){
    $q.dark.toggle()

  }

  watch(()=> $q.dark.isActive,val=>{
    console.log(val ? "You DARK MODE" : "YOU LIGHT MODE")
  })
    const textarea2 = ref(null)
    const accept = ref(false)



</script>
  -->
