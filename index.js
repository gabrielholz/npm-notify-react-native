const notification = require('./script')
const keys = require('./keys.json')

notification.sendNotification(keys.UserNotify, `Mudando texto da notificação!\n${new Date()}`)
