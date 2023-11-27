<template> 
      <div  class="text-center" style="font-size:30px" >Laundry</div>
<br/>
      <!-- <div class="text2" style="max-width: 200px">
        
        <q-select filled v-model="model" :options="options" label="Filled" />
    </div> -->
    
    
      <!-- <textarea class="textarea"
      > 
        
      
      </textarea> -->
      <textarea class="textarea"
      v-model="username"
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
     <div class="q-pa-xl">
       <button @click="changetheme">Change The theme </button>
     </div>
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
  
  export default defineComponent({
    name: 'ReportPage',
    data(){
      return{
        storeLogUser:useWashingMachineStore(),
        textarea: null
      }
    },
    methods:{
      
      onSubmit(){
        const data = {
          textarea: this.textarea,
        }
        this.$api
        .post("/auth/login", data)
        .then((res)=>{
          if(res.status == 200){
            Notify.create({
              type: "positive",
              message: "Login sucessfully"
            });
            this.storeLogUser.washid = res.data.id;
            // this.storeLogUser.fullname = res.data.fullname;
            // this.storeLogUser.accessToken = res.data.accessToken;
            if(res.data.img != null){
              this.storeLogUser.avatar = this.$RESTAPI + "/file/" + res.data.img;
            }
            else{
              this.storeLogUser.avatar = "default-avatar.png";
            }
            this.$router.push("/user");
          }
        })
        .catch((err)=>{
          console.log(err);
          Notify.create({
            type: "negative",
            message: "Invalid username or password"
          });
        });
        this.$refs.loginForm.reset();
      }
    }
  })
  </script>
  
 
<!-- SET YOU STYLE IF DARK OR LIGHT THEME ACTIVE -->
 
<style>
  .body--light{
   /* SET YOU THEME IF LIGHT MODE HERE */
  }

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