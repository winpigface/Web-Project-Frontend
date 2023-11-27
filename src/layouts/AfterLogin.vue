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
        <div v-if="storeLogUser.getUserid">
         <a href="laundry/profile" style="text-decoration: none; color: wheat; font-size: 20px; font-weight: bold;">{{ storeLogUser.getUsername }}</a>
        </div>
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
            Menu
          </q-item-label>

          <EssentialLink
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
            @click="onDel(link.title)"
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
import { useLoginUserStore } from "src/stores/LoginUser";

  const linksList = [
    {
      title: 'My Profile',
      caption: '',
      icon: 'account_circle',
      link: 'https://quasar.dev'
    },
    {
      title: 'My wash',
      caption: '',
      icon: 'local_laundry_service',
      link: '/laundry/mywash'
    },
    {
      title: 'Dashbord',
      caption: '',
      icon: 'grid_view',
      link: '/laundry/dashbord'
    },
    {
      title: 'Logout',
      caption: '',
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
      const storeLogUser = useLoginUserStore()
      return {
        essentialLinks: linksList,
        leftDrawerOpen,
        toggleLeftDrawer () {
          leftDrawerOpen.value = !leftDrawerOpen.value
        },
        storeLogUser
      }
    },
  methods:{
    onDel(link){
      if(link === 'Logout'){
        this.storeLogUser.clearStorage();
        Notify.create({
        type: "info",
        message: "Logout successfully"
      });
      }
    }
  }
  })
  </script>
