<template>
    <div v-if="gateway" div class="container">
        <p class="error" v-if="error">{{ error }}</p>
        <p class="success" v-if="success">{{ success }}</p>
        <div class="create-gateway">
            <h3>Add new Peripheral to {{ gateway.name }}</h3>
            <label for="vendor">Vendor: </label>
            <input type="text" id="vendor" name="vendor" v-model="vendor" placeholder="Peripheral's vendor">
            <label for="status"> Status: </label>
            <select name="status" v-model="status" id="status">
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
            </select>
            <button v-on:click="createPeripheral">Add</button>
        </div>    
        <div class="gateway-info">    
            <h1>Gateway: {{ gateway.name }}</h1>
            <p>Name: {{ gateway.name }}</p>
            <p>Serial: {{ gateway.serial }}</p>
            <p>IP Address: {{ gateway.ipv4 }}</p>
            <p><router-link
              :to="{name: 'glist'}">Back to list</router-link></p>
        </div>
        <hr>
        <div class="pripherals">
        <h3>Peripheral's List</h3>
        <table>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>UID</th>
                    <th>VENDOR</th>
                    <th>DATE</th>
                    <th>STATUS</th>
                    <th>ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(peripheral, index) in peripherals" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ peripheral.UID }}</td>
                    <td>{{ peripheral.vendor }}</td>
                    <td>{{ peripheral.date }}</td>
                    <td>{{ peripheral.status }}</td>
                    <td><button v-on:click="removePeripheral(peripheral._id)">Delete</button></td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
    <div v-else>
        <p>{{ error }}</p>
        <p><router-link
              :to="{name: 'glist'}">Back to list</router-link></p>
    </div>
</template>

<script>
import GatewaysService from '../services/GatewaysService'
import PeripheralsService from '../services/PeripheralsService'

export default {
  name: 'Gateway',
  data(){
      return {
          gateway : "",
          vendor : "",
          status : "",
          error : "",
          success : "",
          peripherals : []
      }
  },
  async created(){
      try{
        this.gateway = await GatewaysService.getGateway(this.$route.params.id)
      }catch(error){
          this.error = error
      }
  },
  methods: {
      async createPeripheral() {
        if(!this.vendor || !this.status){
            return this.error = "All fields are required"
        }
        try{
            this.error = ""
            const res = await PeripheralsService.insertPeripheral(this.vendor, this.status, this.$route.params.id)
            this.success = res.data
            this.gateway = await GatewaysService.getGateway(this.$route.params.id)
            this.vendor = ""
        }catch(error){
            this.success = ""
            this.error = error
        }
      },
      async removePeripheral(id){
          try{
            this.error = ""
            const res = PeripheralsService.removePeripheral(id)
            this.success = res.data
            this.gateway = await GatewaysService.getGateway(this.$route.params.id)
          }catch(error){
            this.success = ""
            this.error = error
          }
      }
  },
  watch: {
      gateway: function() {
        try{           
            this.error =""
            if(!this.gateway)
               return this.error = "Gateway not found"
            let per = this.gateway.peripherals
            this.peripherals = []
            for(const p in per){
                PeripheralsService.getPeripheral(per[p])
                    .then((res) => {
                        if(res){
                            this.peripherals.push(res)
                        }
                    }).catch(error => {
                        this.error = error
                    })
            }
        }catch(error){
            this.success = ""
            this.error = error.message
        }
      }
  },    
}
</script>
<style scoped>
table{
    width: 600px;
    margin-left: auto;
    margin-right: auto;
}
.container{
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}
.error{
  background-color: tomato;
  color: #fff;
  padding: 30px;
}
.success{
  background-color: seagreen;
  color: #fff;
  padding: 30px;
}
</style>