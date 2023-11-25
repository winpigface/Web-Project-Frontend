<template>
  <q-page class="flex flex-center">
    <!-- <h1>AdminBooking</h1> -->
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
            <q-td key="washing_machine" :props="props"> {{ props.row.washing_machine }}</q-td>
            <q-td key="username" :props="props"> {{ props.row.username }}</q-td>
            <q-td key="from" :props="props"> {{ props.row.from }}</q-td>
            <q-td key="to" :props="props"> {{ props.row.to }}</q-td>
            <q-td key="status" :props="props">{{ props.row.status }}
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

export default defineComponent({
  name: 'AdminBooking',
  data(){
    return {
      dataready: false,
      rows: [],
      columns: [
      {
          name: "washing_machine",
          label: "WashingMachine",
          field: "washing_machine",
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
          name: "from",
          label: "From",
          field: "from",
          align: "left",
          sortable: true,
        },
        {
          name: "to",
          label: "To",
          field: "username",
          align: "left",
          sortable: true,
        },
        {
          name: "status",
          label: "Status",
          field: "status",
          align: "left",
          sortable: true,
        }
      ],
      storeLogUser: useLoginUserStore()
    }
  },
  methods:{

  }
})
</script>
