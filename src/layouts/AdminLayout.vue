<template>
  <q-layout view="hHh Lpr fFf"> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Admin Dashboard
        </q-toolbar-title>
      </q-toolbar>
    </q-header>


    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      bordered
      class="bg-grey-2"
    >

    <q-list
     >
      <q-item-label
          header
        >
          Admin Dashboard
      </q-item-label>



      <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
    </q-list>

    </q-drawer>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
const linksList = [
  {
    title: 'Users',
    caption: '',
    icon: 'perm_identity',
    link: 'admin/users'

  },
  {
    title: 'Washing Machine',
    caption: '',
    icon: 'local_laundry_service',
    link: 'admin/washmachine'
  },
  {
    title: 'Booking',
    caption: '',
    icon: 'task_alt',
    link: 'admin/booking'
  },
  {
    title: 'Report',
    caption: '',
    icon: 'record_voice_over',
    link: 'admin/report'
  }
]
export default defineComponent({
  name: 'AdminLayout',
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
