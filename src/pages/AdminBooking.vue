<template>
  <q-page padding>
    <!-- <h1>AdminBooking</h1> -->
    <div v-if="dataready">
      <q-table
        title="List of Booking"
        :columns="columns"
        :rows="rows"
        row-key="washing_machine_name"
        :pagination="paginations"
      >
      <template #body="props">
          <q-tr :props="props">
            <q-td key="washing_machine_name" :props="props"> {{ props.row.washing_machine_name }}</q-td>
            <q-td key="username" :props="props"> {{ props.row.username }}</q-td>
            <q-td key="book_from" :props="props"> {{ props.row.book_from }}</q-td>
            <q-td key="book_to" :props="props"> {{ props.row.book_to }}</q-td>
            <q-td key="Status" :props="props" v-if="props.row.Status == 'wait'">
              <q-chip color="orange" text-color="white"  label="Wait" />
            </q-td>
             <q-td key="Status" :props="props" v-if="props.row.Status == 'inuse'">
              <q-chip color="red" text-color="white"  label="Inuse" />
            </q-td>
            <q-td key="Status" :props="props" v-if="props.row.Status == 'finish'">
              <q-chip color="green" text-color="white"  label="Finish" />
            </q-td>

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
    <!-- delete dialog -->
    <q-dialog v-model="form_delete" persistent>
      <q-card class="dialog">
        <q-card-section class="dialog_head delete">
          <span class="q-ml-sm"><q-avatar icon="delete" color="primary" text-color="white" /></span> <h6>Name: {{ input.username }}</h6>
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

export default defineComponent({
  name: 'AdminBooking',
  data(){
    return {
      dataready: false,
      rows: [],
      columns: [
      {
          name: "washing_machine_name",
          label: "WashingMachine",
          field: "washing_machine_name",
          align: "center",
          sortable: true,
        },
        {
          name: "username",
          label: "Username",
          field: "username",
          align: "center",
          sortable: true,
        },
        {
          name: "book_from",
          label: "From",
          field: "book_from",
          align: "left",
          sortable: true,
        },
        {
          name: "book_to",
          label: "To",
          field: "book_to",
          align: "left",
          sortable: true,
        },
        {
          name: "Status",
          label: "Status",
          field: "Status",
          align: "left",
          sortable: true,
        }
      ],
      paginations: { rowsPerPage: 10 },
      form_delete: false,
      storeLogUser: useLoginUserStore(),
    }
  },
  methods:{
    getAllBook(){
      const headers = {
        "x-access-token": this.storeLogUser.accessToken
      }
      this.$api
      .get("/admin/booking",{headers})
      .then((res)=>{
        if(res.status == 200){
          console.log(res.data);
          this.rows = res.data
        }
      })
      .catch((err) => {
          console.log(err);
          Notify.create({
            type: "negative",
            message: "Unauthorized",
          });
          this.$router.push('/')
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
      .delete('/admin/booking/'+id,{headers})
      .then((res)=>{
        Notify.create({
              type: "positive",
              message: "Delete booking ID: " + id,
            });
      })
      .catch((err)=>{
        Notify.create({
              type: "negative",
              message: "Error Delete booking ID: " + id,
            });
      })
    }
  },
  async mounted() {
    await this.getAllBook();
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
