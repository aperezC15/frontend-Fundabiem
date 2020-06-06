import Vue from 'vue';
import Router from 'vue-router';
import hello from './components/HelloWorld.vue';
import Callback from './components/oidc/callback.vue';
import callbackError from './components/oidc/callbackError.vue';
import HomePage from './components/PaginaInicio/HomePage.vue';
import toolbarhp from './components/PaginaInicio/toolbarhp.vue';
import footerhp from './components/PaginaInicio/footerhp.vue';
import HomePageRM from './components/PaginaRegistroMedico/HomePageRM.vue';
import HomePageET from './components/EvolucionTecnica/HomePageET.vue';
import HomePageHC from './components/HistoriaClinica/PageHistoryClinic.vue';
import ReporteHome from './components/Reportes/Reportes-home.vue';
import HistoriaClinicaPsicologia from './views/Historia-Clinica-PsicologiaView/HistoriaClinicaPsicologia.vue';

import CicloRehabilitacion from './views/Ciclo_Rehabilitacion/Ciclo_de_Rehabilitacion.vue';
import RegistrosMedicos from './views/registro-medico/RegistroMedicos.vue';
import HistoriasClinicas from './views/historia-clinica/HistoriaClinica.vue';
import EvolucionMedica from './views/evolucion-medica/EvolucionMedica.vue';
import CitasPaciente from './views/citas/CitasPaciente.vue';
import EvolucionTecnica from './views/eolvucion-tecnica/EvolucionTecnica.vue';
import EstudioSocioeconomico from './views/EstudioSocioeconomico/estudiosocioeconomico.vue';
import ReportesHome from './views/Reportes/Reportes-home.vue';
import ReporteCitas from './views/Reportes/Reporte-cita.vue';
import ReportePacientes from './views/Reportes/Reporte-paciente.vue';

import ConsultaGeneral from './views/paciente/Paciente.vue';

//@ts-ignore
import { vuexOidcCreateRouterMiddleware } from 'vuex-oidc';
import axios, { AxiosResponse } from 'axios';
import store from '@/store';

Vue.use(Router);

const router = new Router({
	mode: 'history',
	base: `${process.env.VUE_APP_ROUTER_ROOT_PATH}`,
	routes: [
		{
			path: '/toolbarhp',
			name: 'toolbarhp',
			component: toolbarhp,
			meta: {
				isPulic: true
			}
		},
		// {
		//   path: '/dashboard',
		//   name:'dashboard',
		//   component: hello,
		//   meta: {
		//     isPublic:false
		//   }
		// },
		{
			path: '/',
			name: 'home',
			component: HomePage,
			meta: {
				//requiresAuth: false,
				isPublic: true
			}
		},
		{
			path: '/oidc-callback', // Needs to match redirect_uri in you oidcSettings
			name: 'oidcCallback',
			component: Callback,
			meta: {
				isOidcCallback: true,
				isPublic: true
			}
		},
		{
			path: '/oidc-callback-error', // Needs to match redirect_uri in you oidcSettings
			name: 'oidcCallbackError',
			component: callbackError,
			meta: {
				isPublic: true
			}
		},
		{
			path: '/footerhp',
			name: 'footerhp',
			component: footerhp,
			meta: {
				isPulic: true
			}
		},
		{
			path: '/HomePageRM',
			name: 'HomePageRM',
			component: HomePageRM,
			meta: {
				requiresAuth: false,
				isPulic: true
			}
		},
		{
			path: '/HomePageET',
			name: 'HomePageET',
			component: HomePageET
		},
		{
			path: '/estudio-socioeconomico',
			name: 'HomePageES',
			component: EstudioSocioeconomico
		},
		{
			path: '/HomePageHC',
			name: 'HomePageHC',
			component: HomePageHC
		},
		{
			path: '/ciclo-rehabilitacion',
			name: '/ciclo-rehabilitacion',
			component: CicloRehabilitacion
		},
		{
			path: '/Psicologia-clinica',
			name: '/Psicologia-clinica',
			component: HistoriaClinicaPsicologia
		},
		{
			path: '/registro-medico',
			name: 'registroMedico',
			component: RegistrosMedicos
		},
		{
			path: '/historia-clinica',
			name: 'HistoriasClinicas',
			component: HistoriasClinicas
		},
		{
			path: '/evolucion-medica',
			name: 'Evolucion Medica',
			component: EvolucionMedica
		},
		{
			path: '/evolucion-tecnica',
			name: 'Evolucion técnica',
			component: EvolucionTecnica
		},
		{
			path: '/citas',
			name: 'Citas',
			component: CitasPaciente
		},
		{
			path: '/consulta-general',
			name: 'ConsultaGeneral',
			component: ConsultaGeneral
		},
		{
			path: '/reportes',
			name: 'ReportesHome',
			component: ReportesHome
		},
		{
			path: '/reportes/citas',
			name: 'ReporteCitas',
			component: ReporteCitas
		},
		{
			path: '/reportes/pacientes',
			name: 'ReportePacientes',
			component: ReportePacientes
		}
	]
});

router.beforeEach(vuexOidcCreateRouterMiddleware(store, 'oidcStore'));

export default router;
