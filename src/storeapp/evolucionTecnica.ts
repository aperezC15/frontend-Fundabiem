import axios from 'axios'
const api  = axios

const store = {
    actions: {

        newTechnicalEvolution :  async ({}, data: object) => {
            try {
                const response = await api.post('/EvolucionTecnica',data) 
                if(response.status === 201) {
                    return response
                }
            } catch (error) {
                return error.response
            }
        },

        getAllTechnicalEvolution : async({}, pagination: any) => {

            try{
                const response  = await api.get('EvolucionTecnica',{params: {pagina:pagination.pagination.pagina,rowsPerPage:pagination.pagination.rowsPerPage}})
                if(response.status === 200){
                    return response
                }
            }catch(e){
                return e.response
            }
        }

        
    }
}

export default store