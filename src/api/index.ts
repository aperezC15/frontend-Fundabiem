import axios from 'axios'
import Vue from 'vue-axios'
import vuetify from '@/plugins/vuetify';



const instance = axios.create({
    baseURL: process.env.VUE_APP_URL_API,
    withCredentials: false,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept':'application/json',
        'Content-Type':'application/json',
    }
});

export default instance