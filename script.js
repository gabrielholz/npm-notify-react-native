
const OneSignal = require('@onesignal/node-onesignal')
const keys = require('./keys.json')
// https://www.npmjs.com/package/onesignal-node
// https://app.onesignal.com/

const ONESIGNAL_APP_ID = keys.OneSignalKeys

const app_key_provider = {

  getToken() {
    return keys.RestAPIKey;
  }
};

const configuration = OneSignal.createConfiguration({
  authMethods: {
    app_key: {
      tokenProvider: app_key_provider
    }
  }
});
const client = new OneSignal.DefaultApi(configuration);

module.exports = {

  async sendNotification(userIdNotification, message) {
    const notification = new OneSignal.Notification();
    notification.app_id = ONESIGNAL_APP_ID;
    // notification.included_segments = ['Subscribed Users'];
    notification.include_player_ids = [userIdNotification]
    notification.contents = {
      en: message,
      
    }

    const { id } = await client.createNotification(notification);
    const response = await client.getNotification(ONESIGNAL_APP_ID, id);

    console.log(id);
  }
}