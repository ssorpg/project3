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

  function getUsers() {
    const users = [];
    getClients().forEach(client => {
      const newUser = {
        id: client.user.id,
        name: client.user.name
      };

      users.push(newUser);
    });
    return users;
  }

  app.ws('/ws/chat', wrap(async function (ws, req, next) {
    const user = await db.User.findOne({
      where: {
        id: req.token.UserId
      }
    });

    ws.user = user.dataValues;

    console.log(ws.user.id + ' open');

    messageAllClients({
      action: 'addUser',
      payload: {
        id: ws.user.id,
        name: ws.user.name
      }
    }, getClients(), ws);

    ws.on('message', function (text) {
      messageAllClients(makeMessage(ws, text), getClients());
    });

    ws.on('close', function () {
      console.log(ws.user.id + ' close');

      messageAllClients({
        action: 'removeUser',
        payload: {
          id: ws.user.id,
          name: ws.user.name
        }
      }, getClients(), ws);
    });
  }));

  app.get('/api/chat/users', wrap(async function (req, res, next) {
    res.status(200).json(getUsers());
  }));
};
