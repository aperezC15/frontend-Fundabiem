import axios from 'axios'
const api = axios

const store = {
    actions: {
        newEvolutionMedical : async ({}, data: object) => {
            try {   
                const response = await api.post('/evolucion-medica', data)
                if(response.status === 201) {
                    return response
                }
            }catch(e) {
                return e.response
            }
        },
        //para obtener todos los registros de evoluciones medicas, paginados.
        getAllEvolucionesMedicas : async({}, pagination: any) => {
            try{
                const response  = await api.get('evolucion-medica/getAll',{params: {pagina:pagination.pagination.pagina,rowsPerPage:pagination.pagination.rowsPerPage}})

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