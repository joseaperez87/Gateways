import axios from 'axios'

class GatewaysService {
    /**
     * Get all gateways
     */
    static getGateways(){
        return axios.get('api/gateways')
            .then(response => {
                return response.data
            }).catch(error => {
               throw new Error(error.message)
            })
    }

    /**
     * Create Gateway
     * @param {String} name 
     * @param {String} serial 
     * @param {String} ipv4 
     */
    static insertGateway(name, serial, ipv4){
        return axios.post('api/gateways',{
            name, serial, ipv4
        }).then(response => {
            if(response.data.errors){
                if(response.data.errors.ipv4){
                    throw new Error(response.data.errors.ipv4.properties.message)
                }else{
                    throw new Error(response.data.message)
                }
            }
            return response
        }).catch(error => {
            throw new Error(error.message)
        })
    }

    /**
     * Remove a Gateway and all Peripherals
     * @param {Integer} gID 
     */
    static removeGateway(gID){
        return axios.post('api/gateway/remove',{gID})
            .then(response => {
                if(response.data.errors){
                    throw new Error(response.data.message)
                }
                return response
            }).catch(error => {
                throw new Error(error.message)
            })
    }
    /**
     * Get Gateway by gateway ID
     * @param {String} id 
     */
    static getGateway(id){
        return axios.get('/api/gateway/'+id)
            .then(response => {
                return response.data
            }).catch(error => {
                throw new Error(error.message)
            }).catch(error => {
                throw new Error(error.message)
            })
    }
}

export default GatewaysService