import axios from 'axios'

class PeripheralsService {
    static insertPeripheral(vendor, status, gID){
        return axios.post('/api/peripheral',{
            vendor, status, gID
        }).then(response => {
            if(response.data.errors){
                if(response.data.errors.peripherals){
                    throw new Error(response.data.errors.peripherals.properties.message)
                }else{
                    throw new Error(response.data.message)
                }
            }
            return response
        }).catch(error => {
            throw new Error(error.message)
        })
    }

    static getPeripheral(id){
        return axios.get('/api/peripheral/'+id)
            .then(response => {
                return response.data
            }).catch(error => {
                throw new Error(error.message)
            })
    }

    static removePeripheral(pID){
        return axios.post('/api/peripheral/remove',{pID})
            .then(response => {
                if(response.data.errors){
                    throw new Error(response.data.message)
                }
                return response
            }).catch(error => {
                throw new Error(error.message)
            })
    }
}

export default PeripheralsService