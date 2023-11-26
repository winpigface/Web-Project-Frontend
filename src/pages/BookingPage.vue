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
  <div class="">

    <div class="box1" >
      <h1 style="font-size: 30px; font-weight: bold; margin-left: 5%; ">Time user</h1>

      <div class="q-pa-md" style="" >
        <q-table  :rows="rows" row-key="name" flat bordered />
      </div>
    </div>

    <div class="box2" >
      <div class="box2.1" >
        <h1 style="font-size: 30px; font-weight: bold; margin-left: 5%; ">Choose Time</h1>

        <div class="q-pa-md text-center" >
          <q-time
            v-model="time"
            format24h
            style=""
          />
        </div>
      </div>

      <div >

        <h1 style="font-size: 30px; font-weight: bold; margin-left: 5%">Choose Option</h1>

        <div class="q-pa-md text-center" style=" height: 100px;">
          <q-btn-toggle
            size="35px"
            v-model="model"
            toggle-color="primary"
            no-caps
            :options="[
              {label: '30min', value: 1},
              {label: '1hr 30min', value: 2},
              {label: '2hr', value: 3},
              {label: '2hr 30min', value: 4}
            ]"
          />
        </div>
      </div>


    </div>








  <div class="q-pa-md q-gutter-sm text-center" style=" background-color: rgb(59, 144, 255);">
    <q-btn color="red" icon-right="close" label="Cancel" />
    <q-btn color="secondary"  icon-right="send" label="confirm" />
  </div>

  </div>

</template>

<script>
import { defineComponent, initCustomFormatter } from "vue";

export default defineComponent({
  name: "BookingPage",
  setup() {
    return {

    };
  },

  data() {
    return {
      rows: [
        {
          name: "Alif",
          phone: 123456789,
          time_from: 12.45,
          time_to: 13.45,
          status: "inuse",
        },
        {
          name: "Arif",
          phone: 123456789,
          time_from: 20.3,
          time_to: 21.5,
          status: "wait",
        },
      ],
      model: "one",
      secondModel: "one",
    };
  },
});
</script>

<style lang="sass" scoped>
.my-custom-toggle
  border: 1px solid #027be3


</style>

<style>
  .grid-container {
  display: grid;
  grid-template-columns: auto;
  gap: 0px;
  padding: 10px;
}
.box {

}
.box2 {
  display: grid;
  grid-template-columns: auto auto;
  gap: 0px;
  padding: 10px;
}
/* *{border: 1px solid red;} */
</style>
