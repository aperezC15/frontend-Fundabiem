import axios from 'axios'
const api = axios

const store = {
   actions: {
        newHistoriaClinicaPsicologica: async ({}, data : any) => {
            try{
                const response = await api.post('/HistoriaClinicaPsicologica/new',data)
                if(response.status === 201){
                    return response
                }
            }catch(e){
                return e.response
            }
        },
    
        getAllHisotirasPsicologicas: async ({}, pagination:any) => {
            try{
                const response = await api.get('HistoriaClinicaPsicologica/getAll', {params: {pagina:pagination.pagination.pagina,rowsPerPage:pagination.pagination.rowsPerPage}})

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