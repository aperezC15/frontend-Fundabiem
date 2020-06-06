<template>
    <div class="text-xs-center" justify="center" align="center">
        <v-progress-circular :size="70"
                             :width="7"
                             color="purple"
                             indeterminate></v-progress-circular>
    </div>
</template>

<script lang="ts" charset="utf-8">
    import { mapActions } from 'vuex'
    import { Component, Vue } from 'vue-property-decorator';
    const namespace: string = 'oidcStore/';

    @Component({
        methods: {
            ...mapActions('oidcStore', [
                'oidcSignInCallback'
            ])
        }
    })
    export default class Callback extends Vue {
        oidcIsAuthenticated: boolean = false
        oidcAuthenticationIsChecked: boolean = false
        oidcUser: string = ''
        oidcIdToken: string = ''
        oidcIdTokenExp: string = ''

        created() {
            console.log('initiatin callback')
            this.oidcSignInCallback()
                .then((redirectPath: string) => {
                    this.$router.push('/dashboard')
                })
                .catch((err: any) => {
                    console.error(err)
                    this.$router.push('/signin-oidc-error') // Handle errors any way you want
                })
        }

        oidcSignInCallback(): Promise<any> {
            return this.$store.dispatch(namespace + 'oidcSignInCallback')
        }
    }
</script>

<style lang="stylus" scoped>
    .v-progress-circular {
        margin: 1rem
    }
</style>