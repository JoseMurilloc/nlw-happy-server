import 'express-async-errors';
import express from 'express';
import './database/connection';
import cors from 'cors';

import path from 'path';

import routes from './routes';
import errorHandle from './errors/handler';

const app = express();

app.use(cors())
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'tmp')));
app.use(routes);

app.use(errorHandle)
app.listen(3333, () => console.log('Server 🍪'));
