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
    getAllHistory: async ({}, pagination: any) => {
      try {
        const response = await api.get('HistoriaClinica', {params: {pagina:pagination.pagination.pagina,rowsPerPage:pagination.pagination.rowsPerPage}})
        
        if(response.status === 200) {
            return response
        }
      } catch (e) {
        return e.response
      }
    }      
  }
}

export default store