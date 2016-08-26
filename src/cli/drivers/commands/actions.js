import { createAction } from 'redux-actions'

export const command = createAction('COMMAND', (type, payload) => {
  return {
    type,
    ...payload
  }
})

// export const commandConfigDelete = createAction('COMMAND_CONFIG_DELETE')
// export const commandConfigGet = createAction('COMMAND_CONFIG_GET')
// export const commandConfigSet = createAction('COMMAND_CONFIG_SET')
// export const commandDaemonStart = createAction('COMMAND_DAEMON_START')
// export const commandDaemonStop = createAction('COMMAND_DAEMON_STOP')
// export const commandInstall = createAction('COMMAND_INSTALL')
// export const commandLogin = createAction('COMMAND_LOGIN')
// export const commandLogout = createAction('COMMAND_LOGOUT')
// export const commandPublish = createAction('COMMAND_PUBLISH')
// export const commandSignup = createAction('COMMAND_SIGNUP')
// export const commandUninstall = createAction('COMMAND_UNINSTALL')
// export const commandUpdate = createAction('COMMAND_UPDATE')
