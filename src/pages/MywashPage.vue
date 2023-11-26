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

  <div class="boxmain q-pa-md " flat bordered>
    <div class="box0">
      <h1 class="text-center" style="font-size: 50px; font-weight: bold; margin-top: -5px;">Wait</h1>
    </div>
    <div class="box1">
      <h1 class="text-center" style="font-size: 100px; font-weight: bold;" >20:30</h1>
    </div>
    <div class="box2">
      <div class="item1">

      </div>
      <div class="item2 text-right">
        <q-btn push color="red" label="cacel" style="margin-right: 20px;"/>
        <q-btn push color="primary" label="confirm" />
      </div>
    </div>
  </div>

</template>

<script>
import { defineComponent } from "vue";
import { Notify } from "quasar";
import { useLoginUserStore } from "src/stores/LoginUser";
export default defineComponent({
  name: "MywashPage",
  data() {
    return {
      storeLogUser: useLoginUserStore(),
      email: null,
      password: null,
    };
  },
  methods: {
    onSubmit() {

    },
    onReset() {
      this.email = null;
      this.password = null;
    },
  },
});
</script>

<style scoped>
  .temp{
    display: flex;
    justify-content: center;
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
    background-color: #ffffff;


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

</style>
