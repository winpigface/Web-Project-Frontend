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
  <!-- table -->
  <div class="q-pa-md">
    <q-table :rows="rows" row-key="name" flat bordered />
  </div>
  <h1 style="font-size: 30px; margin-left: 5%">Choose Time</h1>
  <!-- time choose -->
  <div class="q-pa-md">
    <div class="q-gutter-md">
      <q-time v-model="time" />
    </div>
  </div>
  <!-- option -->
  <h1 style="font-size: 30px; margin-left: 5%">Choose Option</h1>
  <div class="q-pa-md">
    <div class="q-gutter-y-md">
      <q-btn-toggle
        v-model="model"
        spread
        no-caps
        toggle-color="purple"
        color="white"
        text-color="black"
        :options="[
          { label: 'Option 1', value: 'one' },
          { label: 'Option 2', value: 'two' },
        ]"
      />

      <q-btn-toggle
        v-model="secondModel"
        spread
        class="my-custom-toggle"
        no-caps
        rounded
        unelevated
        toggle-color="primary"
        color="white"
        text-color="primary"
        :options="[
          { label: 'Option 1', value: 'one' },
          { label: 'Option 2', value: 'two' },
        ]"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, initCustomFormatter } from "vue";

export default defineComponent({
  name: "BookingPage",
  setup() {
    return {
      model: "one",
      secondModel: "one",
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
    };
  },
});
</script>

<style lang="sass" scoped>
.my-custom-toggle
  border: 1px solid #027be3
</style>
