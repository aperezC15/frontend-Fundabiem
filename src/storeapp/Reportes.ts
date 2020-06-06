import axios from 'axios';
const api = axios;

const store = {
	actions: {
		obtenerReportePorPaciente: async ({}, data: any) => {
			try {
				const response = await api.get('/reportes/pacientes', { params: { ...data } });
				if (response.status === 200) {
					return response;
				}
			} catch (error) {
				return error.response;
			}
		}
	}
};

export default store;
