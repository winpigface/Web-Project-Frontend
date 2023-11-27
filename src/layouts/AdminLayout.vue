<template>
  <q-layout view="lHh Lpr lFf"> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          @click="toggleLeftDrawer"
        >
        <img src="../image/animation32.ico" alt="buttonpng" />
        </q-btn>

        <q-toolbar-title>
          Admin Dashboard
        </q-toolbar-title>
        <div v-if="storeLogUser.getUserid">
          Hello {{ storeLogUser.getUsername }}
        </div>
      </q-toolbar>
    </q-header>


    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
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
          @click="onPath(link.title,link.link)"
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
import { useLoginUserStore } from "src/stores/LoginUser";

const linksList = [
  {
    title: 'Users',
    caption: '',
    icon: 'perm_identity',
    link: ''

  },
  {
    title: 'Washing Machine',
    caption: '',
    icon: 'local_laundry_service',
    link: '/washmachine'
  },
  {
    title: 'Booking',
    caption: '',
    icon: 'task_alt',
    link: '/booking'
  },
  {
    title: 'Report',
    caption: '',
    icon: 'record_voice_over',
    link: '/report'
  },
  {
    title: 'Logout',
    caption: '',
    icon: 'logout',
    link: '/'
  }
]
export default defineComponent({
  name: 'AdminLayout',
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
    onPath(name,link){
      if(name == 'Logout'){
        this.storeLogUser.clearStorage();
        Notify.create({
        type: "info",
        message: "Logout successfully"
      });
      this.$router.push(link)
      }
      else this.$router.push(link)
    }
  }

})
</script>
