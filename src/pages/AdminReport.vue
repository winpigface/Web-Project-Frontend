<template>
  <q-page padding>

    <div v-if="dataready">
      <q-table
        title="Report"
        :columns="columns"
        :rows="rows"
        row-key="id"
        :pagination="paginations"
      >

      <template #body="props">
          <q-tr :props="props">
            <q-td key="id" :props="props"> {{ props.row.id }}</q-td>
            <q-td key="report_date" :props="props"> {{ props.row.report_date }}</q-td>
            <q-td key="name" :props="props"> {{ props.row.name }}</q-td>
            <q-td key="username" :props="props"> {{ props.row.username }}</q-td>
            <q-td key="phone" :props="props"> {{ props.row.phone }}</q-td>
            <q-td key="report_log" :props="props"> {{ props.row.report_log }}</q-td>


            <q-td key="action">
              <q-btn
                color="primary"
                flat
                round
                icon="delete"
                @click="deleteRecord(props.row)"
              />
            </q-td>
          </q-tr>
      <q-dialog v-model="form_delete" persistent>
      <q-card class="dialog">
        <q-card-section class="dialog_head delete">
          <span class="q-ml-sm"><q-avatar icon="delete" color="primary" text-color="white" /></span> <h6>ID: {{ input.id }}</h6>

        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup @click="onCancelDelete()" />
          <q-btn flat label="Delete" color="primary" v-close-popup @click="onDelete(input.id)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
import { Notify } from 'quasar'
import {ErrorHandle} from '../utils/ErrorHandle'

export default defineComponent({
  name: 'AdminReport',
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
          name: "report_date",
          label: "ReportDate",
          field: "report_date",
          align: "left",
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
          name: "report_log",
          label: "ReportLog",
          field: "report_log",
          align: "left",
          sortable: true,
        },
      ],
      paginations: { rowsPerPage: 10 },
      form_delete: false,
      storeLogUser: useLoginUserStore(),
    }
  },
  methods:{
    getAllReport(){
      const headers = {
        "x-access-token": this.storeLogUser.accessToken
      }
      this.$api
      .get("/admin/report",{headers})
      .then((res)=>{
        if(res.status == 200){
          this.rows = res.data
          console.log(res.data);
        }
      })
      .catch((err) => {
        ErrorHandle(err.response.status,err,this.$router)
      });
    },
    // Delte report
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
      .delete('/admin/report/'+id,{headers})
      .then((res)=>{
        if(res.status == 200){
          Notify.create({
              type: "positive",
              message: "Delete Report ID: " + id,
            });
            this.getAllReport()
        }

      })
      .catch((err)=>{
        ErrorHandle(err.response.status,err,this.$router)

      })
    }
  },
  async mounted(){
    await this.getAllReport();
    this.dataready = true;
  }
})
</script>
<style scoped>
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
