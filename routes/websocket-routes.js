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
  const today = new Date();
  const hours = today.getHours();
  const minutes = ((today.getMinutes() < 10 ? '0' : '') + today.getMinutes());
  const seconds = ((today.getSeconds() < 10 ? '0' : '') + today.getSeconds());
  const time = hours + ':' + minutes + ':' + seconds;

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
