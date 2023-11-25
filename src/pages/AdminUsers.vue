<template>
  <q-page class="flex flex-center">
    <q-select color="lime-11" filled v-model="Roleuser" :options="options">
</q-select>
    <div v-if="dataready">
      <q-table
        title="List of users"
        :columns="columns"
        :rows="rows"
        row-key="id"
        :pagination="paginations"
      >

      <template #body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props"> {{ props.row.id }}</q-td>
            <q-td key="email" :props="props"> {{ props.row.email }}</q-td>
            <q-td key="username" :props="props"> {{ props.row.username }}</q-td>
            <q-td key="phone" :props="props"> {{ props.row.phone }}</q-td>
            <q-td key="role" :props="props">
              <q-select color="lime-11" filled v-model="Roleuser" :options="options">

              </q-select>


            </q-td>

            <q-td key="action">
              <q-btn
                color="primary"
                flat
                round
                icon="edit"
                @click="editRecord(props.row)"
              />
              <q-btn
                color="primary"
                flat
                round
                icon="delete"
                @click="deleteRecord(props.row)"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <div v-else>
      <q-circular-progress
        indeterminate
        rounded
        size="50px"
        color="blue"
        class="q-ma-md"
      />
    </div>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import {useLoginUserStore} from '../stores/LoginUser'
import {Notify} from 'quasar'
export default defineComponent({
  name: 'AdminUsers',
  data(){
    return{
      dataready: false,
      rows: [],
      columns: [
        {
          name: "id",
          label: "ID",
          field: "id",
          align: "center",
          sortable: true,
        },
        {
          name: "email",
          label: "Email",
          field: "email",
          align: "left",
          sortable: true,
        },
        {
          name: "username",
          label: "Username",
          field: "username",
          align: "left",
          sortable: true,
        },
        {
          name: "phone",
          label: "Phone",
          field: "phone",
          align: "left",
          sortable: true,
        },
        {
          name: "role",
          label: "Role",
          field: "role",
          align: "left",
          sortable: true,
        }
      ],
      paginations: { rowsPerPage: 7 },
      storeLogUser: useLoginUserStore(),
      options: [
        'user','admin'
      ],
      Roleuser: ['asd']
    }
  },
  methods:{
    getAllUsers(){
      const headers = {
        "x-access-token": this.storeLogUser.accessToken
      }
      this.$api
      .get("/admin",{headers})
      .then((res)=>{
        if(res.status == 200){

          this.rows = res.data
          console.log(this.rows);
        }
      })
      .catch((err) => {
          console.log(err);
          Notify.create({
            type: "negative",
            message: "Unauthorized",
          });
      });
    }
  },
  async mounted() {
    await this.getAllUsers();
    console.log("token@mount:"+this.storeLogUser.accessToken)
    this.dataready = true;
  },
})
</script>
