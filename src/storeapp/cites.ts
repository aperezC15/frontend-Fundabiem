import axios from 'axios';
const api = axios;

const store = {
	actions: {
		newCites: async ({}, data: any) => {
			try {
				const response = await api.post('/Citas/new', data);

				if (response.status === 201) {
					return response;
				}
			} catch (e) {
				return e.response;
			}
		},

		getAllCites: async ({}, data: any) => {
			try {
				const response = await api.get('/Citas/searchByDates', { params: { ...data } });
				if (response.status === 200) {
					return response;
				}
			} catch (error) {
				return error.response;
			}
		},

		changeCite: async ({}, data: any) => {
			console.log(data);
			try {
				const response = await api.put(`Citas/changeState/${data.state}/${data.idCita}`, {
					params: { state: data.state, idCita: data.idCita }
				});
				console.log(response);
			} catch (error) {
				console.log(error.response);
			}
		}
	}
};

export default store;
