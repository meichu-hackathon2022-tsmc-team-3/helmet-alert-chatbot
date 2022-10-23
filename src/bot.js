// Load dotenv config
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const { driver } = require('@rocket.chat/sdk');
var myUserId;

// Bot configuration
module.exports.runbot = async () => {
    const conn = await driver.connect({ host: process.env.ROCKET_CHAT_HOST , useSsl: false })
    myUserId = await driver.login({ username: process.env.BOT_USER, password: process.env.BOT_PASS });
    const roomsJoined = await driver.joinRooms( ['general'] );
    console.log('joined rooms');

    const subscribed = await driver.subscribeToMessages();
    console.log('subscribed');

    const msgloop = await driver.reactToMessages( this.processMessages );
    console.log('connected and waiting for messages');

}

module.exports.apiEvent = async (req, res) => {

    const sent = await driver.sendToRoom(`# Helmet Detection Notify
        - 時間： ${req.query.time}
        - 地點： FAB12
        - 事件： 施工區域未配戴工地帽
        ![](${req.query.image})
        點擊 [Dashboard](http://ui.tsmc.n0b.me/profile#/profile?id=${req.query.event_id}) 查看詳細資訊
    `, 'TSMC_Hackathon');

    return res.status(200).json({
        detail: 'OK'
    });
}


// Process messages
module.exports.processMessages = async(err, message, messageOptions) => {
if (!err) {
    if (message.u._id === myUserId) return;
    const roomname = await driver.getRoomName(message.rid);

    //console.log('got message ' + message.msg)
    var response;
    if (message.msg in respmap) {
        response = respmap[message.msg];
    }
    const sentmsg = await driver.sendToRoomId(response, message.rid)
    }
}