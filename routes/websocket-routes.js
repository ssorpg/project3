const db = require('../models');
const wrap = fn => (...args) => fn(...args).catch(args[2]);

function messageAllClients(message, clients, exclude) {
  try {
    clients.forEach(client => {
      if (!exclude || client.user.id !== exclude.user.id) {
        client.send(JSON.stringify(message));
      }
    });
  }
  catch (error) {
    console.log(error);
  }
}

function makeMessage(ws, text) {
  return {
    action: 'addMessage',
    payload: {
      user: ws.user,
      text: text,
      time: getFormattedTime()
    }
  };
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

  function getClientNames() {
    let clientNames = [];
    getClients().forEach(client => { clientNames.push(client.user.name); });
    return clientNames;
  }

  app.ws('/chat', wrap(async function (ws, req, next) {
    const user = await db.User.findOne({
      where: {
        id: req.token.UserId
      }
    });

    ws.user = user.dataValues;

    console.log(ws.user.id + ' open');

    messageAllClients({ action: 'addUser', payload: ws.user.name }, getClients(), ws);

    // im concerned that with a large number of users the "left chat" and "joined chat" will flood the chat
    // messageAllClients(makeMessage(ws, `${ws.user.name} joined the chat.`), getClients());

    ws.on('message', async function (text) {
      messageAllClients(makeMessage(ws, text), getClients());
    });

    ws.on('close', async function () {
      console.log(ws.user.id + ' close');

      messageAllClients({ action: 'removeUser', payload: ws.user.name }, getClients(), ws);

      // messageAllClients(makeMessage(ws, `${ws.user.name} left the chat.`), getClients(), ws);
    });
  }));

  app.get('/chat/users', wrap(async function (req, res, next) {
    res.status(200).json(getClientNames());
  }));
};
