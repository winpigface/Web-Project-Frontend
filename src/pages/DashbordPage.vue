<template>
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

  <div class="q-pa-md row items-start q-gutter-md">
    <!-- card1 -->
    <q-card class="my-card" flat bordered>
      <q-img src="../image/animation03.gif" />

      <q-card-section>
        <div class="text-overline text-orange-9">used</div>
        <div class="text-h5 q-mt-sm q-mb-xs">Floor 1</div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat color="primary" label="Report" />
        <q-btn flat color="secondary" label="Book" />

        <q-space />

        <q-btn
          color="grey"
          round
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded"
        />
      </q-card-actions>

      <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-subtitle2">
            {{ lorem1 }}
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
    <!-- card2 -->
    <q-card class="my-card" flat bordered>
      <q-img src="../image/Logo laundry 03.png" />

      <q-card-section>
        <div class="text-overline text-orange-9">not use</div>
        <div class="text-h5 q-mt-sm q-mb-xs">Floor 2</div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat color="primary" label="Report" />
        <q-btn flat color="secondary" label="Book" href="/laundry/booking" />

        <q-space />

        <q-btn
          color="grey"
          round
          flat
          dense
          :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="expanded = !expanded"
        />
      </q-card-actions>

      <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-subtitle2">
            {{ lorem2 }}
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "DashbordPage",
  data() {
    return {
      expanded: false,
      lorem1: "name: potae",
      lorem2: "name: win",
    };
  },
});
</script>
