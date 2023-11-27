<template>
  <q-page padding>

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
        <q-btn-toggle
        v-model="props.row.role"
        push
        glossy
        toggle-color="primary"
        @click="onEdit(props.row.id,props.row)"
        :options="[
          {label: 'admin', value: 'admin'},
          {label: 'user', value: 'user'},

        ]"
      />

            </q-td>
            <q-td key="fine" :props="props">

            <q-btn-toggle
            v-model="props.row.fine"
            push
            glossy
            toggle-color="primary"
            @click="onEdit(props.row.id,props.row)"
          :options="[
          {label: 'Yes', value: 1},
          {label: 'No', value: 0},
        ]"
      />
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
    <!-- Edit Dialog -->
    <q-dialog v-model="form_edit"  persistent>
      <q-card class="dialog">
        <q-card-section class="dialog_head edit">
          <span class="q-ml-sm"> <q-avatar icon="mode_edit" color="primary" text-color="white" /></span> <h6>ID: {{ input.id }}</h6>
        </q-card-section>
        <q-card-section >
          <div>
            <q-input  v-model="input.email" type="text" label="Email"/>
          </div>
          <div>
            <q-input  v-model="input.username" type="text" label="Username" />
          </div>
          <div>
            <q-input  v-model="input.phone" type="text" label="Phone"/>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            v-close-popup
            @click="onCancelEdit()"
          />
          <q-btn
            flat
            label="Edit"
            color="primary"
            v-close-popup
            @click="onEdit(input.id,input)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Delete dialog -->
    <q-dialog v-model="form_delete" persistent>
      <q-card  class="dialog">

        <q-card-section class="dialog_head delete">
          <span class="q-ml-sm"> <q-avatar icon="delete" color="primary" text-color="white" /></span> <h6>ID: {{ input.id }}</h6>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup @click="onCancelDelete()" />
          <q-btn flat label="Delete" color="primary" v-close-popup @click="onDelete(input.id)" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import {useLoginUserStore} from '../stores/LoginUser'
import {Notify} from 'quasar'
import {ErrorHandle} from '../utils/ErrorHandle'

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
        },
        {
          name: "fine",
          label: "Fine",
          field: "fine",
          align: "left",
          sortable: true,
        },
      ],
      paginations: { rowsPerPage: 10 },
      storeLogUser: useLoginUserStore(),
      RoleOptions: [
        'user','admin'
      ],
      FineOptions: [
        0,1
      ],

      form_edit: false,
      form_delete: false
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
        }
      })
      .catch((err) => {
        ErrorHandle(err.response.status,err,this.$router)
      });
    },
    // Edit user
    editRecord(record){
      this.input = record;
      this.form_edit = true;
    },
    onCancelEdit(){
      this.input = null
      this.form_edit = false
    },
    onEdit(id,data){
      const headers = {
        "x-access-token": this.storeLogUser.accessToken
      }
      this.$api
      .put('/admin/'+id,data,{headers})
      .then((res)=>{
        if (res.status == 200) {

            Notify.create({
              type: "positive",
              message: "Updated user ID: " + id,
            });
            if (this.storeLogUser.userid == res.data.id) {
              this.storeLogUser.username = res.data.username;
              this.storeLogUser.phone = res.data.phone;
              this.storeLogUser.email = res.data.email;
              this.storeLogUser.role = res.data.role;
            }
          }
      })
      .catch((err)=>{
        ErrorHandle(err.response.status,err,this.$router)

      })
    },
    // Delete user
    deleteRecord(record){
      this.input = record;
      this.form_delete = true;
    },
    onCancelDelete(){
      this.input = null
      this.form_delete = false
    },
    onDelete(id){
      const headers = {
        "x-access-token": this.storeLogUser.accessToken
      }
      this.$api
      .delete('/admin/'+id,{headers})
      .then((res)=>{
        if(res.status == 200)
        {
           Notify.create({
              type: "positive",
              message: "Delete user ID: " + id,
            });
            this.getAllUsers()
        }

      })
      .catch((err)=>{
        ErrorHandle(err.response.status,err,this.$router)
      })
    }
  },
  async mounted() {
    await this.getAllUsers();
    console.log("token@mount:"+this.storeLogUser.accessToken)
    this.dataready = true;
  },

})
</script>
<style  scoped>
.dialog{
 width: 300px;
}
.dialog_head{
  height: 100px;
  background-color: #1976D2;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dialog_head.edit{
  background-color: #26A69A;
}
.dialog_head.delete{
  background-color: red;
}
.dialog_head h6{
  color: white;
}
</style>
