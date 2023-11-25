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
  
      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
      >
        <q-list>
          <q-item-label
            header
          >
            Essential Links
          </q-item-label>
  
          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-list>
      </q-drawer>
  
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue'
  import EssentialLink from 'components/EssentialLink.vue'
  
  const linksList = [
    {
      title: 'My Profile',
      caption: 'quasar.dev',
      icon: 'account_circle',
      link: 'https://quasar.dev'
    },
    {
      title: 'My wash',
      caption: 'github.com/quasarframework',
      icon: 'local_laundry_service',
      link: 'https://github.com/quasarframework'
    },
    {
      title: 'Dashbord',
      caption: 'chat.quasar.dev',
      icon: 'grid_view',
      link: '/laundry/dashbord'
    },
    {
      title: 'Logout',
      caption: 'chat.quasar.dev',
      icon: 'logout',
      link: '/'
    },
    
  ]
  
  export default defineComponent({
    name: 'MainLayout',
  
    components: {
      EssentialLink
    },
  
    setup () {
      const leftDrawerOpen = ref(false)
  
      return {
        essentialLinks: linksList,
        leftDrawerOpen,
        toggleLeftDrawer () {
          leftDrawerOpen.value = !leftDrawerOpen.value
        }
      }
    }
  })
  </script>
  