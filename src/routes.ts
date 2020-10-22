import { Router, Request, Response } from 'express';
import OrphanagersController from './controllers/OrphanagersController';
import uploadConfig from './config/upload'
import multer from 'multer'
import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';

const upload = multer(uploadConfig)



const routes = Router();

routes.post('/users', UserController.create)

routes.post('/sessions', SessionController.create)

routes.get('/orphanages', OrphanagersController.index);
routes.get('/orphanages/:id', OrphanagersController.show);
routes.post('/orphanages', upload.array('images'), OrphanagersController.create);
routes.delete('/orphanages/:id', OrphanagersController.delete);

export default routes;
