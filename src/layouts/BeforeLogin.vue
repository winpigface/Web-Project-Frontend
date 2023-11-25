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
            @click="toggleLeftDrawer">
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
  import { defineComponent, ref } from 'vue'
  // import EssentialLink from 'components/EssentialLink.vue'
  
  
  
  export default defineComponent({
    name: 'MainLayout',
  
    components: {
      
    },
  
    setup () {
      const leftDrawerOpen = ref(false)
  
      return {
        
        leftDrawerOpen,
        toggleLeftDrawer () {
          leftDrawerOpen.value = !leftDrawerOpen.value
        }
      }
    }
  })
  </script>
  