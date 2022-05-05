const session = require('express-session');

//Redis
let RedisStore = require('connect-redis')(session);
const { createClient } = require('redis');

let redisClient = createClient({ legacyMode: true });
redisClient.connect().catch(console.error);

const sessionConfig = session({
  store: new RedisStore({ client: redisClient }),
  saveUninitialized: false,
  secret: 'coRohcTbFytvSOF5pChGuIwopdVgWosv',
  resave: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production' ? true : false, //enable in production
    httpOnly: true,
    maxAge: Date.now() + 604_800_000, //7 days from date initialized
  },
});

export default sessionConfig;
