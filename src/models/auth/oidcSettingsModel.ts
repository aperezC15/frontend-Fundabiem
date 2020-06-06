export interface oidcSettingsModel {
    authority: string
    client_id: string
    redirect_uri: string
    response_type: string
    scope: string
    automaticSilentRenew: boolean
    silent_redirect_uri: string
    post_logout_redirect_uri: string
    filterProtocolClaims: boolean
    loadUserInfo: boolean
}