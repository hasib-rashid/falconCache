import { Falcon } from './client/Client';
import express from 'express';

const app = express();
app.get('/', (req, res) => res.status(200).json({ msg: '🚀' }));
app.listen(8080, () => {
    console.log("Success")
});

import { env } from './client/env';
new Falcon().start({
    token: env.token,
    mongoURI: env.mongo_url,
    prefix: env.prefix,
    commandDir: `${__dirname}/commands`,
    owners: ["548038495617417226"]
});
