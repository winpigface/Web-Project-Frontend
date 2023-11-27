<template>
    <q-layout view="lHh Lpr lFf">
      <q-header elevated>
        <q-toolbar>

          <q-btn
            type="submit"
            flat
            dense
            round
            aria-label="Menu"
            >
          <img src="../image/animation32.ico" alt="buttonpng" />
          </q-btn>


          <q-toolbar-title>
            Laundry
          </q-toolbar-title>

          <div>Laundry v0.1</div>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </template>

  <script>
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'MainLayout',
  })
  </script>
