import axios from 'axios'
const api = axios

const store = {
    actions: {
        getAnamnesis : async ({}) => {
            try {
                const response = await api.get('/anamnesis/secciones')
                if(response.status === 200) {
                    return response
                }
             
            } catch (error) {
                return error.response
            }
        },

        newClinicHistory : async({}, data: any) => {
            try {
                const response = await api.post('/HistoriaClinica/new', data)
                return response
            } catch (error) {
                return error
            }
        },

        getAllHistory: async ({}, pagination: any) => {
            try {
                const response = await api.get('HistoriaClinica', {params: {pagina:pagination.pagination.pagina,rowsPerPage:pagination.pagination.rowsPerPage}})
                
                if(response.status === 200) {
                    return response
                }
            } catch (e) {
                return e.response
            }
        },

        CicloRehabilitacion : async ({ }, data: any) => {
            try {
                const response = await api.post('/CicloRehabilitacion', data)
                if(response.status === 201) {
                    return response
                }

            } catch (error) {
                return error
            }
        },

        getAllCicloRehabilitacion : async ({}, pagination: any ) => {
            try {
                const response = await api.get('/CicloRehabilitacion', {params: {pagina:pagination.pagination.pagina,rowsPerPage:pagination.pagination.rowsPerPage}})
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