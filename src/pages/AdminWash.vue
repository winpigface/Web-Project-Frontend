<template>
  <q-page padding>


    <div v-if="dataready">
      <!-- Dialog new washing machine -->
      <q-btn no-caps color="primary" icon="add_circle_outline" label="New Washing Machine" @click="AddNewWashingMachine" />
      <q-dialog  v-model="form_add" persistent>
        <q-card class="dialog">
          <q-card-section class="dialog_head">
           <span><q-avatar  size="42px" color="secondary" icon="add_circle_outline" text-color="white"/></span> <h6>Add washing Machine</h6>
          </q-card-section>
          <q-card-section>
            <div>
            <q-input v-model="NewWashName" filled  type="text" label="Name"/>
          </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn  flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="Add" color="primary" v-close-popup @click="OnAdd"/>
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- Table List washing machine  -->
      <q-table
        title="List of Washing Machine"
        :columns="columns"
        :rows="rows"
        row-key="id"
        :pagination="paginations"
      >

      <template #body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props"> {{ props.row.id }}</q-td>
            <q-td key="name" :props="props"> {{ props.row.name }}</q-td>
            <q-td key="Status" :props="props">
        <q-btn-toggle
        v-model="props.row.Status"
        push
        glossy
        toggle-color="primary"
        @click="onEdit(props.row.id,props.row)"
        :options="[
          {label: 'ON', value: 'ON'},
          {label: 'OFF', value: 'OFF'},

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
          <span class="q-ml-sm"><q-avatar icon="mode_edit" color="primary" text-color="white" /></span><h6>ID: {{ input.id }}</h6>
        </q-card-section>
        <q-card-section>
          <div>
            <q-input filled v-model="input.name" type="text" label="Name"/>
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
      <q-card class="dialog">

        <q-card-section class="dialog_head delete">
           <span class="q-ml-sm"><q-avatar icon="delete" color="primary" text-color="white" /></span><h6>ID: {{ input.id }}</h6>

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
import { useLoginUserStore } from '../stores/LoginUser'
import { Notify } from 'quasar'
import {ErrorHandle} from '../utils/ErrorHandle'

export default defineComponent({
  name: 'AdminWash',

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
          name: "name",
          label: "Washing Machine",
          field: "name",
          align: "left",
          sortable: true,
        },
        {
          name: "Status",
          label: "Status",
          field: "Status",
          align: "left",
          sortable: true,
        },
      ],
      paginations: { rowsPerPage: 10 },
      storeLogUser: useLoginUserStore(),
      NewWashName: null,
      form_add: false,
      form_edit: false,
      form_delete: false
    }
  },
  methods:{
    getAllWash(){
      const headers = {
        "x-access-token": this.storeLogUser.accessToken
      }
      this.$api
      .get("/admin/wash",{headers})
      .then((res)=>{
        if(res.status == 200){
          this.rows = res.data
        }
      })
      .catch((err) => {
        ErrorHandle(err.response.status,err,this.$router)

      });
    },
    // add new wash
    AddNewWashingMachine(){
      this.form_add = true
    },
    OnAdd(){
      const headers = {
        "x-access-token": this.storeLogUser.accessToken
      }
      const data ={
        name: this.NewWashName
      }
      this.$api
      .post('/admin/wash',data,{headers})
      .then((res)=>{
        if(res.status == 200){
          Notify.create({
            type: 'positive',
            message: "Create successfull"
          })
          this.getAllWash()
        }
      })
      .catch((err) => {
        ErrorHandle(err.response.status,err,this.$router)
      });
    },
    // on Edit
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
      .put('/admin/wash/'+id,data,{headers})
      .then((res)=>{
        if (res.status == 200) {
            Notify.create({
              type: "positive",
              message: "Updated Washing Machine ID: " + id,
            });

          }
      })
      .catch((err)=>{
        ErrorHandle(err.response.status,err,this.$router)
      })
    },
    // Delete
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
      .delete('/admin/wash'+id,{headers})
      .then((res)=>{
        if(res.status == 200){
           Notify.create({
              type: "positive",
              message: "Delete Washing Machine ID: " + id,
            });
            this.getAllWash()
        }
      })
      .catch((err)=>{
        ErrorHandle(err.response.status,err,this.$router)
      })
  },
},
  async mounted()
  {
    await this.getAllWash();
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
