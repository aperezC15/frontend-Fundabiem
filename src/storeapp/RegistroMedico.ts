import axios from 'axios'
const api = axios

const store = {
    actions: {
        newMedicalRegister: async({}, data : any) => {
            try {
                const response = await api.post('/RegistroMedico/new', data)
                if(response.status === 200) {
                    return response
                }
            }catch(e) {
                return e.response
            }
        },
        getMedicalsRegistros : async ({}, pagination: any) => {
            try{
                const response = await api.get('/RegistroMedico/getAll',{params: {pagina:pagination.pagination.pagina,rowsPerPage:pagination.pagination.rowsPerPage}})
                if( response.status === 200) {
                    return response
                }
            } catch(e) {
                return e.response
            }
        },
        getOneMedicalsRegisters : async ({}, idRegistro: any) => {
            try{
                const response = await api.get('/RegistroMedico/searchById', {params: {...idRegistro}})
                if(response.status === 200) {
                    return response
                }
            } catch(e) {
                return e.response
            }
        },
        completeRegister : async ({}, data: object) => {
            try {
                const response = await api.post('/RegistroMedico/completar', data)

                if(response.status === 200) {
                    return response 
                }
            } catch (error) {
                return error.response
            }
        }
    }
}

export default store