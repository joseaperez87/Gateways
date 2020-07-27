<template>
  <div class="container">  
    <h1>Manage gateways - master devices</h1>
    <p class="error" v-if="error">{{ error }}</p>
    <p class="success" v-if="success">{{ success }}</p>
    <div class="create-gateway">
      <h3>Add new Gateway</h3>
      <label for="name">Name: </label>
      <input type="text" id="name" name="name" v-model="name" placeholder="Gateway's name">
      <label for="serial"> Serial: </label>
      <input type="text" id="serial" v-model="serial" name="serial" placeholder="Gateway's serial number">
      <label for="ipv4"> IP Address: </label>
      <input type="text" id="ipv4" v-model="ipv4" name="ipv4" placeholder="IP Address">
      <button v-on:click="createGateway">Add</button>
    </div>
    <hr>
    <div class="gateways-list">
      <h1>Gateway's List</h1>
      <div class="gateway" v-for="(gateway, index) in gateways" :key="index">
        <p><router-link
              :to="{ name: 'gelement', params: { id: gateway._id } }"
              >{{ gateway.name }}</router-link> <small>({{ gateway.peripherals.length}})</small> <button v-on:click="removeGateway(gateway._id)">Delete</button></p>
        
      </div>
    </div>
  </div>
</template>

<script>
import GatewaysService from '../services/GatewaysService'

export default {
  name: 'Gateways',
  data(){
    return {
      gateways : [],
      error : "",
      serial : "",
      ipv4: "",
      name : "",
      success : ""
    }
  },
  async created() {
    try{
      this.gateways = await GatewaysService.getGateways()
    }catch(error){
      this.error = error.message
    }
  },
  methods: {
    async createGateway(){
      if(!this.serial || !this.name || !this.ipv4){
        return this.error = "All fields are required"
      }
      try{
        this.error = ""
        const res = await GatewaysService.insertGateway(this.name, this. serial, this.ipv4)
        this.success = res.data
        this.gateways = await GatewaysService.getGateways()
        this.name = "" 
        this.serial = ""
        this.ipv4 = ""
      }catch(error){
        this.success = ""
        this.error = error
      }
    },
    async removeGateway(id){
      const res = GatewaysService.removeGateway(id)
      this.success = res.data
      this.gateways = await GatewaysService.getGateways()
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
