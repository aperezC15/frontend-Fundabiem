import axios from 'axios'
const api = axios

const store = {
    state: {
        paises: [],
        departamentos: [],
        municipios: [],
        showError: false
    },
    getters: {
        getPaises(state: any) {
            return state.paises
        },
        getDepartamentos(state: any) {
            return state.departamentos
        },
        getMunicipios(state:any) {
            return state.municipios
        },
        showError(state: any) {
            return state.showError
        }
    },
    mutations: {
        getPaises: (state: any, data: any) => {
            state.paises = data
        },
        getDepartamento: (state: any, departamentos: any) => {
            state.departamentos = departamentos
        },
        getMunicipio: (state: any, municipios: any) => {
            state.municipios = municipios
        },
        showError: (state: any, status: any ) => {
            if(status !== 200) {
                state.showError = true
            }
        },
        clearStore: (state : any) => {
            state.paises = []
            state.departamentos = []
            state.municipios = []
            state.showError = false
        }
    },
    actions: {
        getPaises: async ({commit} : any) => {

            try {
                const response = await api.get('/Fundabiem/paises');
                if(response.status === 200) {
                    commit('getPaises', response.data)
                }
            }catch(e) {
                commit('showError', e.response.status)
            }
        },
        getDepartamento : async({commit}: any, idPais: number) => {
            try {
                const response = await api.get(`/Fundabiem/departamentos/${idPais}`)
                if(response.status === 200) {
                    commit('getDepartamento', response.data)
                }
            }catch(e) {
                commit('showError', e.response.status)
            }
        },
        getMunicipio: async ({commit}: any, idDepartamento: number) => {

            try {
                const response = await api.get(`/Fundabiem/municipios/${idDepartamento}`)
                if(response.status === 200) {
                    commit('getMunicipio', response.data)
                }
            }catch(e) {
                commit('showError', e.response.status)
            }
        },

        getPacient: async ({}, data: any) => {

            try {
                const response = await api.get(`/Paciente/paciente/searchBy/${data.criterio}/valor/${data.valor}`)

                if(response.status === 200) {
                    return response
                }

            } catch (error) {
                return error.response
            }
        },

        getPacientHistoryClinic : async ({}, NumeroHistoriakClinico : any) => {
            try {
                const response = await api.get(`Paciente/paciente/searchByHistorialClinico`, {params: {NumeroHistoriakClinico}})

                if(response.status === 200) {
                    return response
                }

            }catch(e) {
                return e.response
            }
        },
        getTerapias: async ({}) => {
            try {
                const response = await api.get('/Fundabiem/Terapias')
                if(response.status === 200) {
                    return response
                }
            } catch (e) {
                return e.response
            }
        },
        getEstados: async ({}) => {
            try {
                const response = await api.get("/Fundabiem/EstadoCitas");
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