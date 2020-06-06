import { oidcSettingsModel } from "../models/auth/oidcSettingsModel"

export const oidcSettings: oidcSettingsModel = {
    authority: `${process.env.VUE_APP_OAUTH_AUTHORITY}`,
    client_id: `${process.env.VUE_APP_CLIENT_ID}`,
    redirect_uri: `${process.env.VUE_APP_OAUTH_REDIRECT_URI}`,
    response_type: `${process.env.VUE_APP_RESPONSE_TYPE}`,
    scope: `${process.env.VUE_APP_RESPONSE_SCOPE}`,
    automaticSilentRenew: true,
    silent_redirect_uri: `${process.env.VUE_APP_OAUTH_SILENT_REDIRECT}`,
    post_logout_redirect_uri: `${process.env.VUE_APP_OAUTH_POST_LOGOUT_URI}`,
    filterProtocolClaims: true,
    loadUserInfo: true
}