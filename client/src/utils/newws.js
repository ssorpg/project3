require('dotenv').config();

export default function NewWS(loc) {
    const matches = loc.origin.match(/\/(.*)/);
    const url = process.env.NODE_ENV === 'production' ?
        matches[1]
        : 'localhost:3001/';

    return loc.origin.indexOf('https') === 0 ?
        new WebSocket('wss://' + url)
        : new WebSocket('ws://' + url);
}