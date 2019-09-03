const db = require('../models');
const wrap = fn => (...args) => fn(...args).catch(args[2]);

async function messageAllClients(message, clients, exclude) {
  try {
    clients.forEach(client => {
      if (!exclude || client.UserId !== exclude.UserId) {
        client.send(JSON.stringify(message));
      }
    });
  }
  catch (error) {
    console.log(error);
  }
}

function getFormattedTime() {
  const today = new Date(); // 24 hour time
  const hours24 = today.getHours();
  const minutes24 = today.getMinutes();
  const seconds24 = today.getSeconds();

  const hours12 = ((hours24 + 11) % 12) + 1; // 12 hour time
  const minutes12 = ((minutes24 < 10 ? '0' : '') + minutes24);
  const seconds12 = ((seconds24 < 10 ? '0' : '') + seconds24);
  const amPm = today.getHours() > 11 ? 'PM' : 'AM';
  
  const time = hours12 + ':' + minutes12 + ':' + seconds12 + ' ' + amPm;

  return time;
}

module.exports = function (app, expressWs) {
  function getClients() {
    return expressWs.getWss().clients;
  }

  function makeMessage(ws, text) {
    return {
      user: ws.user,
      text: text,
      time: getFormattedTime()
    };
  }

  app.ws('/chat', wrap(async function (ws, req, next) {
    const user = await db.User.findOne({
      where: {
        id: req.token.UserId
      }
    });

    ws.user = user;

    console.log(ws.user.id + ' open');

    await messageAllClients(makeMessage(ws, `${ws.user.name} joined the chat.`), getClients());

    ws.on('message', async function (text) {
      await messageAllClients(makeMessage(ws, text), getClients());
    });

    ws.on('close', async function () {
      console.log(ws.user.id + ' close');

      await messageAllClients(makeMessage(ws, `${ws.user.name} left the chat.`), getClients());
    });
  }));
};
