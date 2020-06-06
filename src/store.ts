import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import axios from 'axios';
import 'es6-promise/auto';
import { rootState } from './models/vuex/rootState';
//@ts-ignore
import { vuexOidcCreateStoreModule } from 'vuex-oidc';
import { oidcSettings } from './config/oidc';

// store app
import {
	storeReportes,
	storeHistoriaClinicaPsicologica,
	storeGenerales,
	storeMedicalRegister,
	storeAnamnesis,
	storeEvolucionMedica,
	storeCites,
	storeEvolucionTecnica
} from './storeapp';
Vue.use(Vuex);

const store: StoreOptions<rootState> = {
	state: {
		version: '1.0.0'
	},
	modules: {
		storeReportes,
		storeHistoriaClinicaPsicologica,
		storeGenerales,
		storeMedicalRegister,
		storeAnamnesis,
		storeEvolucionMedica,
		storeCites,
		storeEvolucionTecnica,
		oidcStore: vuexOidcCreateStoreModule(
			oidcSettings,
			// Optionlaly define the store module as namespaced
			{ namespaced: true },
			// Optional OIDC event listeners
			{
				userLoaded: (user: any) => {
					//   console.log('OIDC user is loaded:', user.id_token)
					Vue.axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.id_token;
					Vue.axios.defaults.baseURL = process.env.VUE_APP_URL_API;
				},
				userUnloaded: () => console.log('OIDC user is unloaded'),
				accessTokenExpiring: () => console.log('Access token will expire'),
				accessTokenExpired: () => console.log('Access token did expire'),
				silentRenewError: () => console.log('OIDC user is unloaded'),
				userSignedOut: () => console.log('OIDC user is signed out')
			}
		)
	}
};

export default new Vuex.Store<rootState>(store);
